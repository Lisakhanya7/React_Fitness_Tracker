from django.db.models import Q
from rest_framework import permissions, viewsets

from itineraries.permissions import IsTripMember
from .models import Booking
from .serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripMember]

    def get_queryset(self):
        return Booking.objects.filter(Q(trip__owner=self.request.user) | Q(trip__collaborators=self.request.user)).select_related("trip", "destination", "created_by")

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
