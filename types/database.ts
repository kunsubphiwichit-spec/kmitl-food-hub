export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
export type StoreStatus = 'PENDING' | 'ACTIVE' | 'CLOSED' | 'SUSPENDED';
export type StoreCategory = 'food' | 'drink' | 'transport' | 'other';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          name: string | null;
          is_banned: boolean;
          ban_until: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role?: UserRole;
          name?: string | null;
          is_banned?: boolean;
          ban_until?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: UserRole;
          name?: string | null;
          is_banned?: boolean;
          ban_until?: string | null;
          created_at?: string;
        };
      };
      stores: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: StoreCategory;
          status: StoreStatus;
          owner_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category: StoreCategory;
          status?: StoreStatus;
          owner_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          category?: StoreCategory;
          status?: StoreStatus;
          owner_id?: string;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          store_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          user_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          user_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          target_id: string;
          details: any | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          target_id: string;
          details?: any | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          target_id?: string;
          details?: any | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
      store_suggestions: {
        Row: {
          id: string;
          name: string;
          suggested_by: string;
          details: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          suggested_by: string;
          details?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          suggested_by?: string;
          details?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
