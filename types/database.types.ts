export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          image: string | null;
          name: string | null;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          slug?: string;
        };
        Relationships: [];
      };
      orderProduct: {
        Row: {
          buyerId: string | null;
          created_at: string;
          id: number;
          image: string | null;
          itemId: string;
          name: string | null;
          orderId: string;
          price: number | null;
          productId: number | null;
          quantity: number | null;
          status: string | null;
          variant: string | null;
        };
        Insert: {
          buyerId?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          itemId: string;
          name?: string | null;
          orderId?: string;
          price?: number | null;
          productId?: number | null;
          quantity?: number | null;
          status?: string | null;
          variant?: string | null;
        };
        Update: {
          buyerId?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          itemId?: string;
          name?: string | null;
          orderId?: string;
          price?: number | null;
          productId?: number | null;
          quantity?: number | null;
          status?: string | null;
          variant?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orderProduct_orderId_fkey";
            columns: ["orderId"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["orderId"];
          }
        ];
      };
      orders: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          email: string | null;
          firstname: string | null;
          id: number;
          lastname: string | null;
          noOfProducts: number | null;
          orderId: string;
          paymentIntentId: string | null;
          PaymentStatus: string;
          paymentType: string | null;
          phone: number | null;
          status: string;
          totalPrice: number | null;
          zipcode: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          firstname?: string | null;
          id?: number;
          lastname?: string | null;
          noOfProducts?: number | null;
          orderId: string;
          paymentIntentId?: string | null;
          PaymentStatus?: string;
          paymentType?: string | null;
          phone?: number | null;
          status?: string;
          totalPrice?: number | null;
          zipcode?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          firstname?: string | null;
          id?: number;
          lastname?: string | null;
          noOfProducts?: number | null;
          orderId?: string;
          paymentIntentId?: string | null;
          PaymentStatus?: string;
          paymentType?: string | null;
          phone?: number | null;
          status?: string;
          totalPrice?: number | null;
          zipcode?: string | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category: string | null;
          categorySlug: string;
          color: string | null;
          created_at: string;
          deliveryInfo: string | null;
          description: string | null;
          gender: string | null;
          id: number;
          images: string[];
          name: string | null;
          price: number | null;
          quantity: number | null;
          scheduleDate: string | null;
          sku: string | null;
          status: string | null;
          variants: string[];
        };
        Insert: {
          category?: string | null;
          categorySlug?: string;
          color?: string | null;
          created_at?: string;
          deliveryInfo?: string | null;
          description?: string | null;
          gender?: string | null;
          id?: number;
          images?: string[];
          name?: string | null;
          price?: number | null;
          quantity?: number | null;
          scheduleDate?: string | null;
          sku?: string | null;
          status?: string | null;
          variants?: string[];
        };
        Update: {
          category?: string | null;
          categorySlug?: string;
          color?: string | null;
          created_at?: string;
          deliveryInfo?: string | null;
          description?: string | null;
          gender?: string | null;
          id?: number;
          images?: string[];
          name?: string | null;
          price?: number | null;
          quantity?: number | null;
          scheduleDate?: string | null;
          sku?: string | null;
          status?: string | null;
          variants?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "products_categorySlug_fkey";
            columns: ["categorySlug"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["slug"];
          }
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          avatar_url: string | null;
          city: string | null;
          firstname: string | null;
          full_name: string | null;
          id: string;
          lastname: string | null;
          phone: number | null;
          role: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
          zipcode: string | null;
        };
        Insert: {
          address?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          firstname?: string | null;
          full_name?: string | null;
          id: string;
          lastname?: string | null;
          phone?: number | null;
          role?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
          zipcode?: string | null;
        };
        Update: {
          address?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          firstname?: string | null;
          full_name?: string | null;
          id?: string;
          lastname?: string | null;
          phone?: number | null;
          role?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
          zipcode?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      reviews: {
        Row: {
          comment: string | null;
          created_at: string;
          id: number;
          productId: number | null;
          rating: number | null;
          userImage: string | null;
          username: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          productId?: number | null;
          rating?: number | null;
          userImage?: string | null;
          username?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          productId?: number | null;
          rating?: number | null;
          userImage?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
