from rest_framework import serializers

from .models import Destination, DestinationImage


class DestinationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationImage
        fields = ["id", "image", "caption", "uploaded_by"]


class DestinationSerializer(serializers.ModelSerializer):
    images = DestinationImageSerializer(many=True, read_only=True)
    avg_rating = serializers.FloatField(read_only=True)
    review_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Destination
        fields = [
            "id",
            "name",
            "city",
            "country",
            "description",
            "category",
            "average_cost",
            "is_active",
            "created_at",
            "images",
            "avg_rating",
            "review_count",
        ]
