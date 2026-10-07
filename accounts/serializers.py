from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import Profile, User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["home_city", "preferred_interests", "avatar"]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "profile"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password", "confirm_password", "first_name", "last_name"]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        Profile.objects.get_or_create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        email = attrs.get("email")
        password = attrs.get("password")

        if not password:
            raise serializers.ValidationError({"password": "This field is required."})

        user = authenticate(username=username, email=email, password=password)
        if user is None:
            if email:
                try:
                    user = User.objects.get(email=email)
                except User.DoesNotExist:
                    user = None
            if user is None and username:
                try:
                    user = User.objects.get(username=username)
                except User.DoesNotExist:
                    user = None
            if user is None or not user.check_password(password):
                raise serializers.ValidationError("Invalid credentials.")
        return {"user": user}
