from datetime import date

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from bookings.models import Booking
from destinations.models import Destination
from itineraries.models import Trip


class BookingAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="booker", email="booker@example.com", password="StrongPass123")
        self.trip = Trip.objects.create(
            title="Madrid Trip",
            description="Week in Spain",
            start_date=date(2026, 9, 1),
            end_date=date(2026, 9, 7),
            owner=self.user,
        )
        self.destination = Destination.objects.create(
            name="Madrid",
            city="Madrid",
            country="Spain",
            description="Big city",
            category="city",
            average_cost=210.00,
        )

    def test_booking_model_str(self):
        booking = Booking.objects.create(
            booking_type="accommodation",
            provider="Hotel Luna",
            start_date=date(2026, 9, 2),
            end_date=date(2026, 9, 5),
            total_cost=600.00,
            created_by=self.user,
            trip=self.trip,
            destination=self.destination,
        )
        self.assertIn("Hotel Luna", str(booking))

    def test_booking_creation(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("bookings-list"),
            {
                "booking_type": "accommodation",
                "provider": "Hotel Luna",
                "start_date": "2026-09-02",
                "end_date": "2026-09-05",
                "total_cost": "600.00",
                "trip": self.trip.id,
                "destination": self.destination.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_booking_end_date_validation(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("bookings-list"),
            {
                "booking_type": "activity",
                "provider": "Museum Pass",
                "start_date": "2026-09-07",
                "end_date": "2026-09-05",
                "total_cost": "50.00",
                "trip": self.trip.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_booking_list_returns_owned(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("bookings-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_booking_api_rejects_unauthorized_user(self):
        response = self.client.get(reverse("bookings-list"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
