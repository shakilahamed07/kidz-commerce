"use server"

import { collctions, connect } from "@/lib/connect"
import { ObjectId } from "mongodb"

export const GetProducts = async ()=>{
    const result = await connect(collctions.PRODUCTS).find().toArray()
    return result;
}

export const getSinglePoducts = async (id) => {
    const query = { _id: new ObjectId(id)}
    const product = await connect(collctions.PRODUCTS).findOne(query);
    
    return {...product, _id: product._id.toString()} || {};
}