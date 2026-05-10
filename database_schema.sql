-- ==========================================
-- TravelLoop Database Schema (Supabase)
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TRIPS TABLE
CREATE TABLE trips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    destination VARCHAR(255),
    description TEXT,
    budget NUMERIC(10, 2) DEFAULT 0.00,
    start_date DATE,
    end_date DATE,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. STOPS TABLE
CREATE TABLE stops (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    destination VARCHAR(255) NOT NULL,
    arrival_date DATE,
    departure_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. ACTIVITIES TABLE
CREATE TABLE activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    stop_id UUID REFERENCES stops(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cost NUMERIC(10, 2) DEFAULT 0.00,
    duration VARCHAR(100), -- e.g., '2 hours'
    category VARCHAR(100), -- e.g., 'Food', 'Sightseeing'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. PACKING ITEMS TABLE
CREATE TABLE packing_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    is_packed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;

-- TRIPS POLICIES
-- Users can insert their own trips
CREATE POLICY "Users can create their own trips" 
ON trips FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can view their own trips OR public trips
CREATE POLICY "Users can view own or public trips" 
ON trips FOR SELECT 
USING (auth.uid() = user_id OR is_public = true);

-- Users can update their own trips
CREATE POLICY "Users can update their own trips" 
ON trips FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own trips
CREATE POLICY "Users can delete their own trips" 
ON trips FOR DELETE 
USING (auth.uid() = user_id);


-- STOPS POLICIES
-- Users can manage stops for their own trips
CREATE POLICY "Users can manage stops of their trips" 
ON stops FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM trips 
    WHERE trips.id = stops.trip_id 
    AND trips.user_id = auth.uid()
  )
);
-- Allow public viewing of stops for public trips
CREATE POLICY "Public can view stops of public trips" 
ON stops FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM trips 
    WHERE trips.id = stops.trip_id 
    AND trips.is_public = true
  )
);

-- ACTIVITIES POLICIES
-- Users can manage activities for their own trips
CREATE POLICY "Users can manage activities of their trips" 
ON activities FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM stops 
    JOIN trips ON trips.id = stops.trip_id
    WHERE stops.id = activities.stop_id 
    AND trips.user_id = auth.uid()
  )
);
-- Allow public viewing of activities for public trips
CREATE POLICY "Public can view activities of public trips" 
ON activities FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM stops 
    JOIN trips ON trips.id = stops.trip_id
    WHERE stops.id = activities.stop_id 
    AND trips.is_public = true
  )
);

-- PACKING ITEMS POLICIES
-- Only the owner can manage and view packing items
CREATE POLICY "Users can manage packing items of their trips" 
ON packing_items FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM trips 
    WHERE trips.id = packing_items.trip_id 
    AND trips.user_id = auth.uid()
  )
);
