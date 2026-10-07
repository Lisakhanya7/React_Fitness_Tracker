from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email or self.username


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    home_city = models.CharField(max_length=120, blank=True)
    preferred_interests = models.JSONField(default=list, blank=True)
    avatar = models.ImageField(upload_to="profiles/", blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
