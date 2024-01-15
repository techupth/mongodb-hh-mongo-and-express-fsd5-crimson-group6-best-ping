import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const allProducts = await collection.find({}).limit(10).toArray();
    return res.json({ data: allProducts });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    const productById = await collection.findOne({ _id: productId });
    return res.json({ data: productById });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productsData = { ...req.body, created_at: new Date() };
    const newProducts = await collection.insertOne(productsData);

    return res.json({
      message: `Create product (${newProducts.insertedId}) successfully`,
    });
  } catch (error) {
    return res.json({ message: `${error}` });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const newProductData = { ...req.body, modified_at: new Date() };
    const productId = new ObjectId(req.params.id);
    await collection.updateOne(
      {
        _id: productId,
      },
      { $set: newProductData }
    );
    return res.json({
      message: `Movie record ${productId} updated successfully`,
    });
  } catch (error) {
    return res.json({ message: `${error}` });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    await collection.deleteOne({ _id: productId });
    return res.json({
      message: `Delete moive record ${productId} successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default productRouter;
