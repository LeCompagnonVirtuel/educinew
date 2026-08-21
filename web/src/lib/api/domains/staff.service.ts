import { getSupabase, camel, createUserWithoutSessionSwitch, generateSecurePassword } from '../shared';
import { getAuthenticatedSchoolId, getAuthorizedSchoolId } from '../secure';

export const sbStaff = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('staff')
      .select('*, user:users(*)');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async get(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('staff')
      .select('*, user:users(*)')
      .eq('id', id);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query.single();
    if (error) throw error;
    return camel(data);
  },

  async create(data: {
    name: string;
    email: string;
    position: string;
    department?: string;
    phone?: string;
    contractType?: string;
    salary?: number;
    role?: string;
  }) {
    const supabase = getSupabase();
    const { schoolId, userId } = await getAuthorizedSchoolId(['ADMIN', 'SUPER_ADMIN']);
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.name) throw new Error('Le nom est requis');
    if (!data.email) throw new Error('L\'email est requis');
    if (!data.position) throw new Error('La fonction est requise');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) throw new Error('Format d\'email invalide');

    const tempPassword = generateSecurePassword(data.name);
    const staffRole = data.role || 'SECRETAIRE';

    const { authData, authError, accessKit } = await createUserWithoutSessionSwitch(supabase, data.email, tempPassword, {
      name: data.name,
      role: staffRole,
      school_id: schoolId,
      is_first_login: true,
      phone: data.phone || null,
      position: data.position,
      department: data.department || null,
    });
    if (authError) {
      if (authError.message.includes('already registered') || authError.message.includes('déjà utilisé')) {
        throw new Error('Cet email est déjà utilisé par un autre compte');
      }
      throw new Error(`Erreur création compte: ${authError.message}`);
    }

    const newUserId = authData?.user?.id;
    if (!newUserId) throw new Error('Erreur lors de la création du compte utilisateur');

    // The create-user API already inserts the staff record — query it and update extra fields
    const { data: staffRecord, error: staffError } = await supabase
      .from('staff')
      .select()
      .eq('user_id', newUserId)
      .single();

    if (staffError || !staffRecord) {
      throw new Error('Erreur récupération profil personnel');
    }

    // Update with additional fields not handled by create-user route
    if (data.contractType || data.salary) {
      await supabase.from('staff').update({
        contract_type: data.contractType || staffRecord.contract_type || 'CDI',
        salary: data.salary || staffRecord.salary || null,
      }).eq('id', staffRecord.id);
    }

    return {
      staff: camel(staffRecord),
      tempPassword: accessKit?.initial_password || tempPassword,
      identifier: accessKit?.identifier || authData?.user?.identifier,
      invitationCode: accessKit?.invitation_code || authData?.user?.invitation_code,
      userId: newUserId,
    };
  },

  async update(id: string, data: {
    position?: string;
    department?: string;
    phone?: string;
    contractType?: string;
    salary?: number;
    isActive?: boolean;
  }) {
    const supabase = getSupabase();
    await getAuthorizedSchoolId(['ADMIN', 'SUPER_ADMIN']);

    const updateData: Record<string, any> = {};
    if (data.position !== undefined) updateData.position = data.position;
    if (data.department !== undefined) updateData.department = data.department;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.contractType !== undefined) updateData.contract_type = data.contractType;
    if (data.salary !== undefined) updateData.salary = data.salary;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    const { data: updated, error } = await supabase
      .from('staff')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return camel(updated);
  },

  async deactivate(id: string) {
    return this.update(id, { isActive: false });
  },

  async activate(id: string) {
    return this.update(id, { isActive: true });
  },

  async invite(data: { email: string; role: string; position: string; department?: string }) {
    const supabase = getSupabase();
    const { schoolId, userId } = await getAuthorizedSchoolId(['ADMIN', 'SUPER_ADMIN']);

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: invitation, error } = await supabase
      .from('staff_invitations')
      .insert({
        school_id: schoolId,
        email: data.email,
        role: data.role,
        position: data.position,
        department: data.department || null,
        invitation_token: token,
        status: 'PENDING',
        invited_by: userId,
        expires_at: expiresAt,
      })
      .select()
      .single();
    if (error) throw error;
    return camel(invitation);
  },

  async getInvitations() {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data, error } = await supabase
      .from('staff_invitations')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },
};
