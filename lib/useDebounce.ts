"use client"

import { useEffect, useState } from "react";
import { z } from "zod";

const valueSchema = z.coerce.string();
type valueType = z.infer<typeof valueSchema>

export const useDebounce = (value:valueType) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value)
        }, 1000)
        
        return () =>{
            clearTimeout(timer)
        } 
    }, [value])

    return debouncedValue;
}
