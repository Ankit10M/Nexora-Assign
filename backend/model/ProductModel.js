import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    image: {
    type: String,
    default: "https://via.placeholder.com/150"
  }
},{
    timestamps: true
})
const Product = mongoose.model('Product',ProductSchema)
export default Product;