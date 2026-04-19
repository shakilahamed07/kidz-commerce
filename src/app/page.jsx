import Beanar from "@/components/Home/Beanar";
import Products from "@/components/Home/Products";

export default function Home() {
  return (
    <div>
      <section>
        <Beanar />
      </section>
      
      <section>
        <Products />
      </section>
    </div>
  );
}
