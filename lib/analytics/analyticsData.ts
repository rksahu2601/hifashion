"use server"

import { createClient } from "../supabase/server";

const supabase = createClient();

const currYear = new Date().getFullYear();
const currMonth = new Date().getMonth();
const currDay = new Date().getDate();

type tableType  =
    | "categories"
    | "orderProduct"
    | "orders"
    | "products"
    | "profiles"
    | "reviews";

const getDayOfWeek = (day: number, month: number, year: number): string => {
      // Create a Date object from the provided day, month, and year
      const date = new Date(year, month, day); // remember month is 0-indexed
      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
  }

export const getDataThisWeek = async ( table: tableType) => {
    let dataArr = [];

  for (let i = 0; i < 7; i++) {
    const {data} = await supabase
      .from(table)
      .select("*")
      .gte(
        "created_at",
        new Date(currYear, currMonth, currDay - i).toISOString()
      )
      .lt(
        "created_at",
        new Date(currYear, currMonth, currDay - i + 1).toISOString()
      );

    // console.log(`${table} Day - ${currDay - i}`, orders.data?.length);
    if (data) {
        dataArr.push({
        dataPerDay: data,
      });
    }
  }

  return dataArr
};

export const getTotalToday = async (table: tableType)=>{
  const {data, error} = await supabase
  .from(table)
  .select('*')
  .gte('created_at', new Date(currYear, currMonth, currDay).toISOString())
  .lt('created_at', new Date(currYear, currMonth, currDay + 1).toISOString());

  if (error) return 0

  return data?.length;
}

export const getRevenueThisWeek = async () => {
    let dataArr = [];

  for (let i = 0; i < 7; i++) {
    const {data} = await supabase
      .from("orders")
      .select("*")
      .gte(
        "created_at",
        new Date(currYear, currMonth, currDay - i).toISOString()
      )
      .lt(
        "created_at",
        new Date(currYear, currMonth, currDay - i + 1).toISOString()
      ).eq("status", "completed")

    const dayOfWeek = getDayOfWeek(currDay+i, currMonth, currYear)
    if (data) {
        dataArr.push({
          [`${dayOfWeek}`]: data,
      });
    }
  }

  return dataArr
};

export const getRevenueToday = async ()=>{
  const {data, error} = await supabase
  .from("orders")
  .select('*')
  .gte('created_at', new Date(currYear, currMonth, currDay).toISOString())
  .lt('created_at', new Date(currYear, currMonth, currDay + 1).toISOString())
  .eq("status", "completed")

  if (error) return 0

  return data?.reduce((acc, curr)=>{
      return acc + curr.totalPrice!
  }, 0);
}

