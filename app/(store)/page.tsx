// import { getUserSession } from "@/lib/getSession";
import Footer from "@/components/Footer";
import Categories from "@/components/landing-page/Categories";
import Hero from "@/components/landing-page/Hero";
import InfoCards from "@/components/landing-page/InfoCards";
import NewArrival from "@/components/landing-page/NewArrival";
import SummerSale from "@/components/landing-page/SummerSale";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient() 
  const {data:categories} = await supabase.from("categories").select()

  return (
    <div className="">
      <Hero />
      <Categories categories={categories} />
      <NewArrival />
      <InfoCards />
      <SummerSale />
      <Footer />
    </div>
  );
}
