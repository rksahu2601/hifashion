export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string | null
          name: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          categorySlug: string | null
          color: string | null
          created_at: string
          deliveryInfo: string | null
          description: string | null
          gender: string | null
          id: number
          images: string[]
          name: string | null
          price: string | null
          quantity: string | null
          sku: string | null
          variants: string[]
        }
        Insert: {
          category?: string | null
          categorySlug?: string | null
          color?: string | null
          created_at?: string
          deliveryInfo?: string | null
          description?: string | null
          gender?: string | null
          id?: number
          images?: string[]
          name?: string | null
          price?: string | null
          quantity?: string | null
          sku?: string | null
          variants?: string[]
        }
        Update: {
          category?: string | null
          categorySlug?: string | null
          color?: string | null
          created_at?: string
          deliveryInfo?: string | null
          description?: string | null
          gender?: string | null
          id?: number
          images?: string[]
          name?: string | null
          price?: string | null
          quantity?: string | null
          sku?: string | null
          variants?: string[]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          firstname: string | null
          full_name: string | null
          id: string
          lastname: string | null
          phone: string | null
          role: string
          updated_at: string | null
          username: string | null
          website: string | null
          zipcode: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          firstname?: string | null
          full_name?: string | null
          id: string
          lastname?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          firstname?: string | null
          full_name?: string | null
          id?: string
          lastname?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
