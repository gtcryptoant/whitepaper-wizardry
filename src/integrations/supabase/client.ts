// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tcmqmmnbphalhhjqbdjx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbXFtbW5icGhhbGhoanFiZGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDc1NTcsImV4cCI6MjA1ODMyMzU1N30.vgMHd9aH-SaQ9pNP3UJDiHyS-LiuheBlFEBT4RL4f5M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);