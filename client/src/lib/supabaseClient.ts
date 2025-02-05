import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = 'https://ziilfxkhmjlollmbngum.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaWxmeGtobWpsb2xsbWJuZ3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMTQ0NTMsImV4cCI6MjA1MTU5MDQ1M30.HqjlkWC6pohtvSJQj2fsLH4O0GeptrN9xRhsOt2HByI'
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
    let fullUrl = `https://ziilfxkhmjlollmbngum.supabase.co/storage/v1/object/public/${data.fullPath}`
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
  
        
        const fullUrl = `https://ziilfxkhmjlollmbngum.supabase.co/storage/v1/object/public/${data.fullPath}`;
        return fullUrl;
      });
  
      
      const fullUrls = await Promise.all(uploadPromises);
      console.log('All files uploaded:', fullUrls);
      return fullUrls; 
    } catch (error) {
      console.error('Error uploading files:', error);
      return null;
    }
  }