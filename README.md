# Travel Itinerary Planning & Booking API

This repository contains a Django REST API for trip planning, collaboration, destination discovery, booking management, budgets, expenses, and reviews. The project uses JWT authentication, layered permissions, and OpenAPI docs for a clean developer experience.

## Technologies

- Python 3.14
- Django 5.2
- Django REST Framework 3.15
- djangorestframework-simplejwt
- django-filter
- drf-spectacular
- SQLite for local development

## Project overview

Users can create accounts, log in with JWT, browse destinations, create trip itineraries, add collaborators, book accommodations and activities, track budgets, and review destinations. The core design centers around a trip, with nested itinerary days, trip members, bookings, and expenses all linked to the same travel plan.

## Installation and setup

1. Clone the repository.
2. Create and activate a virtual environment.
3. Install dependencies:
   `pip install -r requirements.txt`
4. Copy `.env.example` to `.env` and customize values as needed.
5. Run migrations:
   `python manage.py migrate`
6. Start the server:
   `python manage.py runserver 127.0.0.1:8000`

## Environment variables

- `SECRET_KEY` — Django secret key
- `DEBUG` — enable/disable debug mode
- `ALLOWED_HOSTS` — comma-separated hosts

## Authentication

The API uses JWT bearer tokens.

Example login request:

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"StrongPass123"}'
```

Use the returned `access` token as:

```bash
curl http://127.0.0.1:8000/api/auth/me/ \
  -H "Authorization: Bearer <access_token>"
```

## API endpoints

- Auth: `/api/auth/register/`, `/api/auth/login/`, `/api/auth/token/refresh/`, `/api/auth/me/`, `/api/auth/profile/`
- Destinations: `/api/destinations/`, `/api/destinations/trending/`, `/api/destinations/recommendations/`
- Trips: `/api/trips/`, `/api/trips/summary/`, `/api/trips/<id>/days/`, `/api/trips/<id>/members/`
- Bookings: `/api/bookings/`
- Budgets: `/api/budgets/budgets/`, `/api/budgets/expenses/`
- Reviews: `/api/reviews/`, `/api/reviews/destinations/<id>/summary/`
- Docs: `/api/schema/`, `/api/docs/`, `/api/redoc/`

## Example requests

Create a trip:

```bash
curl -X POST http://127.0.0.1:8000/api/trips/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Paris Weekend","description":"Short getaway","start_date":"2026-07-10","end_date":"2026-07-14","status":"planning"}'
```

Create a review:

```bash
curl -X POST http://127.0.0.1:8000/api/reviews/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"destination": 1, "rating": 5, "title": "Great", "body": "Excellent destination."}'
```

## Project structure

- `accounts/` — user model, auth, profile endpoints
- `destinations/` — destination and media catalog
- `itineraries/` — trips, day plans, attachments, collaborators
- `bookings/` — reservations and accommodation/activity records
- `budgets/` — budget and expense records
- `reviews/` — destination ratings and feedback
- `config/` — Django settings and URLs
- `docs/` — planning and ERD documentation

## ERD

See [docs/ERD.md](docs/ERD.md).
