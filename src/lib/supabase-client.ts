import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Erro ao inicializar o Supabase: Variáveis de ambiente não definidas."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
