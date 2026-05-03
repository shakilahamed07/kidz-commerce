import Beanar from "@/components/Home/Beanar";
import Products from "@/components/Home/Products";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <section>
        <Beanar />
      </section>

      <section className="md:pt-20 pt-10">
        <Products />
      </section>

      <section>
        <WhyChooseUs/>
      </section>
    </div>
  );
}
