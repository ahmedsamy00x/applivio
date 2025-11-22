import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";

export const aiRouter = new Hono();

// All routes require auth
aiRouter.use("*", authMiddleware);

// Parse voice/text input to job data
aiRouter.post("/parse", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();

  // TODO: Implement OpenAI parsing
  // For now, return mock data
  return c.json({
    company: "Example Corp",
    position: "Software Engineer",
    status: "APPLIED",
    notes: body.input,
  });
});

// Get AI insights for a job
aiRouter.get("/insights/:jobId", async (c) => {
  const user = c.get("user");
  const jobId = c.req.param("jobId");

  // TODO: Implement AI insights
  return c.json({
    jobId,
    insights: ["Follow up in 1 week", "Company is actively hiring"],
  });
});
