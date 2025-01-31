// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ijwklmxgzbvnijzupxpl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqd2tsbXhnemJ2bmlqenVweHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMjg4MTUsImV4cCI6MjA1MzcwNDgxNX0.ha2oIonPKFUb1xglqCZZrUnBJ7BdctnNycgrYy97Ye4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
