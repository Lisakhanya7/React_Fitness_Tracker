from django.db import models


class Trip(models.Model):
    STATUS_CHOICES = [
        ("planning", "Planning"),
        ("booked", "Booked"),
        ("in_progress", "In progress"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    title = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="planning")
    owner = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="owned_trips")
    collaborators = models.ManyToManyField("accounts.User", through="TripMember", related_name="shared_trips")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-start_date", "title"]

    def __str__(self):
        return self.title


class TripMember(models.Model):
    ROLE_CHOICES = [
        ("collaborator", "Collaborator"),
        ("viewer", "Viewer"),
    ]

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="memberships")
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="trip_memberships")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="viewer")
    invited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["trip", "user"], name="unique_trip_member")]

    def __str__(self):
        return f"{self.user} -> {self.trip} ({self.role})"


class ItineraryDay(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="days")
    date = models.DateField()
    title = models.CharField(max_length=180, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["date"]
        constraints = [models.UniqueConstraint(fields=["trip", "date"], name="unique_trip_day")]

    def __str__(self):
        return f"{self.trip.title} - {self.date}"


class ItineraryItem(models.Model):
    day = models.ForeignKey(ItineraryDay, on_delete=models.CASCADE, related_name="items")
    destination = models.ForeignKey("destinations.Destination", on_delete=models.SET_NULL, null=True, blank=True, related_name="itinerary_items")
    title = models.CharField(max_length=180)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    position = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["position", "start_time"]

    def __str__(self):
        return self.title


class ActivityLog(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="activity_logs")
    actor = models.ForeignKey("accounts.User", on_delete=models.SET_NULL, null=True, related_name="trip_activity")
    action = models.CharField(max_length=100)
    details = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.action} on {self.trip.title}"


class TripAttachment(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="attachments")
    file = models.FileField(upload_to="trip-attachments/%Y/%m/")
    label = models.CharField(max_length=180, blank=True)
    uploaded_by = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.label or self.file.name
