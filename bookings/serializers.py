from rest_framework import serializers

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "booking_type",
            "provider",
            "reference",
            "start_date",
            "end_date",
            "total_cost",
            "status",
            "created_by",
            "destination",
            "trip",
            "created_at",
        ]

    def validate(self, attrs):
        if attrs["start_date"] > attrs["end_date"]:
            raise serializers.ValidationError({"end_date": "End date must be after the start date."})
        return attrs
