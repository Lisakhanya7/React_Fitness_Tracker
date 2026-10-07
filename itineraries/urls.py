from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityLogViewSet,
    ItineraryDayViewSet,
    ItineraryItemViewSet,
    TripAttachmentViewSet,
    TripMemberViewSet,
    TripViewSet,
    trip_summary,
)

router = DefaultRouter()
router.register(r"", TripViewSet, basename="trips")

trip_urlpatterns = [
    path("summary/", trip_summary, name="trip-summary"),
    path("<int:trip_pk>/members/", TripMemberViewSet.as_view({"get": "list", "post": "create", "delete": "destroy"}), name="trip-members"),
    path("<int:trip_pk>/days/", ItineraryDayViewSet.as_view({"get": "list", "post": "create"}), name="trip-days"),
    path("<int:trip_pk>/days/<int:pk>/", ItineraryDayViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}), name="trip-day-detail"),
    path("<int:trip_pk>/days/<int:day_pk>/items/", ItineraryItemViewSet.as_view({"get": "list", "post": "create"}), name="trip-items"),
    path("<int:trip_pk>/days/<int:day_pk>/items/<int:pk>/", ItineraryItemViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}), name="trip-item-detail"),
    path("<int:trip_pk>/logs/", ActivityLogViewSet.as_view({"get": "list"}), name="trip-logs"),
    path("<int:trip_pk>/attachments/", TripAttachmentViewSet.as_view({"get": "list", "post": "create"}), name="trip-attachments"),
]

urlpatterns = trip_urlpatterns + [path("", include(router.urls))]
