"use client"

import { motion } from "framer-motion";
import { Container, ThumbsUp, Undo2, WalletCards } from "lucide-react";

const InfoCardsArr = [
  {
    label: "Free Shipping",
    subLabel: "On all products over $59.00",
    icon: <Container strokeWidth={"1.5px"} />
  },
  {
    label: "30 days returns",
    subLabel: "Money back guaranteed",
    icon: <Undo2 strokeWidth={"1.5px"} />
  },
  {
    label: "Secure payment",
    subLabel: "Secure online payment",
    icon: <WalletCards strokeWidth={"1.5px"} />
  },
  {
    label: "Custormer support",
    subLabel: "Available 24/7",
    icon: <ThumbsUp strokeWidth={"1.5px"} />
  },
]

export default function InfoCards() {
  return (
    <section className="contain grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {
        InfoCardsArr.map((info, i)=>(
          <motion.div initial={{y: 20, opacity: 0}} whileInView={{y:0, opacity: 1}} transition={{delay: i*0.2}} viewport={{margin: "-50px"}} key={info.label} className="flex gap-3 items-center">
            <span className="w-16 aspect-square rounded-md bg-gray-100 flex items-center justify-center">{info.icon}</span>
            <div>
              <h3 className="font-semibold">{info.label}</h3>
              <p className="opacity-80 text-sm">{info.subLabel}</p>
            </div>
          </motion.div>
        ))
      }
    </section>
  )
}
