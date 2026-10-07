from django.db.models import Avg, Q
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Review
from .serializers import ReviewSerializer


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def destination_review_summary(request, destination_id):
    q = Review.objects.filter(destination_id=destination_id)
    data = {
        "count": q.count(),
        "average_rating": q.aggregate(avg_rating=Avg("rating"))["avg_rating"] or 0,
    }
    return Response(data)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related("destination", "author")
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["destination", "author"]
    search_fields = ["title", "body"]
    ordering_fields = ["rating", "created_at"]

    def get_queryset(self):
        if not self.request.user or not self.request.user.is_authenticated:
            return Review.objects.filter(destination__is_active=True).select_related("destination", "author")
        return Review.objects.filter(Q(destination__is_active=True) | Q(author=self.request.user)).select_related("destination", "author")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
