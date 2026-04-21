import { getCart } from "@/action/server/cart";
import Cart from "@/components/ShoppingCart/Cart";

export default async function CartPage() {
  
  const cartItems = await getCart();
  const formetedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div className="bg-base-200 min-h-screen py-10">
      <Cart cartItems={formetedItems}></Cart>
    </div>
  );
}
