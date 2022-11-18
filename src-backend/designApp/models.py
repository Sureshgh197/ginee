from django.db import models

class JsonModel(models.Model):
    jsondata = models.JSONField()
