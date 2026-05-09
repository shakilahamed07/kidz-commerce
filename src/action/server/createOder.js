"use server";

import { authOptions } from "@/lib/authOptions";
import { collctions, connect } from "@/lib/connect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { transporter } from "@/lib/mailTransporter";
import { generateInvoiceHTML } from "@/lib/generateInvoiceHTML";
import { ObjectId } from "mongodb";

const oderCollctions = connect(collctions.ODER);
const productCollections = connect(collctions.PRODUCTS);

export const createOder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return false;

  const cart = await getCart();

  const oderData = {
    ...payload,
    totalPrice: payload.subtotal,
    items: cart,
    oderAt: new Date().toISOString(),
  };
  // console.log(oderData)


  const result = await oderCollctions.insertOne(oderData);

  if (Boolean(result.insertedId)) {
    for (const item of cart) {
      await productCollections.updateOne(
        { _id: new ObjectId(item.productId) },
        {
          $inc: {
            sold: -item.quantity, // stock update
          },
        },
      );
    }

    await clearCart();

    await transporter.sendMail({
      from: '"Kidz-Commerce" <shakil200607@gmail.com>',
      to: user.email, // client email
      subject: `Your order is comform (ID: ${result.insertedId})`,
      html: generateInvoiceHTML(oderData, user),
    });
  }

  return { success: Boolean(result.insertedId) };
};

// get orders by user email
export const getOrader = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];

  const query = { customerEmail: user.email };

  const result = await oderCollctions
    .find(query)
    .sort({ oderAt: -1 })
    .toArray();
  return result;
};

export const getOderById = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return null;

  const query = { _id: new ObjectId(id), customerEmail: user.email };
  const result = await oderCollctions.findOne(query);
  return {
    ...result,
    _id: result._id.toString(),
    items: []
  };
};

export const getAllOrders = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user.role === "admin") return [];

  const result = await oderCollctions
    .find()
    .sort({ oderAt: -1 })
    .toArray();
  return result;
};

// for admin
export const getOderByIdAdmin = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user.role==="admin") return null;

  const query = { _id: new ObjectId(id)};
  const result = await oderCollctions.findOne(query);
  return {
    ...result,
    _id: result._id.toString(),
    items: result.items.map(item => {
      return {
        ...item,
        _id: item._id.toString()
      };
    })
  };
};

