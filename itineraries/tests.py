from datetime import date

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from itineraries.models import Trip


class TripAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="planner", email="planner@example.com", password="StrongPass123")
        self.trip = Trip.objects.create(
            title="Italian Escape",
            description="A week in Italy",
            start_date=date(2026, 6, 1),
            end_date=date(2026, 6, 7),
            status="planning",
            owner=self.user,
        )

    def test_trip_model_str(self):
        self.assertEqual(str(self.trip), "Italian Escape")

    def test_trip_list_returns_owned_trips(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("trips-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_trip_creation(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("trips-list"),
            {
                "title": "Paris Weekend",
                "description": "Short trip",
                "start_date": "2026-07-10",
                "end_date": "2026-07-14",
                "status": "planning",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Trip.objects.filter(title="Paris Weekend").exists())

    def test_trip_summary_endpoint(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("trip-summary"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_trip_detail_endpoint(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("trips-detail", args=[self.trip.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Italian Escape")

    def test_trip_day_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("trip-days", kwargs={"trip_pk": self.trip.id}),
            {"date": "2026-06-02", "title": "City Tour", "notes": "Visit old town"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
