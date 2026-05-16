const express = require("express");
const cors = require("cors");
const { runMagnific } = require("./automation");

const app = express();

app.use(cors());
app.use(express.json());

/*
 Root endpoint
*/
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    name: "Magnific Connector",
  });
});

/*
 Plugin manifest
*/
app.get("/.well-known/ai-plugin.json", (req, res) => {
  res.json({
    schema_version: "v1",
    name_for_human: "Magnific Connector",
    name_for_model: "magnific_connector",
    description_for_human: "Magnific integration",
    description_for_model: "Magnific image enhancement connector",
    auth: {
      type: "none",
    },
    api: {
      type: "openapi",
      url: `${req.protocol}://${req.get("host")}/openapi.json`,
    },
    logo_url: "https://magnific.ai/favicon.ico",
    contact_email: "support@example.com",
    legal_info_url: "https://magnific.ai",
  });
});

/*
 OpenAPI schema
*/
app.get("/openapi.json", (req, res) => {
  res.json({
    openapi: "3.0.1",
    info: {
      title: "Magnific Connector",
      version: "1.0",
    },
    paths: {
      "/magnific": {
        post: {
          operationId: "magnificPrompt",
          summary: "Send prompt",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    prompt: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
            },
          },
        },
      },
    },
  });
});

/*
 Main endpoint
*/
app.post("/magnific", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await runMagnific(prompt);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.get("/test", async (req, res) => {
  try {
    const result = await runMagnific("test prompt");

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
