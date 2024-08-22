import { create } from 'zustand'

export type Gender = "male" | "female" | "both"

type TState = {
    gender: Gender | null;
    color: string | null;
    // sort: string | null;
    category: string | null;
}

type TAction = {
setGender: (gen: Gender | null)=>void
setColor: (col: string | null)=>void
setCategory: (cat: string | null)=>void
}

export const useSortStore = create<TState & TAction>()((set)=>({
    gender: null,
    color: null,
    category: null,

    setGender: (gen: Gender | null)=> set(state=>({gender: state.gender === gen ? null : gen})),
    setColor: (col: string | null)=> set(state=>({color: state.color === col ? null : col})),
    setCategory: (cat: string | null)=> set(state=>({category: state.category === cat ? null : cat})),
}))