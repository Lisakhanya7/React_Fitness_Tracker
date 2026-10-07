from django.db.models import Avg, Count, Q
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Destination
from .serializers import DestinationSerializer


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def trending_destinations(request):
    qs = (
        Destination.objects.filter(is_active=True)
        .annotate(avg_rating=Avg("reviews__rating"), review_count=Count("reviews"))
        .order_by("-avg_rating", "-review_count")[:5]
    )
    serializer = DestinationSerializer(qs, many=True)
    return Response(serializer.data)


class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.filter(is_active=True).annotate(
        avg_rating=Avg("reviews__rating"), review_count=Count("reviews")
    ).order_by("country", "city", "name")
    serializer_class = DestinationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["city", "country", "category", "is_active"]
    search_fields = ["name", "city", "country", "description"]
    ordering_fields = ["name", "city", "average_cost", "created_at"]

    def get_queryset(self):
        qs = Destination.objects.filter(is_active=True).annotate(
            avg_rating=Avg("reviews__rating"),
            review_count=Count("reviews"),
        ).order_by("country", "city", "name")
        query = self.request.query_params.get("query", "")
        if query:
            qs = qs.filter(Q(name__icontains=query) | Q(city__icontains=query) | Q(country__icontains=query))
        return qs
