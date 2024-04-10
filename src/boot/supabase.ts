import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


// supabase.auth.signUp({
//   email: 'dannymetal17@gmail.com',
//   password: 'HZClSeFTnlUQVwpvgGTU'
// }).then(({ data, error }) => {
//   console.log(data, error);
// })


// supabase.auth.signInWithPassword({
//   email: 'dannymetal17@gmail.com',
//   password: 'HZClSeFTnlUQVwpvgGTU'
// }).then(({ data, error }) => {
//   console.log(data, error);
// })

