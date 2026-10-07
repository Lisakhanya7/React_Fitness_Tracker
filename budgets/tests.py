from datetime import date

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from budgets.models import Budget, Expense
from itineraries.models import Trip


class BudgetAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="budgeter", email="budgeter@example.com", password="StrongPass123")
        self.trip = Trip.objects.create(
            title="Budget Trip",
            start_date=date(2026, 6, 1),
            end_date=date(2026, 6, 5),
            owner=self.user,
        )

    def test_budget_model(self):
        budget = Budget.objects.create(trip=self.trip, total_limit=1500.00)
        self.assertEqual(str(budget), f"Budget for {self.trip.title}")

    def test_expense_create(self):
        expense = Expense.objects.create(
            trip=self.trip,
            paid_by=self.user,
            description="Hotel payment",
            category="lodging",
            amount=350.00,
            expense_date=date(2026, 6, 2),
        )
        self.assertEqual(expense.amount, 350.00)

    def test_budget_list_requires_auth(self):
        response = self.client.get(reverse("budgets-list"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_budget_create_endpoint(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("budgets-list"),
            {"trip": self.trip.id, "currency": "USD", "total_limit": "1500.00"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_expense_list_endpoint(self):
        Expense.objects.create(
            trip=self.trip,
            paid_by=self.user,
            description="Meals",
            category="food",
            amount=120.00,
            expense_date=date(2026, 6, 3),
        )
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("expenses-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
