// Ganti dengan URL dan anon key project Supabase Anda
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qrsjisbevgfbkylzoipt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyc2ppc2JldmdmYmt5bHpvaXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjAwNTksImV4cCI6MjA4NjgzNjA1OX0.bChDixGLPnBlTG7BwcNBcdrf9k-cYQWQ-WuT-nySt-o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
