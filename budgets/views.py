from django.db.models import Q
from rest_framework import permissions, viewsets

from itineraries.permissions import IsTripMember
from .models import Budget, Expense
from .serializers import BudgetSerializer, ExpenseSerializer


class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripMember]

    def get_queryset(self):
        return Budget.objects.filter(Q(trip__owner=self.request.user) | Q(trip__collaborators=self.request.user)).select_related("trip")


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripMember]

    def get_queryset(self):
        return Expense.objects.filter(Q(trip__owner=self.request.user) | Q(trip__collaborators=self.request.user)).select_related("trip", "booking", "paid_by")
