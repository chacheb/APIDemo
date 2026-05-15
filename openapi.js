const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Partner Channel Transformation Team API",
    version: "1.0.0",
    description:
      "A demo API showing API key auth and JWT auth."
  },

  servers: [
    {
      url: "/",
      description: "Current host"
    }
  ],

  tags: [
    {
      name: "Public",
      description: "Public endpoints"
    },
    {
      name: "Auth",
      description: "Authentication endpoints"
    },
    {
      name: "Members",
      description: "Protected member endpoints"
    }
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
            description: "API running"
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
        summary: "Login and receive JWT token",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                type: "object",

                required: ["username", "password"],

                properties: {
                  username: {
                    type: "string",
                    example: "admin"
                  },

                  password: {
                    type: "string",
                    example: "password123"
                  }
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
          200: {
            description: "List of members"
          },

          401: {
            description: "Unauthorized"
          }
        }
      }
    }
  }
};

module.exports = openApiSpec;
