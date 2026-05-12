export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          amenities: string | null
          awards: string | null
          booking_link: string | null
          brand_color: string | null
          brand_story: string | null
          category: string
          collection: string
          contact_person: string | null
          created_at: string
          cuisine_tags: string | null
          cuisine_type: string | null
          description: string
          dietary_accommodations: string | null
          dining_type: string | null
          email: string | null
          executive_role: string | null
          featured: boolean
          featured_in: string | null
          founder_bio: string | null
          founder_name: string | null
          hours: string | null
          id: string
          image_url: string
          instagram: string | null
          is_new: boolean
          is_spotlight: boolean
          keywords: string | null
          location: string
          logo_url: string | null
          phone: string | null
          press_coverage: string | null
          price_range: string | null
          rating: number | null
          response_time: string | null
          review_count: number | null
          signature_experience: string
          slug: string
          special_features: string | null
          tagline: string
          timezone: string | null
          title: string
          updated_at: string
          views: number
          website: string | null
          zone: string | null
        }
        Insert: {
          amenities?: string | null
          awards?: string | null
          booking_link?: string | null
          brand_color?: string | null
          brand_story?: string | null
          category: string
          collection: string
          contact_person?: string | null
          created_at?: string
          cuisine_tags?: string | null
          cuisine_type?: string | null
          description: string
          dietary_accommodations?: string | null
          dining_type?: string | null
          email?: string | null
          executive_role?: string | null
          featured?: boolean
          featured_in?: string | null
          founder_bio?: string | null
          founder_name?: string | null
          hours?: string | null
          id?: string
          image_url: string
          instagram?: string | null
          is_new?: boolean
          is_spotlight?: boolean
          keywords?: string | null
          location: string
          logo_url?: string | null
          phone?: string | null
          press_coverage?: string | null
          price_range?: string | null
          rating?: number | null
          response_time?: string | null
          review_count?: number | null
          signature_experience: string
          slug: string
          special_features?: string | null
          tagline: string
          timezone?: string | null
          title: string
          updated_at?: string
          views?: number
          website?: string | null
          zone?: string | null
        }
        Update: {
          amenities?: string | null
          awards?: string | null
          booking_link?: string | null
          brand_color?: string | null
          brand_story?: string | null
          category?: string
          collection?: string
          contact_person?: string | null
          created_at?: string
          cuisine_tags?: string | null
          cuisine_type?: string | null
          description?: string
          dietary_accommodations?: string | null
          dining_type?: string | null
          email?: string | null
          executive_role?: string | null
          featured?: boolean
          featured_in?: string | null
          founder_bio?: string | null
          founder_name?: string | null
          hours?: string | null
          id?: string
          image_url?: string
          instagram?: string | null
          is_new?: boolean
          is_spotlight?: boolean
          keywords?: string | null
          location?: string
          logo_url?: string | null
          phone?: string | null
          press_coverage?: string | null
          price_range?: string | null
          rating?: number | null
          response_time?: string | null
          review_count?: number | null
          signature_experience?: string
          slug?: string
          special_features?: string | null
          tagline?: string
          timezone?: string | null
          title?: string
          updated_at?: string
          views?: number
          website?: string | null
          zone?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
