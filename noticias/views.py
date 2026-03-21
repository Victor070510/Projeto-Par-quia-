from django.shortcuts import render
from .models import Noticia

def home(request):
    noticias = Noticia.objects.filter(publicado=True, destaque_home=True).order_by("-data_criacao")
    return render(request, "noticias/index.html", {"noticias": noticias})