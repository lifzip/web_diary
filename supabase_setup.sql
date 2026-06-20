-- Jalankan script SQL ini di SQL Editor pada dashboard Supabase Anda

-- Buat tabel diaries
CREATE TABLE diaries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE diaries ENABLE ROW LEVEL SECURITY;

-- Buat policy agar user hanya bisa MENGAKSES diary mereka sendiri
CREATE POLICY "Users can view their own diaries" 
  ON diaries FOR SELECT 
  USING (auth.uid() = user_id);

-- Buat policy agar user hanya bisa MEMBUAT diary mereka sendiri
CREATE POLICY "Users can insert their own diaries" 
  ON diaries FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Buat policy agar user hanya bisa MENGEDIT diary mereka sendiri
CREATE POLICY "Users can update their own diaries" 
  ON diaries FOR UPDATE 
  USING (auth.uid() = user_id);

-- Buat policy agar user hanya bisa MENGHAPUS diary mereka sendiri
CREATE POLICY "Users can delete their own diaries" 
  ON diaries FOR DELETE 
  USING (auth.uid() = user_id);
