export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string;
          code: string;
          name: string;
          sigle: string | null;
          slogan: string | null;
          description: string | null;
          address: string | null;
          city: string | null;
          region: string | null;
          country: string | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          logo_url: string | null;
          logo: string | null;
          favicon_url: string | null;
          primary_color: string | null;
          secondary_color: string | null;
          accent_color: string | null;
          academic_year: string | null;
          grading_system: string | null;
          passing_grade: number | null;
          timezone: string | null;
          language: string | null;
          currency: string | null;
          notifications: Json | null;
          payment_settings: Json | null;
          academic_settings: Json | null;
          theme: Json | null;
          ai_settings: Json | null;
          latitude: number | null;
          longitude: number | null;
          checkin_radius: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          sigle?: string | null;
          slogan?: string | null;
          description?: string | null;
          address?: string | null;
          city?: string | null;
          region?: string | null;
          country?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          logo_url?: string | null;
          logo?: string | null;
          favicon_url?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          accent_color?: string | null;
          academic_year?: string | null;
          grading_system?: string | null;
          passing_grade?: number | null;
          timezone?: string | null;
          language?: string | null;
          currency?: string | null;
          notifications?: Json | null;
          payment_settings?: Json | null;
          academic_settings?: Json | null;
          theme?: Json | null;
          ai_settings?: Json | null;
          latitude?: number | null;
          longitude?: number | null;
          checkin_radius?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          sigle?: string | null;
          slogan?: string | null;
          description?: string | null;
          address?: string | null;
          city?: string | null;
          region?: string | null;
          country?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          logo_url?: string | null;
          logo?: string | null;
          favicon_url?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          accent_color?: string | null;
          academic_year?: string | null;
          grading_system?: string | null;
          passing_grade?: number | null;
          timezone?: string | null;
          language?: string | null;
          currency?: string | null;
          notifications?: Json | null;
          payment_settings?: Json | null;
          academic_settings?: Json | null;
          theme?: Json | null;
          ai_settings?: Json | null;
          latitude?: number | null;
          longitude?: number | null;
          checkin_radius?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string;
          school_id: string | null;
          phone: string | null;
          photo_url: string | null;
          is_active: boolean;
          two_factor_secret: string | null;
          two_factor_enabled: boolean;
          failed_login_attempts: number;
          locked_until: string | null;
          last_login_at: string | null;
          last_login_ip: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          status: string;
          is_first_login: boolean;
          last_password_change: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          role?: string;
          school_id?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          is_active?: boolean;
          two_factor_secret?: string | null;
          two_factor_enabled?: boolean;
          failed_login_attempts?: number;
          locked_until?: string | null;
          last_login_at?: string | null;
          last_login_ip?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          status?: string;
          is_first_login?: boolean;
          last_password_change?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
          school_id?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          is_active?: boolean;
          two_factor_secret?: string | null;
          two_factor_enabled?: boolean;
          failed_login_attempts?: number;
          locked_until?: string | null;
          last_login_at?: string | null;
          last_login_ip?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          status?: string;
          is_first_login?: boolean;
          last_password_change?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      students: {
        Row: {
          id: string;
          user_id: string;
          school_id: string;
          class_id: string | null;
          matricule: string;
          date_of_birth: string;
          gender: string | null;
          address: string | null;
          photo_url: string | null;
          enrollment_date: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          school_id: string;
          class_id?: string | null;
          matricule: string;
          date_of_birth: string;
          gender?: string | null;
          address?: string | null;
          photo_url?: string | null;
          enrollment_date?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          school_id?: string;
          class_id?: string | null;
          matricule?: string;
          date_of_birth?: string;
          gender?: string | null;
          address?: string | null;
          photo_url?: string | null;
          enrollment_date?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      teachers: {
        Row: {
          id: string;
          user_id: string;
          school_id: string;
          subject_id: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          school_id: string;
          subject_id?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          school_id?: string;
          subject_id?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      classes: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          level: string;
          academic_year_id: string | null;
          capacity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          level: string;
          academic_year_id?: string | null;
          capacity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          name?: string;
          level?: string;
          academic_year_id?: string | null;
          capacity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          coefficient: number;
          school_id: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          coefficient?: number;
          school_id?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          coefficient?: number;
          school_id?: string | null;
        };
      };
      grades: {
        Row: {
          id: string;
          student_id: string;
          subject_id: string;
          teacher_id: string | null;
          school_id: string;
          score: number;
          max_score: number;
          grade_type: string;
          coefficient: number;
          bonus: number;
          is_optional: boolean;
          term: string;
          period_id: string | null;
          academic_year_id: string | null;
          is_validated: boolean;
          validated_at: string | null;
          validated_by: string | null;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          subject_id: string;
          teacher_id?: string | null;
          school_id: string;
          score: number;
          max_score?: number;
          grade_type?: string;
          coefficient?: number;
          bonus?: number;
          is_optional?: boolean;
          term: string;
          period_id?: string | null;
          academic_year_id?: string | null;
          is_validated?: boolean;
          validated_at?: string | null;
          validated_by?: string | null;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          subject_id?: string;
          teacher_id?: string | null;
          school_id?: string;
          score?: number;
          max_score?: number;
          grade_type?: string;
          coefficient?: number;
          bonus?: number;
          is_optional?: boolean;
          term?: string;
          period_id?: string | null;
          academic_year_id?: string | null;
          is_validated?: boolean;
          validated_at?: string | null;
          validated_by?: string | null;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          student_id: string;
          school_id: string;
          date: string;
          status: string;
          remark: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          school_id: string;
          date: string;
          status: string;
          remark?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          school_id?: string;
          date?: string;
          status?: string;
          remark?: string | null;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          student_id: string;
          user_id: string | null;
          tuition_plan_id: string | null;
          school_id: string;
          amount: number;
          payment_method: string;
          payment_date: string;
          reference: string;
          status: string;
          receipt_url: string | null;
          invoice_id: string | null;
          subscription_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          user_id?: string | null;
          tuition_plan_id?: string | null;
          school_id: string;
          amount: number;
          payment_method: string;
          payment_date?: string;
          reference: string;
          status?: string;
          receipt_url?: string | null;
          invoice_id?: string | null;
          subscription_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          user_id?: string | null;
          tuition_plan_id?: string | null;
          school_id?: string;
          amount?: number;
          payment_method?: string;
          payment_date?: string;
          reference?: string;
          status?: string;
          receipt_url?: string | null;
          invoice_id?: string | null;
          subscription_id?: string | null;
          created_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          tuition_plan_id: string | null;
          type: string;
          fee_category_id: string | null;
          amount: number;
          discount_amount: number;
          final_amount: number;
          due_date: string;
          paid_amount: number;
          status: string;
          description: string | null;
          academic_year: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          tuition_plan_id?: string | null;
          type: string;
          fee_category_id?: string | null;
          amount: number;
          discount_amount?: number;
          final_amount: number;
          due_date: string;
          paid_amount?: number;
          status?: string;
          description?: string | null;
          academic_year?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          student_id?: string;
          tuition_plan_id?: string | null;
          type?: string;
          fee_category_id?: string | null;
          amount?: number;
          discount_amount?: number;
          final_amount?: number;
          due_date?: string;
          paid_amount?: number;
          status?: string;
          description?: string | null;
          academic_year?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          school_id: string;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          school_id: string;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          school_id?: string;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string;
          type: string;
          is_read: boolean;
          data: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          body: string;
          type: string;
          is_read?: boolean;
          data?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          body?: string;
          type?: string;
          is_read?: boolean;
          data?: string | null;
          created_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          school_id: string;
          title: string;
          message: string;
          target_role: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          title: string;
          message: string;
          target_role?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          title?: string;
          message?: string;
          target_role?: string | null;
          created_at?: string;
        };
      };
      buses: {
        Row: {
          id: string;
          school_id: string;
          driver_name: string;
          plate_number: string;
          route: string | null;
          capacity: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          driver_name: string;
          plate_number: string;
          route?: string | null;
          capacity?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          driver_name?: string;
          plate_number?: string;
          route?: string | null;
          capacity?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      bus_tracking: {
        Row: {
          id: string;
          bus_id: string;
          latitude: number;
          longitude: number;
          timestamp: string;
        };
        Insert: {
          id?: string;
          bus_id: string;
          latitude: number;
          longitude: number;
          timestamp?: string;
        };
        Update: {
          id?: string;
          bus_id?: string;
          latitude?: number;
          longitude?: number;
          timestamp?: string;
        };
      };
      invitations: {
        Row: {
          id: string;
          school_id: string;
          email: string;
          role: string;
          token: string;
          matricule: string | null;
          student_id: string | null;
          invited_by_id: string;
          expires_at: string;
          used_at: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          email: string;
          role: string;
          token: string;
          matricule?: string | null;
          student_id?: string | null;
          invited_by_id: string;
          expires_at: string;
          used_at?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          email?: string;
          role?: string;
          token?: string;
          matricule?: string | null;
          student_id?: string | null;
          invited_by_id?: string;
          expires_at?: string;
          used_at?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          school_id: string;
          user_id: string | null;
          action: string;
          entity: string;
          entity_id: string | null;
          details: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          user_id?: string | null;
          action: string;
          entity: string;
          entity_id?: string | null;
          details?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          user_id?: string | null;
          action?: string;
          entity?: string;
          entity_id?: string | null;
          details?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
      marketplace_listings: {
        Row: {
          id: string;
          seller_id: string;
          title: string;
          description: string;
          category: string;
          price: number;
          type: string;
          thumbnail_url: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seller_id: string;
          title: string;
          description: string;
          category: string;
          price: number;
          type: string;
          thumbnail_url?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          seller_id?: string;
          title?: string;
          description?: string;
          category?: string;
          price?: number;
          type?: string;
          thumbnail_url?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      periods: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          period_type: string;
          start_date: string;
          end_date: string;
          academic_year_id: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          period_type: string;
          start_date: string;
          end_date: string;
          academic_year_id: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          name?: string;
          period_type?: string;
          start_date?: string;
          end_date?: string;
          academic_year_id?: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bulletins: {
        Row: {
          id: string;
          student_id: string;
          class_id: string;
          period_id: string;
          school_id: string;
          academic_year_id: string;
          general_average: number;
          total_coefficient: number;
          total_score: number;
          rank: number | null;
          class_size: number;
          mention: string | null;
          status: string;
          validated_at: string | null;
          validated_by: string | null;
          teacher_comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          class_id: string;
          period_id: string;
          school_id: string;
          academic_year_id: string;
          general_average?: number;
          total_coefficient?: number;
          total_score?: number;
          rank?: number | null;
          class_size?: number;
          mention?: string | null;
          status?: string;
          validated_at?: string | null;
          validated_by?: string | null;
          teacher_comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          class_id?: string;
          period_id?: string;
          school_id?: string;
          academic_year_id?: string;
          general_average?: number;
          total_coefficient?: number;
          total_score?: number;
          rank?: number | null;
          class_size?: number;
          mention?: string | null;
          status?: string;
          validated_at?: string | null;
          validated_by?: string | null;
          teacher_comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      bulletin_entries: {
        Row: {
          id: string;
          bulletin_id: string;
          subject_id: string;
          subject_name: string;
          coefficient: number;
          average: number;
          score_total: number;
          coeff_total: number;
          rank: number | null;
          teacher_comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          bulletin_id: string;
          subject_id: string;
          subject_name: string;
          coefficient: number;
          average?: number;
          score_total?: number;
          coeff_total?: number;
          rank?: number | null;
          teacher_comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          bulletin_id?: string;
          subject_id?: string;
          subject_name?: string;
          coefficient?: number;
          average?: number;
          score_total?: number;
          coeff_total?: number;
          rank?: number | null;
          teacher_comment?: string | null;
          created_at?: string;
        };
      };
      teacher_attendance: {
        Row: {
          id: string;
          teacher_id: string;
          school_id: string;
          date: string;
          check_in_time: string;
          check_out_time: string | null;
          method: string;
          latitude: number | null;
          longitude: number | null;
          distance_meters: number | null;
          qr_verified: boolean;
          face_match_score: number | null;
          verified: boolean;
          late_minutes: number;
          remark: string | null;
          gps_validated_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          school_id: string;
          date: string;
          check_in_time: string;
          check_out_time?: string | null;
          method: string;
          latitude?: number | null;
          longitude?: number | null;
          distance_meters?: number | null;
          qr_verified?: boolean;
          face_match_score?: number | null;
          verified?: boolean;
          late_minutes?: number;
          remark?: string | null;
          gps_validated_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          school_id?: string;
          date?: string;
          check_in_time?: string;
          check_out_time?: string | null;
          method?: string;
          latitude?: number | null;
          longitude?: number | null;
          distance_meters?: number | null;
          qr_verified?: boolean;
          face_match_score?: number | null;
          verified?: boolean;
          late_minutes?: number;
          remark?: string | null;
          gps_validated_at?: string | null;
          created_at?: string;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          balance: number;
          currency: string;
          bonus_balance: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          balance?: number;
          currency?: string;
          bonus_balance?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          balance?: number;
          currency?: string;
          bonus_balance?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      wallet_transactions: {
        Row: {
          id: string;
          wallet_id: string;
          user_id: string;
          type: string;
          amount: number;
          balance_before: number;
          balance_after: number;
          reference: string;
          description: string | null;
          invoice_id: string | null;
          payment_transaction_id: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          wallet_id: string;
          user_id: string;
          type: string;
          amount: number;
          balance_before: number;
          balance_after: number;
          reference: string;
          description?: string | null;
          invoice_id?: string | null;
          payment_transaction_id?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          wallet_id?: string;
          user_id?: string;
          type?: string;
          amount?: number;
          balance_before?: number;
          balance_after?: number;
          reference?: string;
          description?: string | null;
          invoice_id?: string | null;
          payment_transaction_id?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      payment_gateway_configs: {
        Row: {
          id: string;
          school_id: string;
          gateway: string;
          is_active: boolean;
          config: string;
          last_tested_at: string | null;
          last_test_status: string | null;
          last_test_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          gateway: string;
          is_active?: boolean;
          config: string;
          last_tested_at?: string | null;
          last_test_status?: string | null;
          last_test_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          gateway?: string;
          is_active?: boolean;
          config?: string;
          last_tested_at?: string | null;
          last_test_status?: string | null;
          last_test_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          school_id: string;
          plan: string;
          status: string;
          start_date: string;
          end_date: string;
          monthly_amount: number;
          yearly_amount: number | null;
          payment_frequency: string;
          auto_renew: boolean;
          last_payment_date: string | null;
          next_payment_date: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          plan: string;
          status?: string;
          start_date: string;
          end_date: string;
          monthly_amount: number;
          yearly_amount?: number | null;
          payment_frequency?: string;
          auto_renew?: boolean;
          last_payment_date?: string | null;
          next_payment_date?: string | null;
          stripe_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          plan?: string;
          status?: string;
          start_date?: string;
          end_date?: string;
          monthly_amount?: number;
          yearly_amount?: number | null;
          payment_frequency?: string;
          auto_renew?: boolean;
          last_payment_date?: string | null;
          next_payment_date?: string | null;
          stripe_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      academic_years: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          start_date: string;
          end_date: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          start_date: string;
          end_date: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          name?: string;
          start_date?: string;
          end_date?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      class_subjects: {
        Row: {
          id: string;
          class_id: string;
          subject_id: string;
          teacher_id: string | null;
        };
        Insert: {
          id?: string;
          class_id: string;
          subject_id: string;
          teacher_id?: string | null;
        };
        Update: {
          id?: string;
          class_id?: string;
          subject_id?: string;
          teacher_id?: string | null;
        };
      };
      timetable_slots: {
        Row: {
          id: string;
          class_id: string;
          subject_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          room: string | null;
        };
        Insert: {
          id?: string;
          class_id: string;
          subject_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          room?: string | null;
        };
        Update: {
          id?: string;
          class_id?: string;
          subject_id?: string;
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          room?: string | null;
        };
      };
      tuition_plans: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          amount: number;
          frequency: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          amount: number;
          frequency: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          name?: string;
          amount?: number;
          frequency?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      fee_categories: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          description: string | null;
          amount: number | null;
          is_required: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          description?: string | null;
          amount?: number | null;
          is_required?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          name?: string;
          description?: string | null;
          amount?: number | null;
          is_required?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      payment_transactions: {
        Row: {
          id: string;
          invoice_id: string;
          gateway_id: string | null;
          flutterwave_id: string | null;
          amount: number;
          payment_method: string;
          payment_type: string;
          status: string;
          reference: string;
          flw_reference: string | null;
          transaction_id: string | null;
          tx_ref: string | null;
          currency: string;
          narration: string | null;
          ip_address: string | null;
          gateway_response: Json | null;
          payment_date: string;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          gateway_id?: string | null;
          flutterwave_id?: string | null;
          amount: number;
          payment_method: string;
          payment_type: string;
          status?: string;
          reference: string;
          flw_reference?: string | null;
          transaction_id?: string | null;
          tx_ref?: string | null;
          currency?: string;
          narration?: string | null;
          ip_address?: string | null;
          gateway_response?: Json | null;
          payment_date?: string;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          gateway_id?: string | null;
          flutterwave_id?: string | null;
          amount?: number;
          payment_method?: string;
          payment_type?: string;
          status?: string;
          reference?: string;
          flw_reference?: string | null;
          transaction_id?: string | null;
          tx_ref?: string | null;
          currency?: string;
          narration?: string | null;
          ip_address?: string | null;
          gateway_response?: Json | null;
          payment_date?: string;
          completed_at?: string | null;
          created_at?: string;
        };
      };
      behavior_reports: {
        Row: {
          id: string;
          student_id: string;
          school_id: string;
          type: string;
          description: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          school_id: string;
          type: string;
          description: string;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          school_id?: string;
          type?: string;
          description?: string;
          date?: string;
          created_at?: string;
        };
      };
      exam_categories: {
        Row: {
          id: string;
          name: string;
          level: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          level: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          level?: string;
          created_at?: string;
        };
      };
      exams: {
        Row: {
          id: string;
          category_id: string;
          subject_id: string;
          title: string;
          year: number | null;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          subject_id: string;
          title: string;
          year?: number | null;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          subject_id?: string;
          title?: string;
          year?: number | null;
          content?: string;
          created_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          subject_id: string;
          title: string;
          questions: string;
          level: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          subject_id: string;
          title: string;
          questions: string;
          level: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string;
          title?: string;
          questions?: string;
          level?: string;
          created_at?: string;
        };
      };
      quiz_results: {
        Row: {
          id: string;
          quiz_id: string;
          student_id: string;
          score: number;
          total: number;
          answers: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          student_id: string;
          score: number;
          total: number;
          answers: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          student_id?: string;
          score?: number;
          total?: number;
          answers?: string;
          created_at?: string;
        };
      };
      teacher_attendance_stats: {
        Row: {
          id: string;
          teacher_id: string;
          school_id: string;
          month: number;
          year: number;
          total_days: number;
          present_days: number;
          absent_days: number;
          late_days: number;
          punctuality_score: number;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          school_id: string;
          month: number;
          year: number;
          total_days?: number;
          present_days?: number;
          absent_days?: number;
          late_days?: number;
          punctuality_score?: number;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          school_id?: string;
          month?: number;
          year?: number;
          total_days?: number;
          present_days?: number;
          absent_days?: number;
          late_days?: number;
          punctuality_score?: number;
        };
      };
      teacher_badges: {
        Row: {
          id: string;
          teacher_id: string;
          badge_type: string;
          earned_at: string;
          description: string | null;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          badge_type: string;
          earned_at?: string;
          description?: string | null;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          badge_type?: string;
          earned_at?: string;
          description?: string | null;
        };
      };
      marketplace_purchases: {
        Row: {
          id: string;
          buyer_id: string;
          listing_id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          buyer_id: string;
          listing_id: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          buyer_id?: string;
          listing_id?: string;
          status?: string;
          created_at?: string;
        };
      };
      payment_reminders: {
        Row: {
          id: string;
          invoice_id: string;
          school_id: string;
          student_id: string;
          type: string;
          channel: string;
          status: string;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          school_id: string;
          student_id: string;
          type: string;
          channel: string;
          status?: string;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          school_id?: string;
          student_id?: string;
          type?: string;
          channel?: string;
          status?: string;
          sent_at?: string | null;
          created_at?: string;
        };
      };
      staff: {
        Row: {
          id: string;
          user_id: string;
          school_id: string;
          position: string;
          department: string | null;
          hire_date: string | null;
          contract_type: string;
          salary: number | null;
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          school_id: string;
          position: string;
          department?: string | null;
          hire_date?: string | null;
          contract_type?: string;
          salary?: number | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          school_id?: string;
          position?: string;
          department?: string | null;
          hire_date?: string | null;
          contract_type?: string;
          salary?: number | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      staff_attendance: {
        Row: {
          id: string;
          staff_id: string;
          user_id: string;
          school_id: string;
          date: string;
          check_in_time: string | null;
          check_out_time: string | null;
          break_start: string | null;
          break_end: string | null;
          service_start: string | null;
          reprise_time: string | null;
          status: string;
          method: string;
          latitude: number | null;
          longitude: number | null;
          qr_verified: boolean;
          late_minutes: number;
          total_work_minutes: number;
          break_minutes: number;
          recorded_by: string | null;
          recorded_by_type: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          staff_id: string;
          user_id: string;
          school_id: string;
          date?: string;
          check_in_time?: string | null;
          check_out_time?: string | null;
          break_start?: string | null;
          break_end?: string | null;
          service_start?: string | null;
          reprise_time?: string | null;
          status?: string;
          method?: string;
          latitude?: number | null;
          longitude?: number | null;
          qr_verified?: boolean;
          late_minutes?: number;
          total_work_minutes?: number;
          break_minutes?: number;
          recorded_by?: string | null;
          recorded_by_type?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          staff_id?: string;
          user_id?: string;
          school_id?: string;
          date?: string;
          check_in_time?: string | null;
          check_out_time?: string | null;
          break_start?: string | null;
          break_end?: string | null;
          service_start?: string | null;
          reprise_time?: string | null;
          status?: string;
          method?: string;
          latitude?: number | null;
          longitude?: number | null;
          qr_verified?: boolean;
          late_minutes?: number;
          total_work_minutes?: number;
          break_minutes?: number;
          recorded_by?: string | null;
          recorded_by_type?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      visitors: {
        Row: {
          id: string;
          school_id: string;
          visitor_name: string;
          visitor_phone: string | null;
          visitor_id_type: string;
          visitor_id_number: string | null;
          photo_url: string | null;
          purpose: string;
          person_to_visit: string;
          person_role: string | null;
          badge_number: string | null;
          badge_qr_code: string | null;
          entry_time: string;
          exit_time: string | null;
          status: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          visitor_name: string;
          visitor_phone?: string | null;
          visitor_id_type?: string;
          visitor_id_number?: string | null;
          photo_url?: string | null;
          purpose: string;
          person_to_visit: string;
          person_role?: string | null;
          badge_number?: string | null;
          badge_qr_code?: string | null;
          entry_time?: string;
          exit_time?: string | null;
          status?: string;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          visitor_name?: string;
          visitor_phone?: string | null;
          visitor_id_type?: string;
          visitor_id_number?: string | null;
          photo_url?: string | null;
          purpose?: string;
          person_to_visit?: string;
          person_role?: string | null;
          badge_number?: string | null;
          badge_qr_code?: string | null;
          entry_time?: string;
          exit_time?: string | null;
          status?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      staff_invitations: {
        Row: {
          id: string;
          school_id: string;
          email: string;
          role: string;
          position: string;
          department: string | null;
          invitation_token: string;
          status: string;
          invited_by: string;
          expires_at: string;
          accepted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          email: string;
          role: string;
          position: string;
          department?: string | null;
          invitation_token: string;
          status?: string;
          invited_by: string;
          expires_at?: string;
          accepted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          email?: string;
          role?: string;
          position?: string;
          department?: string | null;
          invitation_token?: string;
          status?: string;
          invited_by?: string;
          expires_at?: string;
          accepted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
