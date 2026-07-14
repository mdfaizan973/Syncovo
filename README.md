<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/35aa6869-f144-4953-8d65-5e648019199b" />


## Syncovo

Primary        → #f97316
Primary Hover  → #ea580c
Soft Orange    → #fff7ed

Main Text      → #0f172a
Secondary Text → #475569
Muted Text     → #94a3b8

Background     → #ffffff
Soft BG        → #f8fafc

Border         → #e2e8f0


## Core Backend
Python 3.12+
Flask
PostgreSQL
SQLAlchemy
Flask-JWT-Extended
Flask-Mail / Resend
Google OAuth
Alembic migrations
Redis (optional for OTP/session caching)


backend/
│
├── app/
│   ├── __init__.py
│   │
│   ├── config/
│   │   ├── config.py
│   │   └── database.py
│   │
│   ├── models/
│   │   ├── user_model.py
│   │   ├── workspace_model.py
│   │   └── otp_model.py
│   │
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── user_routes.py
│   │   └── workspace_routes.py
│   │
│   ├── services/
│   │   ├── otp_service.py
│   │   ├── mail_service.py
│   │   ├── jwt_service.py
│   │   └── google_auth_service.py
│   │
│   ├── middleware/
│   │   └── auth_middleware.py
│   │
│   ├── utils/
│   │   ├── helpers.py
│   │   └── validators.py
│   │
│   └── templates/
│
├── migrations/
│
├── requirements.txt
├── run.py
├── .env
└── README.md


pip install flask
pip install flask-cors
pip install flask-sqlalchemy
pip install psycopg2-binary
pip install flask-jwt-extended
pip install python-dotenv
pip install flask-bcrypt
pip install authlib
pip install flask-mail
pip install pyotp
pip install alembic
pip install flask-migrate



STEP 1 — Create Backend Folder

First create your project structure.

backend/
│
├── app/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   └── templates/
│
├── migrations/
│
├── run.py
├── requirements.txt
└── .env
STEP 2 — Create Virtual Environment

Inside backend folder:

python -m venv venv

Activate:

Windows
venv\Scripts\activate
Mac/Linux
source venv/bin/activate
STEP 3 — Install Packages

Now install backend libraries.

pip install flask
pip install flask-cors
pip install flask-sqlalchemy
pip install psycopg2-binary
pip install flask-jwt-extended
pip install python-dotenv
pip install flask-bcrypt
pip install authlib
pip install flask-mail
pip install pyotp
pip install alembic
pip install flask-migrate
STEP 4 — Freeze Requirements
pip freeze > requirements.txt

This stores all installed packages.

STEP 5 — Create .env

Now create environment variables.

Why?

Never hardcode secrets inside Python files.

Create:

backend/.env

Add:

SECRET_KEY=syncovo_secret

JWT_SECRET_KEY=syncovo_jwt_secret

DATABASE_URL=postgresql://postgres:password@localhost/syncovo

MAIL_USERNAME=yourmail@gmail.com
MAIL_PASSWORD=yourpassword

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

FRONTEND_URL=http://localhost:5173
STEP 6 — Create Flask Config

Now create:

app/config/config.py
Learn This

This file loads environment variables.

You will learn:

os module
dotenv
config classes

Write logic for:

SECRET_KEY
DATABASE_URL
JWT_SECRET_KEY
STEP 7 — Create Database Connection

Create:

app/config/database.py
Learn Here

You will learn:

SQLAlchemy object
How Flask connects with PostgreSQL

Goal:

Create one shared database instance:

db = SQLAlchemy()

This db will be imported everywhere.

STEP 8 — Create Flask App Factory

Now create:

app/__init__.py
Learn Here

You will learn:

Flask app creation
Registering extensions
Connecting database
JWT setup
CORS setup

Your goal:

Create:

create_app()

Inside it:

initialize Flask
load config
initialize db
initialize JWT
initialize bcrypt
enable CORS
STEP 9 — Create run.py

Now create root file:

run.py
Learn Here

You will learn:

Starting Flask server
Importing app factory

Goal:

app = create_app()

then run server.

STEP 10 — Run Backend

Now test.

python run.py

If setup correct:

Running on http://127.0.0.1:5000
STEP 11 — PostgreSQL Setup

Now create database.

Open PostgreSQL.

Create DB:

CREATE DATABASE syncovo;
STEP 12 — Create User Model

Now create:

app/models/user_model.py
Learn Here

You will learn:

Tables
Columns
Datatypes
Relationships
SQLAlchemy models

Your table contains:

id
name
email
password
avatar_url
bio
auth_provider
plan
is_verified
created_at
STEP 13 — Create OTP Model

Create:

app/models/otp_model.py
Learn Here

You will learn:

Temporary verification data
Expiry systems

Fields:

email
code
expires_at
STEP 14 — Initialize Migration System

Now connect Alembic.

flask db init

Then:

flask db migrate -m "initial tables"

Then:

flask db upgrade
Learn Here

You learn:

migrations
database versioning
automatic table creation
STEP 15 — Create Validation Utils

Create:

app/utils/validators.py
Learn Here

You will learn:

Email validation
Password validation
Reusable helper functions

Example validations:

valid email
password length
empty fields
STEP 16 — Create Password Hashing

Now create:

app/utils/helpers.py
Learn Here

You will learn:

hashing passwords
comparing passwords securely

Use:

bcrypt.generate_password_hash()

bcrypt.check_password_hash()
STEP 17 — Create JWT Service

Now create:

app/services/jwt_service.py
Learn Here

You learn:

access token creation
protected auth system

Goal:

Create:

generate_access_token()
STEP 18 — Create OTP Service

Create:

app/services/otp_service.py
Learn Here

You learn:

generating 6 digit OTP
expiration logic

Generate:

483920

randomly.

STEP 19 — Create Mail Service

Create:

app/services/mail_service.py
Learn Here

You learn:

sending emails
SMTP
Flask-Mail

First send simple email:

Your OTP is 483920
STEP 20 — Create Auth Routes

Now:

app/routes/auth_routes.py

THIS is where actual backend auth starts.

STEP 21 — Learn Signup Flow

Implement slowly:

Flow
Receive data
↓
Validate fields
↓
Check email exists
↓
Hash password
↓
Create OTP
↓
Save user
↓
Send OTP email
↓
Return success
STEP 22 — Learn OTP Verification Flow

Now build:

POST /verify-otp

Flow:

Get email + OTP
↓
Find OTP in DB
↓
Check expiry
↓
Mark user verified
↓
Generate JWT
↓
Return token
STEP 23 — Learn Login Flow

Now create:

POST /login

Flow:

Find user
↓
Compare password hash
↓
Check verified
↓
Generate JWT
↓
Return token
STEP 24 — Learn Protected Routes

Create:

user_routes.py

Add:

GET /me
Learn Here

You learn:

jwt_required
protected APIs
current user identity
STEP 25 — Google Authentication

LAST.

Do NOT start with Google auth.

First fully understand:

signup
login
OTP
JWT

Then Google auth becomes easy.

STEP 26 — Learn Google OAuth Flow

Create:

google_auth_service.py
Learn Here

You learn:

OAuth
Google token verification
social login

Flow:

Frontend Google Login
↓
Receive Google token
↓
Verify token in Flask
↓
Get user info
↓
Create user if not exists
↓
Generate JWT
STEP 27 — Middleware

Create:

middleware/auth_middleware.py

Later add:

role checking
workspace permission
admin routes
STEP 28 — After Authentication

Only AFTER auth complete:

Build:

workspace APIs
task APIs
real-time collaboration
notifications
activity logs
VERY IMPORTANT LEARNING TIP

Do NOT copy everything.

For every step:

Create file
Write 5-10 lines
Run server
Test API in Postman
Understand errors
Then continue

That is how real backend developers learn.

Recommended Learning Order
1. Flask Basics
2. Routing
3. PostgreSQL
4. SQLAlchemy
5. JWT
6. Password Hashing
7. OTP
8. Email Sending
9. Protected Routes
10. Google OAuth
11. Architecture
Recommended Tools
API Testing

Use:

Postman

Database Viewer

Use:

pgAdmin

or

DBeaver

Best Next Step For You

Start NOW with ONLY:

STEP 1 → STEP 10

Do not jump ahead.
