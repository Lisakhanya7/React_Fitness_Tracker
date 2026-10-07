from rest_framework import serializers

from .models import Budget, Expense


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ["id", "trip", "currency", "total_limit", "updated_at"]


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["id", "trip", "booking", "paid_by", "description", "category", "amount", "expense_date", "created_at"]
