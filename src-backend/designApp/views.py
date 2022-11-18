import json
from django.shortcuts import render

from .models import JsonModel
from .serializers import JsonFileSerializer
from .authentication import ExpiringTokenAuthentication

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status

class JsonListView(APIView):
    authentication_classes = [ExpiringTokenAuthentication]
    permission_classes = [IsAuthenticated]
    # parser_classes = [JSONParser]

    def get(self, request, format=None): 

            jsondata = JsonModel.objects.all()
            serializer = JsonFileSerializer(jsondata,many=True)
            data = serializer.data
            return Response(data)


    def post(self,request,format=None):
        
        serializer = JsonFileSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JsonDetailView(APIView):
    authentication_classes = [ExpiringTokenAuthentication]
    permission_classes = [IsAuthenticated]
    

    def get_object(self, pk):
        try:
            return JsonModel.objects.get(pk=pk)
        except JsonModel.DoesNotExist:
            raise Http404

    def get(self, request,pk, format=None):            
            jsondata = self.get_object(pk)
            serializer = JsonFileSerializer(jsondata)
            return Response(serializer.data)


def GoogleTemp(request):
    return render(request,'designApp/index.html',{})



class SaveAllAPI(APIView):

    def post(self,request,format=None):
        
        data = request.data["data"]

        try:
            for i in data:
                serializer = JsonFileSerializer(data=i)
                if serializer.is_valid():
                    serializer.save()
                else:
                    continue

            return Response("Files saved successfully")

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)



