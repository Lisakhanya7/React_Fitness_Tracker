from rest_framework.routers import DefaultRouter

from .views import BudgetViewSet, ExpenseViewSet

router = DefaultRouter()
router.register(r"budgets", BudgetViewSet, basename="budgets")
router.register(r"expenses", ExpenseViewSet, basename="expenses")

urlpatterns = router.urls
