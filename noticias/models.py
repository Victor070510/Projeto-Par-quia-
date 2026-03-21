from django.db import models

class Noticia(models.Model):
    titulo = models.CharField(max_length=200)
    imagem = models.ImageField(upload_to='noticias/')
    resumo = models.CharField(max_length=250)
    texto = models.TextField()
    publicado = models.BooleanField(default=True)
    destaque_home = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo