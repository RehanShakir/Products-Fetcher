import pkg from "mongoose";
const { model, Schema } = pkg;

const productModel = new Schema(
  {
    fetch: { type: String },
    name: { type: String },
    sku: { type: String },
    id: { type: String },
    location: { type: String },
    quantity: { type: String },
    stockStatus: { type: String },
    image: { type: String },
    manudfacturerId: { type: String },
    shipping: { type: String },
    originalPrice: { type: String },
    salePrice: { type: String },
    taxClass: { type: String },
    weight: { type: String },
    weightClass: { type: String },
    specs: { type: String },
    priceWithTax: { min: { type: Number }, max: { type: Number } },
    category: { type: String },
    description: { type: String },
    variations: { type: String },
    attributes: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);

const Product = model("All", productModel);
export default Product;
