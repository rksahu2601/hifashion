"use client"

import { Dispatch, SetStateAction, useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from '@/components/Button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import toast from 'react-hot-toast';

type TProps = {
  dateTime: Date | null;
  setDateTime: Dispatch<SetStateAction<Date | null>>;
  setProductStatus: Dispatch<SetStateAction<"active" | "draft" | "scheduled">>
}

export default function ProductSchedule({dateTime, setDateTime, setProductStatus}: TProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date)
  const handleSchedule = async () =>{
    console.log(selectedDate);
    if(!selectedDate) {
      toast.error("Select date and time")
      return
    }
    const isPast = selectedDate < new Date()
    if(isPast){
      toast.error("You know you can't select a date in the past right ? so stop playing. :)")
      return;
    }
    setDateTime(selectedDate)
    setProductStatus("scheduled")
  }

  return (

    <Dialog>
    <DialogTrigger className="mt-3" asChild>
    <Button
    type="button"
    label="Schedule"
    className="rounded px-3 py-2 mt-4 text-xs md:text-sm"
  />
    </DialogTrigger>
    <DialogContent className='h-fit'>
      <DialogHeader>
        <DialogTitle>Schedule this product</DialogTitle>
        <DialogDescription>
        Select the date and time you want your product to lauch.
        </DialogDescription>
      </DialogHeader>
      <div className=''>
      <DatePicker
      selected={selectedDate || new Date()}
      onChange={(date) => setSelectedDate(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />

    <Button
    className='mt-4'
    solid
    label='Schedule'
    type="submit"
    onClick={handleSchedule}
    />
      </div>
    </DialogContent>
  </Dialog>

  )
}
