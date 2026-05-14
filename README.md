

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/1c4bc41a-f97d-47e1-8729-f4821fb83f1b" />



# 🍔 Partner Channel Transformation Team API Demo

Welcome aboard, fellow API adventurer.

This project is a tiny but mighty Express.js API built to demonstrate:

- 🌐 What APIs are
- 🔐 How APIs are protected
- 🎟️ How JWT authentication works
- 📘 Swagger/OpenAPI documentation
- 🚀 How modern backend services communicate

All without needing a PhD in Computer Science or sacrificing a goat to the JavaScript gods.

---

# 🧠 So... What Exactly Is an API?

Imagine you're sitting in a restaurant.

You:
- do NOT walk into the kitchen,
- do NOT scream directly at the chef,
- do NOT season the pasta yourself.

Instead...

You talk to the waiter.

The waiter:
1. Takes your request
2. Carries it to the kitchen
3. Brings back your food

That waiter...

# 👉 IS THE API

```text
You (Client/App)
      ↓
   API (Waiter)
      ↓
Backend System (Kitchen)
```

The kitchen may be:
- databases
- payment systems
- customer records
- scary enterprise systems with names like `CORP-SME-PROD-V2-FINAL-FINAL`

But thankfully...
you only talk to the API waiter.

---

# 🍟 API Example In Human Language

You say:

> "Hi, I'd like one cheeseburger please."

In API language:

```http
GET /members
```

The API says:

```json
[
  {
    "id": "1",
    "name": "Bernice Martin"
  }
]
```

Boom.
Digital cheeseburger delivered.

---

# 🔐 Why Protect APIs?

Now imagine random people storming into the restaurant kitchen.

One guy:
- eating fries directly from fryer

Another:
- deleting ingredients

Another:
- yelling:
  > "I AM ADMIN NOW."

Absolute chaos.

So APIs need security.

---

# ✈️ JWT Authentication Explained Using Airport Security

JWT works a lot like airport boarding passes.

When you check in at the airport:

1. Airline verifies who you are
2. Airline creates boarding pass
3. Boarding pass contains:
   - your name
   - flight number
   - seat
   - timestamp
4. Airline stamps/signs it

Now airport security can trust it.

Why?

Because the signature proves:
- airline issued it
- nobody tampered with it

---

# 🎟️ JWT = Digital Boarding Pass

A JWT token contains:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
eyJhbGc...
eyJzdWI...
abc123signature
```

---

# 🧾 JWT Payload (Readable)

The payload may contain:

```json
{
  "sub": "admin",
  "role": "admin"
}
```

Fun fact:

# ⚠️ JWT payload is NOT encrypted

Anyone can read it.

Just like anyone can read:
- your boarding pass
- your seat number
- your gate number

BUT...

they cannot forge the airline signature.

---

# 🔏 The Signature Magic

The server uses a secret key:

```js
JWT_SECRET
```

to generate a cryptographic signature.

Think of it like:
- airline stamp
- wax seal
- Gandalf shouting:
  > "YOU SHALL NOT TAMPER."

If someone changes:

```json
{
  "role": "user"
}
```

to:

```json
{
  "role": "super-admin-emperor"
}
```

the signature breaks immediately.

Security says:

> "Nice try, buddy."

401 Unauthorized.

---

# 🧑‍💻 Project Features

This API demonstrates:

✅ Public endpoints  
✅ Protected endpoints  
✅ API Key authentication  
✅ JWT authentication  
✅ Swagger/OpenAPI docs  
✅ Express middleware  
✅ Route protection  
✅ JSON APIs  

---

# 🚀 Run The Project

## Install dependencies

```bash
npm install
```

---

## Start server

```bash
npm start
```

Server runs on:

```text
http://localhost:8080
```

---

# 📘 Swagger Documentation

Open:

```text
http://localhost:8080/api-docs
```

Swagger UI allows you to:
- test APIs
- generate JWT tokens
- authorize requests
- try protected endpoints

without writing code.

A magical playground for curious humans.

---

# 🔑 How To Login And Get JWT Token

Open Swagger UI.

Go to:

```text
POST /auth/login
```

Click:
- Try it out

Use:

```json
{
  "username": "admin",
  "password": "password123"
}
```

Execute.

You receive:

```json
{
  "token": "eyJhbGc..."
}
```

---

# 🔓 How To Use JWT Token

1. Click **Authorize** in Swagger
2. Paste:

```text
Bearer YOUR_TOKEN_HERE
```

3. Click Authorize

Now protected endpoints work.

You are now officially an enterprise-grade internet wizard.

---

# 🛡️ Protected Endpoints

These require:
- API Key
OR
- JWT token

Endpoints:

```http
GET /members
POST /members
GET /members/:id
```

---

# 😂 Final Thoughts

APIs are basically:
- restaurant waiters,
- airport security staff,
- and extremely fast messengers

all combined together.

And JWT?

JWT is just a digitally signed boarding pass saying:

> "Yep. This human is allowed through."

---

# 🙌 Happy Learning
