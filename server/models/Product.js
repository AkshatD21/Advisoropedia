import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
})

const ProductModel = mongoose.model("Product", ProductSchema)

export { ProductModel as Product }