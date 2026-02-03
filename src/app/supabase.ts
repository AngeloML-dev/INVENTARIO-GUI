import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uzkxigqcipcempyyayww.supabase.co';
const supabaseKey = 'sb_publishable_fsrePnC0uaE5kO5Ji7q_mg_CBnUkRhf';

export const supabase = createClient(supabaseUrl, supabaseKey);
