# ERD

```mermaid
erDiagram
    USER ||--o{ TRIP : owns
    USER ||--o| PROFILE : has
    USER ||--o{ REVIEW : writes
    USER ||--o{ BOOKING : creates
    USER ||--o{ EXPENSE : pays
    USER ||--o{ TRIP_MEMBER : joins
    USER }o--o{ TRIP : collaborates

    DESTINATION ||--o{ DESTINATION_IMAGE : contains
    DESTINATION ||--o{ REVIEW : receives
    DESTINATION ||--o{ BOOKING : booked_for
    DESTINATION ||--o{ ITINERARY_ITEM : planned_in

    TRIP ||--o{ TRIP_MEMBER : members
    TRIP ||--o{ ITINERARY_DAY : contains
    TRIP ||--o{ ACTIVITY_LOG : logs
    TRIP ||--o{ BOOKING : has
    TRIP ||--o| BUDGET : has
    TRIP ||--o{ EXPENSE : includes
    TRIP ||--o{ TRIP_ATTACHMENT : stores

    ITINERARY_DAY ||--o{ ITINERARY_ITEM : contains
    BOOKING ||--o{ EXPENSE : linked_to
```

## Auth flow

1. User submits registration data to `/api/auth/register/`.
2. The API validates and creates the `User` and default `Profile`.
3. User requests `/api/auth/login/` and receives a JWT access and refresh token.
4. The client sends the access token as `Authorization: Bearer <token>`.
5. Protected endpoints validate the token and enforce role-based permissions.

## Permission matrix

| Resource | Owner | Collaborator | Viewer | Authenticated | Anonymous |
| --- | --- | --- | --- | --- | --- |
| Trip | Full CRUD | Read + update shared trip data | Read only | Yes | No |
| Booking | Full CRUD | Read + update shared bookings | Read only | Yes | No |
| Expense | Full CRUD | Read + create update own entries | Read only | Yes | No |
| Review | Own review only | Own review only | No | Read only | Read only |
| Destination | N/A | N/A | N/A | Read only | Read only |

## API endpoints

- GET/POST `/api/auth/register/`, `/api/auth/login/`, `/api/auth/me/`, `/api/auth/profile/`
- GET `/api/destinations/`, `/api/destinations/trending/`
- GET/POST `/api/trips/`, `/api/trips/summary/`
- GET/POST/DELETE `/api/trips/<id>/members/`
- GET/POST `/api/trips/<id>/days/`
- GET/POST `/api/bookings/`
- GET/POST `/api/budgets/budgets/`, `/api/budgets/expenses/`
- GET/POST `/api/reviews/`, `/api/reviews/destinations/<id>/summary/`
- Documentation: `/api/schema/`, `/api/docs/`, `/api/redoc/`
