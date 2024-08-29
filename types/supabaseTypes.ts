import { Database } from "./database.types";

export type TCategory = Database["public"]["Tables"]["categories"]["Row"]
export type TProducts = Database["public"]["Tables"]["products"]["Row"]
export type TProfile = Database["public"]["Tables"]["profiles"]["Row"]