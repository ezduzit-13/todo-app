from django.db import models
from django.contrib.auth.models import (AbstractUser)

class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Post(models.Model):
    title = models.CharField(max_length=1000)
    describe = models.CharField(max_length=1000)    
    content = models.CharField(max_length=3000)

class Comment(models.Model):
    comment_content = models.CharField(max_length=255)
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)



