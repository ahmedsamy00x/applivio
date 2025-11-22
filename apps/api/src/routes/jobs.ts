import { Hono } from "hono";
import { prisma } from "@applivio/db";
import { authMiddleware } from "../middleware/auth";

export const jobsRouter = new Hono();

// All routes require auth
jobsRouter.use("*", authMiddleware);

// Get all jobs for user
jobsRouter.get("/", async (c) => {
  const user = c.get("user");
  const jobs = await prisma.job.findMany({
    where: { userId: user.id },
    include: { events: true },
    orderBy: { createdAt: "desc" },
  });
  return c.json(jobs);
});

// Create job
jobsRouter.post("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();

  const job = await prisma.job.create({
    data: {
      userId: user.id,
      company: body.company,
      position: body.position,
      status: body.status || "APPLIED",
      notes: body.notes,
    },
  });

  return c.json(job, 201);
});

// Get single job
jobsRouter.get("/:id", async (c) => {
  const user = c.get("user");
  const job = await prisma.job.findFirst({
    where: {
      id: c.req.param("id"),
      userId: user.id,
    },
    include: { events: true },
  });

  if (!job) return c.json({ error: "Job not found" }, 404);
  return c.json(job);
});

// Update job
jobsRouter.patch("/:id", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();

  const job = await prisma.job.updateMany({
    where: {
      id: c.req.param("id"),
      userId: user.id,
    },
    data: body,
  });

  if (job.count === 0) return c.json({ error: "Job not found" }, 404);
  return c.json({ success: true });
});

// Delete job
jobsRouter.delete("/:id", async (c) => {
  const user = c.get("user");

  const job = await prisma.job.deleteMany({
    where: {
      id: c.req.param("id"),
      userId: user.id,
    },
  });

  if (job.count === 0) return c.json({ error: "Job not found" }, 404);
  return c.json({ success: true });
});
