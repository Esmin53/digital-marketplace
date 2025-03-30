import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFile(file: File, folder: string) {
    
    const filename = `${uuidv4()}${file.name}`

    const { data, error } = await supabase.storage
      .from('e-book-marketplace') // Bucket name
      .upload(`${folder}/${filename}`, file, {
        cacheControl: '3600', // optional: cache control header
        upsert: false, // Optional: whether to overwrite file with same name
      });
  
    if (error) {
      console.error('Error uploading file:', error.message);
      return null;
    }
  
    console.log('File uploaded:', data);
    const fullUrl = `https://ziilfxkhmjlollmbngum.supabase.co/storage/v1/object/public/${data.fullPath}`
    return fullUrl
  }

  export async function uploadFiles(files: File[], folder: string): Promise<string[] | null> {
    try {
      
      const uploadPromises = files.map(async (file) => {
        const filename = `${uuidv4()}-${file.name}`; 
        const { data, error } = await supabase.storage
          .from('e-book-marketplace') 
          .upload(`${folder}/${filename}`, file, {
            cacheControl: '3600', 
            upsert: false, 
          });
  
        if (error) {
          console.error('Error uploading file:', error.message);
          throw error; 
        }
  
        let url: string | null = null

        if(folder === 'files') {
          url = `${folder}/${filename}`
        } else {
          url = `https://ziilfxkhmjlollmbngum.supabase.co/storage/v1/object/public/${data.fullPath}`;
        } 

        return url;
      });
  
      
      const fullUrls = await Promise.all(uploadPromises);
      console.log('All files uploaded:', fullUrls);
      return fullUrls; 
    } catch (error) {
      console.error('Error uploading files:', error);
      return null;
    }
  }