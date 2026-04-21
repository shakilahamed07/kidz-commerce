"use server";

import { authOptions } from "@/lib/authOptions";
import { collctions, connect } from "@/lib/connect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const cartCollctions = connect(collctions.CART);

export const handelAction = async ({ product, inc }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  // get item--> user.email & product._id
  const query = { email: user?.email, productId: product?._id };
  const isAdded = await cartCollctions.findOne(query);

  //if exist : update
  if (isAdded) {
    const updateData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };
    const result = await cartCollctions.updateOne(query, updateData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    //Not exist : insart cart
    const cartData = {
      productId: product._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      price: product.price - (product.price * product.discount) / 100,
      username: user?.name,
      image: product.image,
    };

    const result = await cartCollctions.insertOne(cartData);
    return { success: result.acknowledged };
  }
};

export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];

  const query = { email: user.email };

  const result = await cartCollctions.find(query).toArray();

  return result;
});

export const cartDeleteItem = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return false;

  if (!id.length == 24) {
    return { success: false };
  }

  const query = { _id: new ObjectId(id) };

  const result = await cartCollctions.deleteOne(query);

  // if(result.deletedCount){
  //   revalidatePath('/cart')
  // }

  return { success: Boolean(result.deletedCount) };
};

export const increaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return false;

  if (quantity >= 10) {
    return { success: false , message: "you can't bay 10 product as a time"};
  }

  const query = { _id: new ObjectId(id) };

  const updateData = {
      $inc: {
        quantity: 1,
      },
  }

  const result = await cartCollctions.updateOne(query, updateData)
  return {success: Boolean(result.modifiedCount)};
};

export const dicreaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return false;

  if (quantity <= 1) {
    return { success: false , message: "you can't bay 10 product as a time"};
  }

  const query = { _id: new ObjectId(id) };

  const updateData = {
      $inc: {
        quantity: -1,
      },
  }

  const result = await cartCollctions.updateOne(query, updateData)
  return {success: Boolean(result.modifiedCount)};
};

export const clearCart = async ()=> {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return false;

  const query = { email: user.email };

  const result = await cartCollctions.deleteMany(query);
  return {success: result.deletedCount}
}
