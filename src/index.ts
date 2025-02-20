import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { compoundRouter } from "./routes/compound.js";
import { cors } from "hono/cors";
import { animalRouter } from "./routes/animal.js";

const app = new Hono();

app.use(cors());

app.route("/compounds", compoundRouter);
app.route("/animals", animalRouter);

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(
      `Server is running on http://${info.address}:${info.port}`
    );
  }
);
