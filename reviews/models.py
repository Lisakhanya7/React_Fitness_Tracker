from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Review(models.Model):
    destination = models.ForeignKey("destinations.Destination", on_delete=models.CASCADE, related_name="reviews")
    author = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=180)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [models.UniqueConstraint(fields=["destination", "author"], name="unique_destination_review_author")]

    def __str__(self):
        return f"{self.author.username} on {self.destination.name}"
