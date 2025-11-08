import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/ProductModel.js";
import { products } from "./data/products.js";
import {connectDB} from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();         // clears old data
    await Product.insertMany(products); // inserts mock data
    console.log("Mock products added");
    process.exit();
  } catch (error) {
    console.error(" Error seeding data:", error);
    process.exit(1);
  }
};

importData();
