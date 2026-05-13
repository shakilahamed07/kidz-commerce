"use server"

import { authOptions } from "@/lib/authOptions";
import { collctions, connect } from "@/lib/connect"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const addProduct = cache(async (productData) => {
    const user = (await getServerSession(authOptions)) || {};
      if (user?.role !== "admin") {
         return { success: false, message: "Unauthorized Access" };
      }
      
    const result = await connect(collctions.PRODUCTS).insertOne(productData);
    return { success: result.acknowledged, productId: result.insertedId.toString() };
});

export const GetProducts = cache(async () => {
    const result = await connect(collctions.PRODUCTS).find().toArray();
    return result;
});

export const getSinglePoducts = async (id) => {
    const query = { _id: new ObjectId(id)}
    const product = await connect(collctions.PRODUCTS).findOne(query);
    
    return {...product, _id: product._id.toString()} || {};
}

export const deleteProductAdmin = async (id) => {
    const user = (await getServerSession(authOptions)) || {};
      if (user?.role !== "admin") {
         return { success: false, message: "Unauthorized Access" };
      }

    const query = { _id: new ObjectId(id)}
    const result = await connect(collctions.PRODUCTS).deleteOne(query);
    revalidatePath("/dashboard/update-product");
    return { success: result.deletedCount > 0 };
}

export const updateProductAdmin = async (id, productData) => {
    const user = (await getServerSession(authOptions)) || {};
      if (user?.role !== "admin") {
         return { success: false, message: "Unauthorized Access" };
      }

    const query = { _id: new ObjectId(id)}
    const result = await connect(collctions.PRODUCTS).updateOne(query, { $set: productData });
    return { success: result.modifiedCount > 0 };
}