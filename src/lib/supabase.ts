//plugins/supabase.ts
 
// Composables
import { createClient } from '@supabase/supabase-js'

// Meta
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// CreateClient using meta
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
