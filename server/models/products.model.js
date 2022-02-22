import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Price: {type: Number, required:true},
    Owner: {type:String, required: true},
    Photo: {type: String, required: true},
    Description: {type: String, required: true}
});

export default mongoose.models.Products || mongoose.model('Products', productsSchema);