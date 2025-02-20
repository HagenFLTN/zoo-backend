import { Hono } from "hono";
import { AnimalModel } from "../models/animal.js";
import { Tier_Schema } from "../types.js";

export const animalRouter = new Hono();

animalRouter.get("/", async (c) => {
  try {
    //Logik
    const animals = await AnimalModel.findAll();
    return c.json(
      {
        data: animals,
      },
      200
    );
  } catch (error) {
    //Error handling
    console.log(error);
    c.json(
      {
        error: "Something went wrong.",
      },
      404
    );
  }
});

animalRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const result = Tier_Schema.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          error: result.error,
        },
        400
      );
    }

    const addAnimal = await AnimalModel.createAnimal(body);
    if (addAnimal) {
      return c.json(
        { message: "Animal created succesfully", data: addAnimal },
        200
      );
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return c.json({
        error: "No JSON body provided",
      });
    }
    console.error("Error create new Animal:", error);
    return c.text("Internal Server Error", 500);
  }
});
