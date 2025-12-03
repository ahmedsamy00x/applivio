import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { HonoEnv } from "../types";
import OpenAI from "openai";
import { JOB_PARSER_PROMPT } from "../lib";

export const aiRouter = new Hono<HonoEnv>();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// All routes require auth
aiRouter.use("*", authMiddleware);

// Parse voice/text input to job data
aiRouter.post("/parse", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const audio = body.file as File;

  const transcript = await openai.audio.transcriptions.create({
    file: audio,
    model: "whisper-1",
    response_format: "text",
  });

  const structured = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: JOB_PARSER_PROMPT,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
  });

  const messageContent = structured?.choices[0]?.message?.content;
  if (!messageContent) {
    return c.json({ error: "Failed to parse audio" }, 500);
  }

  const json = JSON.parse(messageContent);
  return c.json({ transcript, structured: json });
});

// Get AI insights for a job
aiRouter.get("/insights/:jobId", async (c) => {
  const user = c.get("user");
  const jobId = c.req.param("jobId");

  return c.json({
    jobId,
    insights: ["Follow up in 1 week", "Company is actively hiring"],
  });
});
