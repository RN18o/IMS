# Users API (Backend)

This document describes the user-related endpoints implemented under the `/users` route in this project. The server mounts user routes at `/users` (see `app.js`).

All endpoints accept and return JSON unless otherwise stated. The server sets and reads an auth cookie named `token` and also supports `Authorization: Bearer <token>` headers.

---

## 1) POST /users/register
Create a new user account.

- Authentication: public
- Content-Type: application/json

Request body (JSON):
- fullname: object
  - firstname (string, required, min 3)
  - lastname (string, optional)
- email (string, required, must be a valid email)
- password (string, required, min 6)
- phone (number, optional)
- Address (string, required)
- pincode (string, required)

Example:
{
  "fullname": {"firstname": "Alice", "lastname": "Smith"},
  "email": "alice@example.com",
  "password": "secret123",
  "phone": 1234567890,
  "Address": "123 Main St",
  "pincode": "123456"
}

Responses:
- 201 Created
  - Body: { token, user }
  - `token` is a JWT; `user` is the created user object.
- 400 Bad Request
  - Returned for validation errors or if the user already exists.

---

## 2) POST /users/login
Authenticate an existing user.

- Authentication: public
- Content-Type: application/json

Request body:
- email (string, required)
- password (string, required)

Example:
{
  "email": "alice@example.com",
  "password": "secret123"
}

Responses:
- 200 OK
  - Body: { message, token, user }
  - The server also sets a `token` cookie.
- 400 Bad Request
  - Validation errors.
- 401 Unauthorized
  - Invalid email or password.

---

## 3) POST /users/password/forgot
Trigger a password reset email (generates a reset token and emails a reset link).

- Authentication: in current code this route is protected by authmiddleware, but typically this should be public. Check your routing; if protected, you must be logged in to hit it.
- Content-Type: application/json

Request body:
- email (string, required)

Responses:
- 200 OK
  - Body: { success: true, message }
  - The user will receive an email with a reset link including a token.
- 404 Not Found
  - If the email is not registered.
- 500 Internal Server Error
  - If sending the email fails.

---

## 4) PUT /users/password/reset/:token
Reset a user's password using the reset token sent via email.

- Authentication: in current code route uses `authmiddleware`, but normally this should be public and rely on the token path parameter.
- Content-Type: application/json

URL parameters:
- token (string) — the password reset token from the email link

Request body:
- password (string, required)
- confirmPassword (string, required)

Responses:
- 200 OK
  - Body: { message, user }
- 400 Bad Request
  - Passwords do not match or token invalid/expired.

---

## 5) GET /users/logout
Log the user out.

- Authentication: required (route uses `authmiddleware.authUser`)
- Method: GET

Behavior:
- Clears the server `token` cookie and stores the token in the `BlacklistToken` collection so it can't be reused.

Responses:
- 200 OK
  - Body: { message: "Logged out" }
- 401 Unauthorized
  - If no valid token is provided.

---

## 6) PUT /users/updateprofile
Update details of the authenticated user (partial updates allowed).

- Authentication: required
- Content-Type: application/json

Request body (any of):
- fullname: object (optional)
  - firstname (string, min 3)
  - lastname (string)
- email (string, optional, must be a valid email)
- password (string, optional, min 6)

Example (change firstname and email):
{
  "fullname": { "firstname": "Alicia" },
  "email": "alicia@example.com"
}

Responses:
- 200 OK
  - Body: { message: 'Profile updated', user }
- 400 Bad Request
  - Validation errors
- 401 Unauthorized
  - If the user is not authenticated
- 404 Not Found
  - If the user no longer exists

---

## 7) DELETE /users/deleteprofile
Delete the authenticated user's profile.

- Authentication: required
- Method: DELETE

Responses:
- 200 OK
  - Body: { message: 'User deleted' }
- 401 Unauthorized
  - If the user is not authenticated or token invalid
- 404 Not Found
  - If the user cannot be found

---

## 8) GET /users/fetchprofile
Fetch the authenticated user's profile.

- Authentication: required
- Method: GET

Responses:
- 200 OK
  - Body: { user }
- 401 Unauthorized
  - If the user is not authenticated

---

Notes & implementation details
- Authentication: routes that require authentication use the `auth.middleware` which reads JWT from either the `token` cookie or the `Authorization: Bearer <token>` header.
- Password handling: passwords are hashed using bcrypt before saving. `userModel` marks `password` with `select: false`, so responses won't include the password field by default.
- Validation: request validations are performed with `express-validator` in the routes; controller functions also re-check validation results.
- Reset password token: the user model creates a hashed reset token and sets `resetPasswordExpire`.

If you want, I can:
- Add example `curl` / PowerShell commands for each endpoint (including login + token usage).
- Normalize the password reset endpoints to be public (commonly done) and add improved JSON error shapes.

---

Location
- `Backend/routes/user.route.js` defines these routes and `app.js` mounts them at `/users`.



---

## Incidents API

Routes are mounted under `/incidents` (see `app.js`). The routes below use the same auth middleware as users: the token can come from a `token` cookie or from `Authorization: Bearer <token>` header.

### POST /incidents/createincident
Create a new incident. (In the code this route is defined as `/createincident` on the incidents router.)

- Authentication: required
- Content-Type: application/json

Request body (JSON):
- incidentDetails (string, required, min length 3)
- priority (string, optional, one of: "High", "Medium", "Low")
- status (string, optional, one of: "Open", "In Progress", "Closed")
- reportedDateTime (ISO date string, optional)
- incidentId (optional string — if omitted the server generates one)

Example request body:
{
  "incidentDetails": "Description of the incident",
  "priority": "High",
  "status": "Open"
}

Responses:
- 201 Created — body: { message: "Incident created", incident }
  - The `incident` will include `reporterdetails` as a plain name string (the authenticated user's fullname) and the generated/assigned `incidentId`.
- 400 Bad Request — validation failed
- 401 Unauthorized — not authenticated

### PUT /incidents/updateincidents/:id
Update an existing incident. Only the user who created the incident can update it.

- Authentication: required
- URL parameter: `id` — the incident document id
- Content-Type: application/json

Request body (any of):
- incidentDetails (string, optional)
- priority (string, optional)
- status (string, optional)
- reportedDateTime (ISO date string, optional)

Example:
{
  "incidentDetails": "Updated incident description",
  "status": "In Progress"
}

Responses:
- 200 OK — body: { message: "Incident updated", incident }
  - `incident.reporterdetails` will be a plain string (reporter's name).
- 400 Bad Request — validation failed
- 401 Unauthorized — if the caller is not the owner or token invalid
- 404 Not Found — incident not found

### DELETE /incidents/deleteincidents/:id
Delete an incident (only owner can delete).

- Authentication: required
- URL parameter: `id` — the incident document id

Responses:
- 200 OK — body: { message: "Incident deleted", incident }
  - Returns the deleted incident (with `reporterdetails` as a name string) or a confirmation message depending on controller behavior.
- 401 Unauthorized — not owner or invalid token
- 404 Not Found — incident not found

### GET /incidents/allincident
Fetch all incidents (paginated support is not implemented in the code; this returns all documents).

- Authentication: required
- Response: 200 OK — body: { message: "All Incident fetch Successfully", incidents: [ ... ] }
  - Each incident in the `incidents` array has `reporterdetails` set to the reporter's name (controller sanitizes populated reporter data).

Notes
- The implementation stores the reporter as a reference (`reporterId`) and the controllers/services populate the related user to build a display name.
- If you want a different RESTful naming pattern, I can update routes to use standard REST paths (`POST /incidents`, `GET /incidents`, `PUT /incidents/:id`, `DELETE /incidents/:id`).

