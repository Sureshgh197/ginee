
from rest_framework import serializers
from .models import JsonModel


class JsonFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JsonModel
        fields = ('id','jsondata',)



