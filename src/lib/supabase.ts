import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Illustration = {
  id: string
  name: string
  category: 'phone' | 'laptop' | 'profile'
  image_url: string
  uploaded_at: string
}