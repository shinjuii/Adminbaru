import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://yfisgogkoewxllkhupka.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaXNnb2drb2V3eGxsa2h1cGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjUwODAsImV4cCI6MjA3OTc0MTA4MH0.AooPjUCaASz-KwzNBF26HN17mODZfgBE3uFxyJrqyv8';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// HELPER FUNCTIONS - Supabase Queries
// =====================================================

// ==== DASHBOARD STATS ====
export const getDashboardStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_dashboard_stats');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { data: null, error: error.message };
  }
};

export const getRecentActivities = async (limit = 10) => {
  try {
    const { data, error } = await supabase.rpc('get_recent_activities', { p_limit: limit });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return { data: null, error: error.message };
  }
};

export const getMonthlyTrends = async (months = 6) => {
  try {
    const { data, error } = await supabase.rpc('get_monthly_donation_trends', { p_months: months });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching monthly trends:', error);
    return { data: null, error: error.message };
  }
};

// ==== EMISSION FACTORS ====
export const getEmissionFactors = async () => {
  try {
    const { data, error } = await supabase.rpc('get_emission_factors');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching emission factors:', error);
    return { data: null, error: error.message };
  }
};

export const createEmissionFactor = async (factorData) => {
  try {
    const { data, error } = await supabase
      .from('vehicle_emission_factors')
      .insert([factorData])
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating emission factor:', error);
    return { data: null, error: error.message };
  }
};

export const updateEmissionFactor = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('vehicle_emission_factors')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating emission factor:', error);
    return { data: null, error: error.message };
  }
};

export const deleteEmissionFactor = async (id) => {
  try {
    const { error } = await supabase
      .from('vehicle_emission_factors')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting emission factor:', error);
    return { error: error.message };
  }
};

// ==== COMMUNITIES ====
export const getCommunitiesWithStats = async () => {
  try {
    const { data, error } = await supabase
      .from('vw_communities_with_stats')
      .select('*');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching communities:', error);
    return { data: null, error: error.message };
  }
};

export const getCommunityById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching community:', error);
    return { data: null, error: error.message };
  }
};

export const createCommunity = async (communityData) => {
  try {
    const { data, error } = await supabase
      .from('communities')
      .insert([communityData])
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating community:', error);
    return { data: null, error: error.message };
  }
};

export const updateCommunity = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('communities')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating community:', error);
    return { data: null, error: error.message };
  }
};

export const deleteCommunity = async (id) => {
  try {
    const { error } = await supabase
      .from('communities')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting community:', error);
    return { error: error.message };
  }
};

// ==== EDUCATION CONTENT ====
export const getEducationContent = async (category = null, limit = 20, offset = 0) => {
  try {
    const { data, error } = await supabase.rpc('get_education_content', {
      p_category: category,
      p_limit: limit,
      p_offset: offset
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching education content:', error);
    return { data: null, error: error.message };
  }
};

export const createEducationContent = async (contentData) => {
  try {
    const { data, error } = await supabase
      .from('education_content')
      .insert([contentData])
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating education content:', error);
    return { data: null, error: error.message };
  }
};

export const updateEducationContent = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('education_content')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating education content:', error);
    return { data: null, error: error.message };
  }
};

export const deleteEducationContent = async (id) => {
  try {
    const { error } = await supabase
      .from('education_content')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting education content:', error);
    return { error: error.message };
  }
};

export const incrementEducationViews = async (contentId) => {
  try {
    const { error } = await supabase.rpc('increment_education_views', {
      p_content_id: contentId
    });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error incrementing views:', error);
    return { error: error.message };
  }
};

// ==== NOTIFICATIONS ====
export const getNotifications = async () => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { data: null, error: error.message };
  }
};

export const getUnreadCount = async () => {
  try {
    const { data, error } = await supabase.rpc('get_unread_notification_count');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return { data: 0, error: error.message };
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const { error } = await supabase.rpc('mark_notification_read', {
      p_notification_id: notificationId
    });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error marking as read:', error);
    return { error: error.message };
  }
};

export const createNotification = async (notificationData) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notificationData])
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating notification:', error);
    return { data: null, error: error.message };
  }
};

export const updateNotification = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating notification:', error);
    return { data: null, error: error.message };
  }
};

export const deleteNotification = async (id) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting notification:', error);
    return { error: error.message };
  }
};


export const markAllAsRead = async () => {
  try {
    const { error } = await supabase.rpc('mark_all_notifications_read');
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error marking all as read:', error);
    return { error: error.message };
  }
};

// ==== DONATIONS ====
export const getDonationOffsetStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_donation_offset_stats');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    return { data: null, error: error.message };
  }
};

export const getTopDonors = async (limit = 3) => {
  try {
    const { data, error } = await supabase.rpc('get_top_donors_offset', {
      p_limit: limit
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching top donors:', error);
    return { data: null, error: error.message };
  }
};

export const getPopularCommunities = async (limit = 3) => {
  try {
    const { data, error } = await supabase.rpc('get_popular_communities_offset', {
      p_limit: limit
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching popular communities:', error);
    return { data: null, error: error.message };
  }
};

export const getDonationReports = async () => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select(`
        id,
        amount,
        payment_status,
        created_at,
        users ( full_name ),
        communities ( name )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching donation reports:', error);
    return { data: null, error: error.message };
  }
};

// ==== ADMIN PROFILE ====
export const getAdminProfile = async () => {
  try {
    const { data, error } = await supabase.rpc('get_admin_profile');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    return { data: null, error: error.message };
  }
};

export const updateAdminProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('user_id', userId)
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating admin profile:', error);
    return { data: null, error: error.message };
  }
};

// ==== FILE UPLOADS ====
export const uploadImage = async (bucket, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

    return { data: { ...data, publicUrl: urlData.publicUrl }, error: null };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { data: null, error: error.message };
  }
};

export const deleteImage = async (bucket, path) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { error: error.message };
  }
};

// Connection check helper
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (error) throw error;
    return { success: true, message: 'Supabase connected successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Export default
export default supabase;
