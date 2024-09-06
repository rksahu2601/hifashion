

import { TProducts } from "@/types/supabaseTypes"
import ProductDetails from "./ProductDetails";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Reviews from "./Reviews";

type PropType = {
    product: TProducts | null;
}



export default function Details({product}:PropType) {
  const TabOptions = [
    {
      tabValue: "productDetails",
      tabLabel: "Product Details",
      tabContent: <ProductDetails product={product} />
    },
    {
      tabValue: "productReviews",
      tabLabel: "Reviews",
      tabContent: <Reviews />
    },
  ]

  return (
    <Tabs defaultValue="productDetails" className="w-full">
  <TabsList>
    {TabOptions.map((option)=>(
      <TabsTrigger key={option.tabValue} value={option.tabValue}>{option.tabLabel}</TabsTrigger>
    ))}

  </TabsList>
  {TabOptions.map((option, i)=>(
    <TabsContent key={option.tabValue} value={option.tabValue}>{option.tabContent}</TabsContent>
    ))}
  
</Tabs>
  )
}
