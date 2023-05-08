import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import { PUBLIC_API_KEY_SUPABASE, PUBLIC_URL_SUPABASE } from '@env';

const supabase = createClient(PUBLIC_URL_SUPABASE, PUBLIC_API_KEY_SUPABASE);

export default supabase;