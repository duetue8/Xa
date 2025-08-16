-- Create storage bucket policies
CREATE POLICY "Enable read access for authenticated users"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'exports');

CREATE POLICY "Enable insert access for authenticated users"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'exports');

-- Create RLS policies for tables
CREATE POLICY "Enable read access for authenticated users"
ON applications FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for all users"
ON applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
ON audit_logs FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable all access for authenticated users"
ON export_jobs FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);