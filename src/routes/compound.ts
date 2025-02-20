import { Hono } from "hono";
import { CompoundModel } from "../models/compound.js";

export const compoundRouter = new Hono();

compoundRouter.get("/", async (c) => {
  try {
    //Logik
    const compounds = await CompoundModel.findAll();
    return c.json({
      data: compounds,
    });
  } catch (error) {
    console.log(error);
    c.json({
      error: "Oh Snap! Something went wrong!",
    });
  }
});

compoundRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const compound = await CompoundModel.findByID(id);

  return c.json(
    {
      data: compound,
    },
    200
  );
});

compoundRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updateCompound = await CompoundModel.updateCompound(
      id,
      body
    );
    if (updateCompound) {
      return c.json(
        {
          message: "Compound updated",
          data: updateCompound,
        },
        200
      );
    } else {
      return c.text("Compound not found", 404);
    }
  } catch (error) {
    console.error("Error updating compound:", error);
    return c.text("Internal Server Error", 500);
  }
});

compoundRouter.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const createCompound = await CompoundModel.createCompound(body);
    return c.json(
      {
        message: "Newsletter created successfully",
        data: createCompound,
      },
      201
    );
  } catch (error) {
    console.error("Error creating Newsletter", error);
    return c.text("Internal Server Error", 500);
  }
});

compoundRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleteCompound = await CompoundModel.deleteCompoundByID(id);
  return c.json(
    {
      message: "Compound got deleted",
      data: deleteCompound,
    },
    200
  );
});
