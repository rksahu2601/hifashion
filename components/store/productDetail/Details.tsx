import { TProducts, TReviews } from "@/types/supabaseTypes";
import ProductDetails from "./ProductDetails";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Reviews from "./Reviews";

type PropType = {
  product: TProducts | null;
  reviews : TReviews[] | null;
  hasBoughtProduct: boolean | null;
};

export default function Details({ product, reviews, hasBoughtProduct }: PropType) {
  const TabOptions = [
    {
      tabValue: "productDetails",
      tabLabel: "Product Details",
      tabContent: <ProductDetails product={product} reviews={reviews} />,
    },
    {
      tabValue: "productReviews",
      tabLabel: "Reviews",
      tabContent: <Reviews hasBoughtProduct={hasBoughtProduct} productId={product?.id!} reviews={reviews} />,
    },
  ];

  return (
    <Tabs defaultValue="productDetails" className="w-full">
      <TabsList>
        {TabOptions.map((option) => (
          <TabsTrigger key={option.tabValue} value={option.tabValue}>
            {option.tabLabel}
          </TabsTrigger>
        ))}
      </TabsList>
      {TabOptions.map((option, i) => (
        <TabsContent key={option.tabValue} value={option.tabValue}>
          {option.tabContent}
        </TabsContent>
      ))}
    </Tabs>
  );
}
