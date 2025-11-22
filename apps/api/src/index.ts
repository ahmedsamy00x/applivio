import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "@applivio/auth";
import { jobsRouter } from "./routes/jobs";
import { aiRouter } from "./routes/ai";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: process.env.WEB_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Health check
app.get("/", (c) => c.json({ message: "Applivio API" }));

// Better Auth routes - handle all auth endpoints
app.all("/api/auth/*", async (c) => {
  return auth.handler(c.req.raw);
});

// API routes
app.route("/api/jobs", jobsRouter);
app.route("/api/ai", aiRouter);

const port = Number(process.env.PORT) || 4000;

// Start server with Hono's Node.js adapter
import { serve } from "@hono/node-server";

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Hono API running on http://localhost:${port}`);
