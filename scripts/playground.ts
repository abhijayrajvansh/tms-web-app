import env from '@/constants';
import {createClient} from '@supabase/supabase-js';

const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);  

(async() => {
  const { data, error } = await supabase.from('messages').select()
  console.log({data})
})()