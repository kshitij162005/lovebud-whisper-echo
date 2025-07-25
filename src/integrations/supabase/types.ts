export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_girlfriends: {
        Row: {
          age: number | null
          avatar_url: string | null
          behavior_settings: Json | null
          body_type: string | null
          clothing_style: string | null
          created_at: string | null
          ethnicity: string | null
          face_style: string | null
          generated_image_url: string | null
          hair_color: string | null
          hair_style: string | null
          id: string
          image_prompt: string | null
          is_active: boolean | null
          is_template: boolean | null
          name: string
          personality_traits: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          behavior_settings?: Json | null
          body_type?: string | null
          clothing_style?: string | null
          created_at?: string | null
          ethnicity?: string | null
          face_style?: string | null
          generated_image_url?: string | null
          hair_color?: string | null
          hair_style?: string | null
          id?: string
          image_prompt?: string | null
          is_active?: boolean | null
          is_template?: boolean | null
          name: string
          personality_traits?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          behavior_settings?: Json | null
          body_type?: string | null
          clothing_style?: string | null
          created_at?: string | null
          ethnicity?: string | null
          face_style?: string | null
          generated_image_url?: string | null
          hair_color?: string | null
          hair_style?: string | null
          id?: string
          image_prompt?: string | null
          is_active?: boolean | null
          is_template?: boolean | null
          name?: string
          personality_traits?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string | null
          girlfriend_id: string
          id: string
          last_message_at: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          girlfriend_id: string
          id?: string
          last_message_at?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          girlfriend_id?: string
          id?: string
          last_message_at?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_girlfriend_id_fkey"
            columns: ["girlfriend_id"]
            isOneToOne: false
            referencedRelation: "ai_girlfriends"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_rewards: {
        Row: {
          claim_date: string
          created_at: string | null
          id: string
          streak_day: number
          tokens_earned: number
          user_id: string
        }
        Insert: {
          claim_date: string
          created_at?: string | null
          id?: string
          streak_day: number
          tokens_earned: number
          user_id: string
        }
        Update: {
          claim_date?: string
          created_at?: string | null
          id?: string
          streak_day?: number
          tokens_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          message_type: string | null
          metadata: Json | null
          sender_type: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          sender_type: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string | null
          daily_streak: number | null
          email: string | null
          ethnicity: string | null
          height: string | null
          hobbies: string | null
          id: string
          last_daily_claim: string | null
          onboarding_completed: boolean | null
          past_relationships: string | null
          referral_code: string | null
          referred_by: string | null
          relationship_goals: string | null
          sexual_orientation: string | null
          subscription_tier: string | null
          tokens: number | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          daily_streak?: number | null
          email?: string | null
          ethnicity?: string | null
          height?: string | null
          hobbies?: string | null
          id?: string
          last_daily_claim?: string | null
          onboarding_completed?: boolean | null
          past_relationships?: string | null
          referral_code?: string | null
          referred_by?: string | null
          relationship_goals?: string | null
          sexual_orientation?: string | null
          subscription_tier?: string | null
          tokens?: number | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          daily_streak?: number | null
          email?: string | null
          ethnicity?: string | null
          height?: string | null
          hobbies?: string | null
          id?: string
          last_daily_claim?: string | null
          onboarding_completed?: boolean | null
          past_relationships?: string | null
          referral_code?: string | null
          referred_by?: string | null
          relationship_goals?: string | null
          sexual_orientation?: string | null
          subscription_tier?: string | null
          tokens?: number | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          referred_id: string
          referrer_id: string
          tokens_earned: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referred_id: string
          referrer_id: string
          tokens_earned?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referred_id?: string
          referrer_id?: string
          tokens_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_data: {
        Row: {
          conversation_patterns: Json | null
          created_at: string | null
          girlfriend_id: string | null
          id: string
          inside_jokes: Json | null
          interests: Json | null
          nicknames: Json | null
          typing_style: Json | null
          user_id: string
        }
        Insert: {
          conversation_patterns?: Json | null
          created_at?: string | null
          girlfriend_id?: string | null
          id?: string
          inside_jokes?: Json | null
          interests?: Json | null
          nicknames?: Json | null
          typing_style?: Json | null
          user_id: string
        }
        Update: {
          conversation_patterns?: Json | null
          created_at?: string | null
          girlfriend_id?: string | null
          id?: string
          inside_jokes?: Json | null
          interests?: Json | null
          nicknames?: Json | null
          typing_style?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_data_girlfriend_id_fkey"
            columns: ["girlfriend_id"]
            isOneToOne: false
            referencedRelation: "ai_girlfriends"
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
    Enums: {},
  },
} as const
