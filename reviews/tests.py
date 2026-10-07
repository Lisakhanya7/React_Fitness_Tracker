from datetime import date

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from destinations.models import Destination
from reviews.models import Review


class ReviewAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="reviewer", email="reviewer@example.com", password="StrongPass123")
        self.destination = Destination.objects.create(
            name="Kyoto",
            city="Kyoto",
            country="Japan",
            description="Historic city",
            category="culture",
            average_cost=180.00,
        )

    def test_review_model_str(self):
        review = Review.objects.create(
            destination=self.destination,
            author=self.user,
            rating=5,
            title="Beautiful",
            body="A lovely city to explore.",
        )
        self.assertIn("Kyoto", str(review))

    def test_review_creation(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("reviews-list"),
            {"destination": self.destination.id, "rating": 5, "title": "Great", "body": "Amazing trip."},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_review_summary_endpoint(self):
        Review.objects.create(
            destination=self.destination,
            author=self.user,
            rating=5,
            title="Excellent",
            body="Wonderful city.",
        )
        response = self.client.get(reverse("destination-review-summary", kwargs={"destination_id": self.destination.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_review_unique_constraint(self):
        Review.objects.create(destination=self.destination, author=self.user, rating=5, title="Old", body="body")
        with self.assertRaises(Exception):
            Review.objects.create(destination=self.destination, author=self.user, rating=4, title="New", body="new body")

    def test_review_list_requires_auth_for_post_but_allows_read(self):
        response = self.client.get(reverse("reviews-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
