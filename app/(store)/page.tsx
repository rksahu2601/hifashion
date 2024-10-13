// import { getUserSession } from "@/lib/getSession";
import Categories from "@/components/landing-page/Categories";
import Hero from "@/components/landing-page/Hero";
import NewArrival from "@/components/landing-page/NewArrival";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient() 
  const {data:categories} = await supabase.from("categories").select()

  return (
    <div className="">
      <Hero />
      <Categories categories={categories} />
      <NewArrival />
    </div>
  );
}
