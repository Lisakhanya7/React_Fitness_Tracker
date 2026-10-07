from django.db.models import Count, Q
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import ActivityLog, ItineraryDay, ItineraryItem, Trip, TripAttachment, TripMember
from .permissions import IsTripMember, IsTripOwner
from .serializers import (
    ActivityLogSerializer,
    ItineraryDaySerializer,
    ItineraryItemSerializer,
    TripAttachmentSerializer,
    TripDetailSerializer,
    TripMemberSerializer,
    TripSerializer,
)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def trip_summary(request):
    trips = Trip.objects.filter(Q(owner=request.user) | Q(collaborators=request.user)).annotate(member_count=Count("memberships"))
    data = {"count": trips.count(), "trips": TripSerializer(trips, many=True).data}
    return Response(data)


class TripViewSet(viewsets.ModelViewSet):
    serializer_class = TripDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Trip.objects.filter(Q(owner=self.request.user) | Q(collaborators=self.request.user))
            .select_related("owner")
            .prefetch_related("memberships__user", "days__items", "activity_logs")
            .annotate(member_count=Count("memberships"))
            .order_by("-start_date", "title")
        )

    def get_serializer_class(self):
        if self.action == "list":
            return TripSerializer
        return TripDetailSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TripMemberViewSet(viewsets.ModelViewSet):
    queryset = TripMember.objects.select_related("trip", "user")
    serializer_class = TripMemberSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripOwner]

    def get_queryset(self):
        return TripMember.objects.filter(trip_id=self.kwargs["trip_pk"]).select_related("user")

    def perform_create(self, serializer):
        serializer.save(trip_id=self.kwargs["trip_pk"]) 


class ItineraryDayViewSet(viewsets.ModelViewSet):
    serializer_class = ItineraryDaySerializer
    permission_classes = [permissions.IsAuthenticated, IsTripMember]

    def get_queryset(self):
        return ItineraryDay.objects.filter(trip_id=self.kwargs["trip_pk"]).prefetch_related("items")

    def perform_create(self, serializer):
        serializer.save(trip_id=self.kwargs["trip_pk"]) 


class ItineraryItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItineraryItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripMember]

    def get_queryset(self):
        return ItineraryItem.objects.filter(day__trip_id=self.kwargs["trip_pk"]).select_related("day", "destination")

    def perform_create(self, serializer):
        serializer.save(day_id=self.kwargs["day_pk"]) 


class ActivityLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripMember]

    def get_queryset(self):
        return ActivityLog.objects.filter(trip_id=self.kwargs["trip_pk"]).select_related("actor")


class TripAttachmentViewSet(viewsets.ModelViewSet):
    serializer_class = TripAttachmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripMember]

    def get_queryset(self):
        return TripAttachment.objects.filter(trip_id=self.kwargs["trip_pk"]).select_related("uploaded_by")

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
