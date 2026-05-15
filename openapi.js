const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Partner Channel Transformation Team API",
    version: "1.0.0",
    description:
      "A demo API showing API key auth and JWT auth for workshop participants."
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Local CodeSandbox server"
    }
  ],
  tags: [
    { name: "Public", description: "No authentication required" },
    { name: "Auth", description: "JWT login endpoint" },
    { name: "Members", description: "Protected member endpoints" }
  ],
  components: {
    securitySchemes: {
      apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-api-key"
      },
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/": {
      get: {
        tags: ["Public"],
        summary: "Health check",
        responses: {
          200: {
            description: "API is running"
          }
        }
      }
    },
    "/partner-transformation-team": {
      get: {
        tags: ["Public"],
        summary: "Get team information",
        responses: {
          200: {
            description: "Team details"
          }
        }
      }
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and receive a JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["username", "password"],
                properties: {
                  username: { type: "string", example: "admin" },
                  password: { type: "string", example: "password123" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "JWT token returned"
          },
          401: {
            description: "Invalid credentials"
          }
        }
      }
    },
    "/members": {
      get: {
        tags: ["Members"],
        summary: "Get all members",
        security: [
          { apiKeyAuth: [] },
          { bearerAuth: [] }
        ],
        responses: {
          200: { description: "List of members" },
          401: { description: "Unauthorized" }
        }
      },
      post: {
        tags: ["Members"],
        summary: "Add a new member",
        security: [
          { apiKeyAuth: [] },
          { bearerAuth: [] }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "role", "email"],
                properties: {
                  name: { type: "string", example: "Sam Wilson" },
                  role: { type: "string", example: "Partner Success Manager" },
                  email: { type: "string", example: "sam@example.com" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Member created" },
          400: { description: "Missing fields" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/members/{id}": {
      get: {
        tags: ["Members"],
        summary: "Get a member by ID",
        security: [
          { apiKeyAuth: [] },
          { bearerAuth: [] }
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "1"
          }
        ],
        responses: {
          200: { description: "Member found" },
          404: { description: "Member not found" },
          401: { description: "Unauthorized" }
        }
      }
    }
  }
};

module.exports = openApiSpec;
