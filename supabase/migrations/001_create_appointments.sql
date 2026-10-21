-- Migration: 001_create_appointments.sql
-- Description: Create appointments table with Row Level Security (RLS) for Amit Rehabilitation Centre

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(100) NOT NULL,
  session_type VARCHAR(50) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50) NOT NULL,
  message TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending',
  source VARCHAR(50) DEFAULT 'Website'
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_service ON public.appointments(service);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 4. Policies:
-- Allow anyone (public/anonymous) to submit an appointment enquiry
CREATE POLICY "Allow anonymous appointment enquiry submissions"
  ON public.appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) >= 2 AND
    char_length(phone) >= 10 AND
    char_length(service) >= 2
  );

-- Allow authenticated admin users full read access
CREATE POLICY "Allow authenticated staff to view all appointments"
  ON public.appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated staff to update appointment statuses
CREATE POLICY "Allow authenticated staff to update appointment status"
  ON public.appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
