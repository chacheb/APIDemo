const express = require("express");
const cors = require('cors'); // 1. Import the package
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const openApiSpec = require("./openapi");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0";
const JWT_SECRET = process.env.JWT_SECRET || "pct-team-jwt-secret-do-not-share";
const VALID_API_KEY = process.env.VALID_API_KEY || "pct-api-key-2024";

// In-memory demo data
const members = [
  { id: "1", name: "Bernice Martin", role: "Business Strategy Manager", email: "bernice.martin@pct.example.com", joinedAt: "2022-01-15T00:00:00.000Z" },
  { id: "2", name: "Mark Jenkins", role: "Project Specialist", email: "mark.jenkins@pct.example.com", joinedAt: "2022-03-10T00:00:00.000Z" },
  { id: "3", name: "Julian Wong", role: "Product Owner", email: "julian.wong@pct.example.com", joinedAt: "2022-06-01T00:00:00.000Z" },
  { id: "4", name: "Veronica S", role: "Senior BA", email: "veronica.s@pct.example.com", joinedAt: "2022-08-15T00:00:00.000Z" },
  { id: "5", name: "Jessie Shen", role: "Project Specialist", email: "jessie.shen@pct.example.com", joinedAt: "2022-11-01T00:00:00.000Z" },
  { id: "6", name: "Rama R", role: "Architect", email: "rama.r@pct.example.com", joinedAt: "2023-01-20T00:00:00.000Z" },
  { id: "7", name: "Chetan C", role: "Architect", email: "chetan.c@pct.example.com", joinedAt: "2023-02-14T00:00:00.000Z" },
  { id: "8", name: "Becky G", role: "Project Manager", email: "becky.g@pct.example.com", joinedAt: "2023-04-03T00:00:00.000Z" },
  { id: "9", name: "Jeremy Fullerton", role: "Strategy Specialist", email: "jeremy.fullerton@pct.example.com", joinedAt: "2023-07-10T00:00:00.000Z" }
];

let nextId = 10;

function requireAuth(req, res, next) {
  const apiKey = req.header("x-api-key");
  if (apiKey === VALID_API_KEY) return next();

  const authHeader = req.header("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      jwt.verify(token, JWT_SECRET);
      return next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired JWT token." });
    }
  }

  return res.status(401).json({
    error: "Unauthorized. Provide an x-api-key header or a Bearer JWT token.",
    hint: 'Try: POST /auth/login with {"username":"admin","password":"password123"}'
  });
}

// OpenAPI / Swagger spec

// Swagger UI
app.get("/openapi.json", (req, res) => {
  res.json(openApiSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Root route so CodeSandbox does not show "Cannot GET /"
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Partner Channel Transformation Team API is running.",
    swagger: `/api-docs`,
    openapi: `/openapi.json`,
    routes: [
      "GET /partner-transformation-team",
      "POST /auth/login",
      "GET /members",
      "POST /members",
      "GET /members/:id"
    ]
  });
});

// Public route
app.get("/partner-transformation-team", (req, res) => {
  res.json({
    name: "Partner Channel Transformation Team",
    description:
      "The Partner Channel Transformation Team (PCT) is dedicated to driving strategic " +
      "transformation across partner and channel ecosystems. The team works closely with " +
      "internal stakeholders and external partners to redesign processes, modernize platforms, " +
      "and deliver scalable solutions that accelerate partner-led growth. From strategy and " +
      "architecture to delivery and governance, PCT brings together diverse expertise to lead " +
      "change and create lasting impact across the organisation."
  });
});

// Public login route
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username === "admin" && password === "password123") {
    const token = jwt.sign(
      { sub: username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      message: "Login successful! Use this token in: Authorization: Bearer <token>",
      tip: "The token expires in 1 hour. After that, log in again."
    });
  }

  return res.status(401).json({
    error: "Invalid credentials.",
    hint: "Try username: 'admin' and password: 'password123'"
  });
});

// Protected routes
app.get("/members", requireAuth, (req, res) => {
  res.json(members);
});

app.post("/members", requireAuth, (req, res) => {
  const { name, role, email } = req.body || {};

  if (!name || !role || !email) {
    return res.status(400).json({
      error: "Missing required fields: name, role, and email are all required."
    });
  }

  const newMember = {
    id: String(nextId++),
    name,
    role,
    email,
    joinedAt: new Date().toISOString()
  };

  members.push(newMember);
  return res.status(201).json(newMember);
});

app.get("/members/:id", requireAuth, (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === id);

  if (!member) {
    return res.status(404).json({ error: `No member found with id: ${id}` });
  }

  return res.json(member);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, HOST, () => {
  const baseUrl = `http://localhost:${PORT}`;

  console.log("=====================================================");
  console.log("  Partner Channel Transformation Team API");
  console.log("=====================================================");
  console.log(`  Server running at: ${baseUrl}`);
  console.log(`  Swagger UI: ${baseUrl}/api-docs`);
  console.log(`  OpenAPI JSON: ${baseUrl}/openapi.json`);
  console.log("");
  console.log("  QUICK TEST COMMANDS:");
  console.log("");
  console.log("  1. About the team (no auth needed):");
  console.log(`     curl ${baseUrl}/partner-transformation-team`);
  console.log("");
  console.log("  2. Get a JWT token:");
  console.log(`     curl -X POST ${baseUrl}/auth/login \\`);
  console.log('          -H "Content-Type: application/json" \\');
  console.log('          -d \'{"username":"admin","password":"password123"}\'');
  console.log("");
  console.log("  3. List all members using API key:");
  console.log(`     curl -H "x-api-key: pct-api-key-2024" ${baseUrl}/members`);
  console.log("");
  console.log("  4. Add a new member:");
  console.log(`     curl -X POST ${baseUrl}/members \\`);
  console.log('          -H "x-api-key: pct-api-key-2024" \\');
  console.log('          -H "Content-Type: application/json" \\');
  console.log('          -d \'{"name":"Sam Wilson","role":"Partner Success Manager","email":"sam@example.com"}\'');
  console.log("=====================================================");
});
