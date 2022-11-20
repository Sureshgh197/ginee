import requests
import json

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from django.contrib.sessions.models import Session

from loginApp.models import CustomUsers

from django.middleware.csrf import get_token
from django.http import JsonResponse


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

class handleAPI(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):

            service = request.data['service']
            method  = request.data['method']

            uid = CustomUsers.objects.get(email=request.session['email']).id
            token = Token.objects.get(user_id=uid).key
            headers = {
            'Authorization': 'Token '+token,
            "Content-Type":"application/json"
        }
            print('token is.',token)
            url = 'http://127.0.0.1:8000/'+service+'/'

            if method == 'get':

                response = requests.get(url=url, headers=headers)

            elif method == 'post':
                data = request.data['payload']
        
                response = requests.post(url=url, headers=headers, data=json.dumps(data))
            
            return Response(response.json())

