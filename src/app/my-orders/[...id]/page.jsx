import { getOderById } from "@/action/server/order";
import OrderTracking from "@/components/MyOders/OrderTracking";
import React from "react";

export default async function Page({ params }) {
  const { id } = await params;
  const order = await getOderById(id[0]);

  return (
    <div>
      <OrderTracking order={order} />
    </div>
  );
}
