from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ReviewViewSet, destination_review_summary

router = DefaultRouter()
router.register(r"", ReviewViewSet, basename="reviews")

urlpatterns = [
    path("destinations/<int:destination_id>/summary/", destination_review_summary, name="destination-review-summary"),
] + router.urls
