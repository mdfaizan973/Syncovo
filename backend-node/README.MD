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