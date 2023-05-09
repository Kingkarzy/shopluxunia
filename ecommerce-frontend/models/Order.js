import mongoose, {model, Schema, models} from "mongoose";

const OrderSchema = new Schema({
    list_items:Object,
    name: {type:String, required:true},
    email: {type:String, required:true},
    phone:{type: Number, required:true},
    city: {type: String, required: true}, 
    postalCode: {type: String}, 
    streetAddress: {type: String, required: true}, 
    country: {type: String}, 
    paid:Boolean
},{
    timestamps: true,
  });

export const Order = models?.Order || model('Order', OrderSchema);

