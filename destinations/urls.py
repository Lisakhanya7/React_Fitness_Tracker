from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import DestinationViewSet, trending_destinations

router = DefaultRouter()
router.register(r"", DestinationViewSet, basename="destinations")

urlpatterns = [
    path("trending/", trending_destinations, name="trending-destinations"),
] + router.urls
