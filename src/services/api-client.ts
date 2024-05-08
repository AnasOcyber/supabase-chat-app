import { createClient } from "@supabase/supabase-js";
import { Database } from "../types";

const apiEndpoint = import.meta.env.VITE_SUPABASE_API_ENDPOINT;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default createClient<Database>(apiEndpoint, apiKey);
