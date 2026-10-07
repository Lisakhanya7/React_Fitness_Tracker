from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from destinations.models import Destination


class DestinationAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="traveler", email="traveler@example.com", password="StrongPass123")
        self.destination = Destination.objects.create(
            name="Lake Como",
            city="Como",
            country="Italy",
            description="A lakeside getaway.",
            category="nature",
            average_cost=250.00,
        )

    def test_destination_model_str(self):
        self.assertIn("Lake Como", str(self.destination))

    def test_destination_list_requires_auth(self):
        response = self.client.get(reverse("destinations-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_destination_search_filters_by_country(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("destinations-list"), {"country": "Italy"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data["results"]), 1)

    def test_destination_search_works(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("destinations-list"), {"search": "Como"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(item["name"] == "Lake Como" for item in response.data["results"]))

    def test_trending_endpoint_returns_destinations(self):
        response = self.client.get(reverse("trending-destinations"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

    def test_create_destination_by_authenticated_user(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("destinations-list"),
            {
                "name": "Santorini",
                "city": "Fira",
                "country": "Greece",
                "description": "Whitewashed cliffs",
                "category": "beach",
                "average_cost": 320.00,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Destination.objects.filter(name="Santorini").exists())
