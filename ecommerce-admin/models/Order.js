import mongoose, {model, Schema, models} from "mongoose";

const OrderSchema = new Schema({
    list_items:Object,
    name: String,
    email:String,
    phone: Number,
    city: String,
    postalCode: String, 
    streetAddress:String, 
    country: String, 
    paid:Boolean
},{
    timestamps: true,
  });

export const Order = models?.Order || model('Order', OrderSchema);