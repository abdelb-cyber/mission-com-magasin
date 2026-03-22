import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mode hors-ligne : si Supabase n'est pas configuré, on utilise le localStorage
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' &&
         supabaseUrl !== 'your_supabase_url_here' &&
         supabaseAnonKey !== '' &&
         supabaseAnonKey !== 'your_supabase_anon_key_here'
}
