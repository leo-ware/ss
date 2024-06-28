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
      author_to_paper: {
        Row: {
          author_id: string
          paper_id: string
        }
        Insert: {
          author_id: string
          paper_id: string
        }
        Update: {
          author_id?: string
          paper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "author_to_paper_author_id_authors_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "author_to_paper_paper_id_papers_paper_id_fk"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "papers"
            referencedColumns: ["paper_id"]
          },
        ]
      }
      authors: {
        Row: {
          author_id: string
          name: string
        }
        Insert: {
          author_id: string
          name: string
        }
        Update: {
          author_id?: string
          name?: string
        }
        Relationships: []
      }
      papers: {
        Row: {
          abstract: string | null
          citation_count: number | null
          paper_id: string
          reference_count: number | null
          title: string
          url: string | null
          venue: string | null
          year: number
        }
        Insert: {
          abstract?: string | null
          citation_count?: number | null
          paper_id: string
          reference_count?: number | null
          title: string
          url?: string | null
          venue?: string | null
          year: number
        }
        Update: {
          abstract?: string | null
          citation_count?: number | null
          paper_id?: string
          reference_count?: number | null
          title?: string
          url?: string | null
          venue?: string | null
          year?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          affiliation: string | null
          firstName: string | null
          id: string
          lastName: string | null
        }
        Insert: {
          affiliation?: string | null
          firstName?: string | null
          id: string
          lastName?: string | null
        }
        Update: {
          affiliation?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Relationships: []
      }
      project_to_paper: {
        Row: {
          paper_id: string
          project_id: number
        }
        Insert: {
          paper_id: string
          project_id: number
        }
        Update: {
          paper_id?: string
          project_id?: number
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: number
          last_updated: string
          name: string
          user_id: number | null
        }
        Insert: {
          created_at: string
          description?: string | null
          id?: number
          last_updated: string
          name: string
          user_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          last_updated?: string
          name?: string
          user_id?: number | null
        }
        Relationships: []
      }
      searches: {
        Row: {
          created_at: string
          id: number
          project_id: number
          query: string
        }
        Insert: {
          created_at: string
          id?: number
          project_id: number
          query: string
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: number
          query?: string
        }
        Relationships: []
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
