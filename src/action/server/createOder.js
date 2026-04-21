"use server"

import { authOptions } from "@/lib/authOptions";
import { collctions, connect } from "@/lib/connect"
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { transporter } from "@/lib/mailTransporter";
import { generateInvoiceHTML } from "@/lib/generateInvoiceHTML";

const oderCollctions = connect(collctions.ODER);

export const createOder = async (payload)=>{
    const {user} = (await getServerSession(authOptions)) || {};
    if(!user) return false;

    const cart = await getCart();

    const oderData = {
        ...payload,
        totalPrice: payload.subtotal,
        items: cart,
        oderAt: new Date().toISOString(),
    }
    // console.log(oderData)

    const result = await oderCollctions.insertOne(oderData)

    if(Boolean(result.insertedId)){
        await clearCart()

        await transporter.sendMail({
                from: '"Kidz-Commerce" <shakil200607@gmail.com>',
                to: user.email, // client email
                subject: `Your order is comform (ID: ${result.insertedId})`,
                html: generateInvoiceHTML(oderData, user),
            });
    }
    
    return {success: Boolean(result.insertedId)}

}