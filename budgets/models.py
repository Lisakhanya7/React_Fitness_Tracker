from django.db import models


class Budget(models.Model):
    trip = models.OneToOneField("itineraries.Trip", on_delete=models.CASCADE, related_name="budget")
    currency = models.CharField(max_length=3, default="USD")
    total_limit = models.DecimalField(max_digits=12, decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Budget for {self.trip.title}"


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ("lodging", "Lodging"),
        ("food", "Food"),
        ("transport", "Transport"),
        ("activities", "Activities"),
        ("other", "Other"),
    ]

    trip = models.ForeignKey("itineraries.Trip", on_delete=models.CASCADE, related_name="expenses")
    booking = models.ForeignKey("bookings.Booking", on_delete=models.SET_NULL, null=True, blank=True, related_name="expenses")
    paid_by = models.ForeignKey("accounts.User", on_delete=models.PROTECT, related_name="expenses")
    description = models.CharField(max_length=180)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="other")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-expense_date", "-created_at"]

    def __str__(self):
        return f"{self.description} ({self.amount})"
