/*
  # Create illustrations table for manga artist website

  1. New Tables
    - `illustrations`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Name/title of the illustration
      - `category` (text, not null) - Category: 'phone', 'laptop', or 'profile'
      - `image_url` (text, not null) - URL to the stored image
      - `uploaded_at` (timestamp) - When the illustration was uploaded

  2. Security
    - Enable RLS on `illustrations` table
    - Add policy for public read access (since this is a portfolio site)
    - Add policy for authenticated admin to insert/update/delete
*/

-- Create the illustrations table
CREATE TABLE IF NOT EXISTS illustrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('phone', 'laptop', 'profile')),
  image_url text NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE illustrations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (portfolio is public)
CREATE POLICY "Anyone can view illustrations"
  ON illustrations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policy for authenticated users to manage illustrations
-- (This would be for the admin/artist to upload new illustrations)
CREATE POLICY "Authenticated users can manage illustrations"
  ON illustrations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for illustration images
INSERT INTO storage.buckets (id, name, public)
VALUES ('illustrations', 'illustrations', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public access to illustration images
CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'illustrations');

-- Create policy for authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'illustrations');

-- Create policy for authenticated users to update images
CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'illustrations');

-- Create policy for authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'illustrations');