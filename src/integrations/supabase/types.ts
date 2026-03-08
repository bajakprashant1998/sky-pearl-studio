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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ab_experiments: {
        Row: {
          created_at: string
          id: string
          name: string
          page: string
          status: string
          updated_at: string
          variant_a: Json
          variant_b: Json
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          page: string
          status?: string
          updated_at?: string
          variant_a?: Json
          variant_b?: Json
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          page?: string
          status?: string
          updated_at?: string
          variant_a?: Json
          variant_b?: Json
        }
        Relationships: []
      }
      ab_impressions: {
        Row: {
          converted: boolean
          created_at: string
          experiment_id: string
          id: string
          session_id: string | null
          variant: string
        }
        Insert: {
          converted?: boolean
          created_at?: string
          experiment_id: string
          id?: string
          session_id?: string | null
          variant: string
        }
        Update: {
          converted?: boolean
          created_at?: string
          experiment_id?: string
          id?: string
          session_id?: string | null
          variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_impressions_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "ab_experiments"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_activity_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          blog_post_id: string
          content: string
          created_at: string
          email: string
          id: string
          is_approved: boolean
          name: string
        }
        Insert: {
          blog_post_id: string
          content: string
          created_at?: string
          email: string
          id?: string
          is_approved?: boolean
          name: string
        }
        Update: {
          blog_post_id?: string
          content?: string
          created_at?: string
          email?: string
          id?: string
          is_approved?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          is_published: boolean
          meta_description: string
          published_at: string | null
          read_time: string
          slug: string
          tags: string[]
          title: string
          topic_hash: string | null
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          meta_description: string
          published_at?: string | null
          read_time?: string
          slug: string
          tags?: string[]
          title: string
          topic_hash?: string | null
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          meta_description?: string
          published_at?: string | null
          read_time?: string
          slug?: string
          tags?: string[]
          title?: string
          topic_hash?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: []
      }
      client_invoices: {
        Row: {
          amount: number
          created_at: string
          due_date: string | null
          id: string
          invoice_number: string
          paid_at: string | null
          project_id: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          paid_at?: string | null
          project_id: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          paid_at?: string | null
          project_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      client_projects: {
        Row: {
          client_email: string
          client_name: string
          created_at: string
          details: Json | null
          id: string
          progress: number
          project_name: string
          status: string
          updated_at: string
        }
        Insert: {
          client_email: string
          client_name: string
          created_at?: string
          details?: Json | null
          id?: string
          progress?: number
          project_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          client_email?: string
          client_name?: string
          created_at?: string
          details?: Json | null
          id?: string
          progress?: number
          project_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          budget: string | null
          business_name: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          score: number
          source: string
          status: string
          temperature: string
          updated_at: string
          website_type: string | null
        }
        Insert: {
          budget?: string | null
          business_name?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          score?: number
          source?: string
          status?: string
          temperature?: string
          updated_at?: string
          website_type?: string | null
        }
        Update: {
          budget?: string | null
          business_name?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          score?: number
          source?: string
          status?: string
          temperature?: string
          updated_at?: string
          website_type?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          source: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          source?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          page_path: string
          section_key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          page_path: string
          section_key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          page_path?: string
          section_key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      page_seo_settings: {
        Row: {
          canonical_url: string | null
          created_at: string
          id: string
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          og_type: string | null
          page_path: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          page_path: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          page_path?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          code: string
          created_at: string
          id: string
          referred_email: string | null
          referred_name: string | null
          referrer_email: string
          referrer_name: string
          reward: string | null
          status: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          referred_email?: string | null
          referred_name?: string | null
          referrer_email: string
          referrer_name: string
          reward?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          referred_email?: string | null
          referred_name?: string | null
          referrer_email?: string
          referrer_name?: string
          reward?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          color: string
          content: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          rating: number
          result: string
          role: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          color?: string
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          rating?: number
          result: string
          role: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          rating?: number
          result?: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      uptime_checks: {
        Row: {
          checked_at: string
          id: string
          is_up: boolean
          response_time: number | null
          status_code: number | null
          url: string
        }
        Insert: {
          checked_at?: string
          id?: string
          is_up?: boolean
          response_time?: number | null
          status_code?: number | null
          url: string
        }
        Update: {
          checked_at?: string
          id?: string
          is_up?: boolean
          response_time?: number | null
          status_code?: number | null
          url?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
      app_role: "admin" | "editor"
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
      app_role: ["admin", "editor"],
    },
  },
} as const
