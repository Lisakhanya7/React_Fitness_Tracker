from django.db import models


class Booking(models.Model):
    BOOKING_TYPE_CHOICES = [
        ("accommodation", "Accommodation"),
        ("activity", "Activity"),
        ("transport", "Transport"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
    ]

    booking_type = models.CharField(max_length=20, choices=BOOKING_TYPE_CHOICES)
    provider = models.CharField(max_length=180)
    reference = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_by = models.ForeignKey("accounts.User", on_delete=models.PROTECT, related_name="bookings")
    destination = models.ForeignKey("destinations.Destination", on_delete=models.SET_NULL, null=True, blank=True, related_name="bookings")
    trip = models.ForeignKey("itineraries.Trip", on_delete=models.CASCADE, related_name="bookings")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["start_date", "provider"]

    def __str__(self):
        return f"{self.provider} ({self.booking_type})"
