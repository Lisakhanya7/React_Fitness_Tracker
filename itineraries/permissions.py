from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsTripOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        trip = getattr(obj, "trip", obj)
        return bool(request.user and request.user.is_authenticated and trip.owner == request.user)


class IsTripMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        trip = getattr(obj, "trip", obj)
        if not request.user or not request.user.is_authenticated:
            return False
        if trip.owner == request.user:
            return True
        return trip.memberships.filter(user=request.user).exists()


class IsTripCollaborator(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        trip = getattr(obj, "trip", obj)
        if not request.user or not request.user.is_authenticated:
            return False
        if trip.owner == request.user:
            return True
        return trip.memberships.filter(user=request.user, role="collaborator").exists()


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and getattr(obj, "owner", None) == request.user)


class HasTripAccess(BasePermission):
    def has_object_permission(self, request, view, obj):
        trip = getattr(obj, "trip", obj)
        if not request.user or not request.user.is_authenticated:
            return False
        if trip.owner == request.user:
            return True
        if request.method in SAFE_METHODS:
            return trip.memberships.filter(user=request.user).exists()
        return trip.memberships.filter(user=request.user, role="collaborator").exists()


class IsSelfOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and obj == request.user)
