
import { createClient } from '@supabase/supabase-js'
//Supabase Credentials
const supabaseUrl = 'https://sheyoqtxnyssxqoqaytc.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
console.log('URL:', import.meta.env.VITE_SUPABASE_KEY);
console.log(
  'Key available?',
  Boolean(import.meta.env.VITE_SUPABASE_KEY)
);
export const supabase = createClient(supabaseUrl, supabaseKey)