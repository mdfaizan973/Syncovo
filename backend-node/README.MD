# PERN Backend Development Instructions

Follow this EXACT backend architecture and naming convention.
Do NOT change folder names, naming patterns, or architecture.

---

# EXISTING BACKEND STRUCTURE

```txt
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.query.js
│   │   │
│   │   ├── users/
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   └── user.query.js
│   │   │
│   │   ├── organisations/
│   │   │   ├── organisation.routes.js
│   │   │   ├── organisation.controller.js
│   │   │   ├── organisation.service.js
│   │   │   └── organisation.query.js
│   │   │
│   │   └── tasks/
│   │       ├── task.routes.js
│   │       ├── task.controller.js
│   │       ├── task.service.js
│   │       └── task.query.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

# IMPORTANT RULES

* Use the SAME architecture only
* Use JavaScript only
* Use Express.js + PostgreSQL
* Use async/await
* Use ES Modules consistently
* Write human-like production-ready code
* Do NOT write pseudo code
* Mention FULL FILE PATH before every code block

---

# NEW MODULES TO CREATE

Create these modules inside:

```txt
/src/modules/
```

Modules:

```txt
workspaces/
tables/
forms/
rows/
members/
```

Each module MUST contain:

```txt
module.routes.js
module.controller.js
module.service.js
module.query.js
```

Example:

```txt
/src/modules/workspaces/
    workspace.routes.js
    workspace.controller.js
    workspace.service.js
    workspace.query.js
```

---

# FEATURES REQUIRED

## WORKSPACES

* Create workspace
* Update workspace
* Delete workspace
* Get single workspace
* Get all workspaces connected to logged-in user
* Workspace owner
* Editors
* Viewers
* assigned_users
* created_at
* updated_at

---

## MEMBERS

* Add member by email
* Remove member
* Change role
* Roles:

  * owner
  * editor
  * viewer

Rules:

* Editors can edit
* Viewers can only view

---

## TABLES

* Create dynamic table
* Update dynamic table
* Delete table
* Get tables by workspace
* Get single table
* Dynamic schema
* total_forms
* created_at
* updated_at

---

## FORMS

* Create form from table schema
* Update form
* Delete form
* Get forms by table
* Get single form
* assigned_users
* total_submissions
* created_at
* updated_at

---

## ROWS

* Create row
* Update row
* Delete row
* Get rows by table
* Get single row
* Dynamic row JSON storage using JSONB

---

# IMPORTANT BUSINESS LOGIC

If a table schema field is removed:

ONLY remove that key from row JSON data.

DO NOT delete rows.

Example:

Old schema:

```js
[
  { key: "name" },
  { key: "email" },
  { key: "age" }
]
```

Row:

```js
{
  name: "Faizan",
  email: "faizan@gmail.com",
  age: 22
}
```

Updated schema:

```js
[
  { key: "name" },
  { key: "email" }
]
```

Updated row data:

```js
{
  name: "Faizan",
  email: "faizan@gmail.com"
}
```

Implement this logic inside:

```txt
table.service.js
```

using PostgreSQL JSONB operations.

---

# DATABASE REQUIREMENTS

Provide FULL PostgreSQL schemas for:

* users
* workspaces
* workspace_members
* tables
* forms
* rows

Include:

* Foreign keys
* ON DELETE CASCADE
* created_at
* updated_at
* indexes
* JSONB columns

---

# API REQUIREMENTS

Provide complete:

* routes
* controllers
* services
* queries

for every module.

---

# ROUTE STYLE

Example:

```js
router.post("/", authMiddleware, createWorkspace);
router.get("/", authMiddleware, getUserWorkspaces);
router.get("/:workspaceId", authMiddleware, getWorkspace);
router.put("/:workspaceId", authMiddleware, updateWorkspace);
router.delete("/:workspaceId", authMiddleware, deleteWorkspace);
```

---

# CONTROLLER STYLE

Controllers should ONLY handle:

* req
* res
* status codes
* calling services

No DB logic inside controllers.

---

# SERVICE STYLE

Services should contain:

* business logic
* validations
* permissions
* schema cleanup logic
* dynamic field handling

---

# QUERY STYLE

Queries should contain ONLY SQL queries.

Example:

```js
export const createWorkspaceQuery = `
INSERT INTO workspaces (
    id,
    name,
    description,
    created_by
)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;
```

---

# AUTHORIZATION RULES

Users can ONLY access:

* workspaces they belong to
* tables inside assigned workspaces
* forms inside assigned tables

Editors:

* can create/update/delete

Viewers:

* can only read

---

# APP.JS INTEGRATION

Provide final:

```txt
/src/app.js
```

route integration.

Example:

```js
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/rows", rowRoutes);
app.use("/api/members", memberRoutes);
```

---

# RESPONSE FORMAT

For EVERY file:

1. Mention FULL FILE PATH
2. Then provide COMPLETE code

Example:

```txt
/src/modules/workspaces/workspace.routes.js
```

```js
// full code here
```

---

# ALSO PROVIDE

* REST API endpoint list
* Example payloads
* Example responses
* Recommended indexes
* PostgreSQL relationships
* Folder structure

---

# FRONTEND FLOW REFERENCE

Frontend uses:

* dynamic forms
* dynamic tables
* schema-based forms
* rows based on schema
* assigned users
* editors/viewers

Users only see data connected to them.

---

# CODE QUALITY

* Human-written style
* Clean code
* Reusable code
* Production-ready
* No placeholders
* No pseudo code
* No random architecture changes
* Keep naming consistent
