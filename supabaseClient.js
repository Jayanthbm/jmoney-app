// supabaseClient.js

import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// You can either use .env variables (via babel-plugin-inline-dotenv) or hardcode during dev
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
   auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // for mobile apps
   },
});

export const getSession = async () => {
   const { data, error } = await supabase.auth.getSession();
   if (error) {
      console.error('Error fetching session:', error.message);
   }
   return data.session;
};
