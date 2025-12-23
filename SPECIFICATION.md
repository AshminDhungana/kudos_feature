# Kudos System Specification

## Functional Requirements

### User Stories

1.  **Give Kudos**: As a user, I can select a colleague from a searchable dropdown list, write a message of appreciation (max 280 characters), and submit it.
2.  **View Feed**: As a user, I can view a public feed of recent kudos on the main dashboard, displaying the message, sender, recipient, and timestamp.
3.  **Moderation**: As an administrator, I can view all kudos and hide or delete inappropriate messages to maintain a positive environment.
    -   *Edge Case Handling*: System should handle potential spam (rate limiting) and prevent duplicate active submissions.

### Acceptance Criteria

-   **Submission Form**:
    -   User dropdown lists all available employees.
    -   Message input limits text to 280 characters.
    -   Submit button is disabled if form is invalid.
    -   Success message shown upon successful submission.
    -   Basic rate limiting prevents spamming (e.g., max 1 kudos per minutue per user).
-   **Feed Display**:
    -   Shows most recent kudos first.
    -   Displays "From [Name]" and "To [Name]".
    -   Formats timestamp nicely (e.g., "2 hours ago").
    -   Only shows `is_visible=true` kudos to regular users.
-   **Moderation**:
    -   Admin view shows ALL kudos (including hidden).
    -   Toggle switch or button to flip `is_visible` status.
    -   Delete button to permanently remove entry.
    -   Administrator can mark items as "Spam".

## Technical Design

### Technology Stack
-   **Framework**: Next.js (React)
-   **Styling**: Vanilla CSS (Modern, Responsive, Variables for theming)
-   **Data Storage**: Local JSON file (simulating a database for this standalone feature).

### Data Models

**Kudos**
```json
{
  "id": "string (uuid)",
  "fromUserId": "string",
  "toUserId": "string",
  "message": "string",
  "timestamp": "string (ISO)",
  "isVisible": "boolean (default: true)",
  "moderatedBy": "string (userId, optional)",
  "moderatedAt": "string (ISO, optional)",
  "moderationReason": "string (optional)"
}
```

**User**
```json
{
  "id": "string",
  "name": "string",
  "avatarUrl": "string"
}
```

### API Endpoints

-   `GET /api/users`: Returns ID and Name of users.
-   `GET /api/kudos`: Returns list of kudos. Query param `admin=true` to see all.
-   `POST /api/kudos`: Create new kudos. Body: `{ fromUserId, toUserId, message }`.
-   `PATCH /api/kudos/[id]`: Update status (moderation). Body: `{ isVisible }`.

### Component Structure

-   `Header`: App title and simple nav.
-   `KudosInput`: Form for submission.
-   `KudosList`: Container for the feed.
-   `KudosCard`: Individual item.
-   `AdminToggle`: Simple mechanism to switch to "Admin View".

## Implementation Steps

1.  Initialize Next.js project.
2.  Create API routes and Data Service (JSON file handling).
3.  Implement global CSS variables for theming.
4.  Build `KudosInput` component.
5.  Build `KudosList` and `KudosCard`.
6.  Connect Components to API.
7.  Verify functionality and refine styles.
