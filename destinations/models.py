from decimal import Decimal

from django.db import models


class Destination(models.Model):
    name = models.CharField(max_length=180)
    city = models.CharField(max_length=120)
    country = models.CharField(max_length=120)
    description = models.TextField()
    category = models.CharField(max_length=80, db_index=True)
    average_cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["country", "city", "name"]

    def __str__(self):
        return f"{self.name} ({self.city}, {self.country})"


class DestinationImage(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="destinations/")
    caption = models.CharField(max_length=200, blank=True)
    uploaded_by = models.ForeignKey("accounts.User", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Image for {self.destination.name}"
