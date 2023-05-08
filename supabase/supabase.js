import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://lkkxckjqdkyzpgxousce.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxra3hja2pxZGt5enBneG91c2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxNDI3NTMsImV4cCI6MTk5ODcxODc1M30.D0rxgJJM-Cc_-00KqkXGn-PL5lMWAg42qQIZD8j9nb0';
export const supabase = createClient(supabaseUrl, supabaseKey);

