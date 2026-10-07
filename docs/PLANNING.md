# Travel Itinerary Planning API — Planning Notes

This platform models the full travel planning lifecycle: users register, browse destinations, create trips, add collaborators, book activities, track budgets, and leave reviews. The data model centers on a `User` owning many `Trip` records, each of which can include `ItineraryDay`, `ItineraryItem`, `Budget`, `Expense`, and `Booking` objects. Reviews and destination media enrich the destination catalog while collaborators and activity logs support shared trip management.

The core flow begins with registration and JWT authentication. Once authenticated, a user can discover destinations using search and filtering, then create a trip with date ranges and status. Itinerary days and items are added per trip, while bookings and expenses are associated with the same trip and optionally a destination. The budget is tracked through a one-to-one relationship with each trip, giving a clear view of total spend against the trip limit.

Roles are enforced with permission logic: owners have full access to trip configuration, collaborators can view and update shared trip data, and viewers can read only. Review creation is restricted to authenticated users and each user can only review a given destination once. This enforces integrity while keeping the workflow simple.

The backend uses Django REST Framework with JWT, filtering, pagination, and OpenAPI schema generation. Search and listing endpoints use `DjangoFilterBackend`, `SearchFilter`, and `OrderingFilter`. Querysets are optimized with `select_related`, `prefetch_related`, and `annotate` to keep trip and destination queries efficient even when nested items and logs are requested.

The URL layout follows a root API namespace: `/api/auth/`, `/api/destinations/`, `/api/trips/`, `/api/bookings/`, `/api/budgets/`, and `/api/reviews/`. The schema is available through `/api/schema/`, `/api/docs/`, and `/api/redoc/` for Swagger and Redoc documentation.

Testing uses Django’s TestCase and APITestCase with a separate test database. The suite covers auth, serializer validation, CRUD endpoints, permission checks, and model constraints. Coverage is measured via `coverage run --source='.' manage.py test` and must remain above 75%.

The system is designed for maintainability: each app owns a clear concern, models are normalized around the shared trip concept, and the API is intentionally small but extensible for future modules like notifications, payments, or recommendations.
