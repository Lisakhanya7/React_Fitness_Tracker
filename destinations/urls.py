from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import DestinationViewSet, personalized_recommendations, trending_destinations

router = DefaultRouter()
router.register(r"", DestinationViewSet, basename="destinations")

urlpatterns = [
    path("trending/", trending_destinations, name="trending-destinations"),
    path("recommendations/", personalized_recommendations, name="recommended-destinations"),
] + router.urls
