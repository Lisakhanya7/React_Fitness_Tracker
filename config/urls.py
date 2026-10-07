from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("api/auth/", include("accounts.urls")),
    path("api/destinations/", include("destinations.urls")),
    path("api/trips/", include("itineraries.urls")),
    path("api/bookings/", include("bookings.urls")),
    path("api/budgets/", include("budgets.urls")),
    path("api/reviews/", include("reviews.urls")),
]
