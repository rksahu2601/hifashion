"use client";

import { setOrderAsCompleted } from "@/actions/orderActions";
import Button from "@/components/Button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SetOrderAsCompletedBtn({id}:{id:number}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSetASCompleted = (id: number) => {
    setIsLoading(true);
    setOrderAsCompleted(id)
      .then((res) => {
        if(!res.success){
            toast.error("Something went wrong")
        }
        toast.success("Order Completed.")
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        setIsLoading(false);
        console.log("[SET_ORDER_AS_COMPLETED_CLIENTSIDE]", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      onClick={() => handleSetASCompleted(id)}
      loading={isLoading}
      solid
      className="text-sm bg-secondary border-none"
      label="Set as completed"
    />
  );
}
