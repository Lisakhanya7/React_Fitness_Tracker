from rest_framework import serializers

from .models import ActivityLog, ItineraryDay, ItineraryItem, Trip, TripAttachment, TripMember


class TripMemberSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = TripMember
        fields = ["id", "trip", "user", "user_name", "role", "invited_at"]


class ItineraryItemSerializer(serializers.ModelSerializer):
    day = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ItineraryItem
        fields = ["id", "day", "destination", "title", "start_time", "end_time", "notes", "position"]


class ItineraryDaySerializer(serializers.ModelSerializer):
    items = ItineraryItemSerializer(many=True, read_only=True)
    trip = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ItineraryDay
        fields = ["id", "trip", "date", "title", "notes", "items"]


class ActivityLogSerializer(serializers.ModelSerializer):
    actor_name = serializers.CharField(source="actor.username", read_only=True)
    actor = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ActivityLog
        fields = ["id", "trip", "actor", "actor_name", "action", "details", "created_at"]


class TripAttachmentSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TripAttachment
        fields = ["id", "trip", "file", "label", "uploaded_by", "uploaded_at"]


class TripSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source="owner.username", read_only=True)
    member_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Trip
        fields = [
            "id",
            "title",
            "description",
            "start_date",
            "end_date",
            "status",
            "owner",
            "owner_name",
            "member_count",
            "created_at",
            "updated_at",
        ]


class TripDetailSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    memberships = TripMemberSerializer(many=True, read_only=True)
    days = ItineraryDaySerializer(many=True, read_only=True)
    activity_logs = ActivityLogSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = [
            "id",
            "title",
            "description",
            "start_date",
            "end_date",
            "status",
            "owner",
            "memberships",
            "days",
            "activity_logs",
            "created_at",
            "updated_at",
        ]
