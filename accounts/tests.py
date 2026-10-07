from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import Profile, User


class AuthAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="alice",
            email="alice@example.com",
            password="StrongPass123",
            first_name="Alice",
            last_name="Smith",
        )
        Profile.objects.get_or_create(user=self.user)

    def test_register_user(self):
        response = self.client.post(
            reverse("register"),
            {
                "username": "bob",
                "email": "bob@example.com",
                "password": "StrongPass123",
                "confirm_password": "StrongPass123",
                "first_name": "Bob",
                "last_name": "Jones",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="bob@example.com").exists())

    def test_register_user_password_mismatch(self):
        response = self.client.post(
            reverse("register"),
            {
                "username": "charlie",
                "email": "charlie@example.com",
                "password": "StrongPass123",
                "confirm_password": "OtherPass123",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_token_login_by_email(self):
        response = self.client.post(reverse("token_obtain_pair"), {"email": "alice@example.com", "password": "StrongPass123"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_me_endpoint_requires_auth(self):
        response = self.client.get(reverse("me"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_endpoint_returns_user(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("me"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], "alice@example.com")

    def test_profile_endpoint_gives_user_profile(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("profile"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("profile", response.data)
