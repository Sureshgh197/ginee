import json
import jwt
import pytz
import datetime

from django.conf import settings
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.models import User
from django.contrib.auth import logout,authenticate,login

from rest_framework.serializers import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import GoogleSocialAuthSerializer, FacebookSocialAuthSerializer
from .serializers import CustomRegistrationSerializer,CustomRegistrationSerializerV2
from .authentication import ExpiringTokenAuthentication
from .models import CustomUsers,CustomUsersV2
from .utils import Util

@api_view(["POST"])
@permission_classes([AllowAny])
def RegisterAPI(request):

    register_data = {}
    try:
                
        if CustomUsersV2.objects.filter(email=request.data['email']):
            register_data["state"] = "USER_EXISTS"
            return Response(register_data,status=status.HTTP_200_OK)            
        
        else:

            serializer = CustomRegistrationSerializerV2(data=request.data)
            if serializer.is_valid():
                account = serializer.save()
                account.save()

                register_data["state"] = "USER_REGISTERED"            

                user = CustomUsersV2.objects.get(email=account.email)
                token = RefreshToken.for_user(user).access_token
                current_site = get_current_site(request).domain
                relativeLink = reverse('email-verify')
                absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
                email_body = 'Hi '+user.full_name + \
                    ' Use the link below to verify your email \n' + absurl
                data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

                try:
                    Util.send_email(data)
                    register_data["state2"] = "EMAIL_SENT"
                except:
                    register_data["state2"] = "EMAIL_SENT_UNSUCCESSFUL"   
                

            else:
                register_data["state"] = "REGISTRATION_UNSUCCESSFUL"
                register_data["errors"] = serializer.errors
                

    except KeyError as e:
    
        register_data["state"] = "REGISTRATION_UNSUCCESSFUL"
        register_data["errors"] = 'except_block_'+str(e)
        

    return Response(register_data,status=status.HTTP_200_OK)



class VerifyEmail(APIView):    
    
    def get(self, request):
        email_data = {}
        
        try:
            token = request.GET.get('token')
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms=['HS256'])
            
            user = CustomUsersV2.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
                email_data["state"] = "EMAIL_ACTIVATED"
            else:
                email_data["state"] = "EMAIL_ALREADY_ACTIVATED"
            
        except jwt.ExpiredSignatureError as identifier:
            email_data["state"] = "ACTIVATION_EXPIRED"
            
        except jwt.exceptions.DecodeError as identifier:
            email_data["state"] = "INVALID_TOKEN"

        return Response(email_data, status=status.HTTP_200_OK)




class ResendEmailVerification(APIView):

    def post(self, request):
        email_data = {}
        try:
            
            email = request.data['email']

            if CustomUsersV2.objects.filter(email=email):

                user = CustomUsersV2.objects.get(email=email)
                token = RefreshToken.for_user(user).access_token
                current_site = get_current_site(request).domain
                relativeLink = reverse('email-verify')
                absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
                email_body = 'Hi '+user.full_name + \
                    ' Use the link below to verify your email \n' + absurl
                data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

                Util.send_email(data)
                email_data["state"] = "EMAIL_SENT"

            else:
                email_data["state"] = "EMAIL_NOT_EXISTS"

        except:
            email_data["state"] = "UNKNOWN_ERROR"

        return Response(email_data, status=status.HTTP_200_OK)




@api_view(["POST"])
@permission_classes([AllowAny])
def login_cred(request):

    login_data = {}

    try:
        email = request.data['email']
        password = request.data['password']

    except:
        login_data["state"] = "INVALID_DATA"
        login_data["errors"] = "one or more fields incorrect"
        return Response(login_data, status=status.HTTP_200_OK)

    
    account = CustomUsersV2.objects.filter(email=email, auth_provider='email')

    if account:
        
        user = authenticate(email=email, password=password)

        if user is not None:

            if user.is_verified:

                login(request, user)
                
                login_data["state"] = "USER_LOGGED_IN"
                
            else:
                login_data["state"] = "USER_ACCOUNT_NOT_VERIFIED"
        else:
            login_data["state"] = "USER_INVALID_CREDENTIALS"
    else:
        login_data["state"] = "USER_DOES_NOT_EXIST"
    
    return Response(login_data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    
    def get(self,request,format=None):
        logout_data = {}
        
        try:

            logout(request)
            logout_data["state"] = "USER_LOGGED_OUT"

        except:
            logout_data["state"] = "ANONYMOUS_USER"
            

        return Response(logout_data)


class GoogleSocialAuthView(GenericAPIView):

    serializer_class = GoogleSocialAuthSerializer

    def post(self, request):
        """

        POST with "auth_token"

        Send an idtoken as from google to get user information

        """
        context = {'request': request}
        serializer = self.serializer_class(data=request.data, context = context)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=status.HTTP_200_OK)


class FacebookSocialAuthView(GenericAPIView):

    serializer_class = FacebookSocialAuthSerializer

    def post(self, request):
        """

        POST with "auth_token"

        Send an access token as from facebook to get user information

        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=status.HTTP_200_OK)
