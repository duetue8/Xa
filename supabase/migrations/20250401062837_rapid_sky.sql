/*
  # Fix Application Submission Permissions

  1. Changes
    - Add policies for anonymous submissions
    - Update RLS policies for applications table
    - Ensure proper access control
*/

-- Enable insert access for anonymous users
CREATE POLICY "Enable insert for anonymous users"
ON public.applications
FOR INSERT
TO anon
WITH CHECK (true);

-- Enable insert access for authenticated users
CREATE POLICY "Enable insert for authenticated users"
ON public.applications
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Enable read access for all users
CREATE POLICY "Enable read access for all users"
ON public.applications
FOR SELECT
TO anon, authenticated
USING (true);