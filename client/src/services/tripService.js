import { supabase } from "../lib/supabase";

// Create a new trip
export const createTrip = async (tripData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error("User not authenticated") };
  }

  const payload = { ...tripData, user_id: user.id };

  const { data, error } = await supabase
    .from("trips")
    .insert([payload])
    .select();
  return { data, error };
};

export const getDestinationImage = (destination, title) => {
  const query = `${destination || ''} ${title || ''}`.toLowerCase();
  
  if (query.includes('bali')) return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4';
  if (query.includes('dubai')) return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c';
  if (query.includes('switzerland') || query.includes('alps') || query.includes('zermatt')) return 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99';
  if (query.includes('tokyo') || query.includes('japan')) return 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf';
  if (query.includes('kerala')) return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944';
  if (query.includes('goa') || query.includes('beach')) return 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2';
  if (query.includes('paris')) return 'https://images.unsplash.com/photo-1502602898657-3e907611abf1';
  if (query.includes('london')) return 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad';
  if (query.includes('new york')) return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9';
  if (query.includes('manali')) return 'https://images.unsplash.com/photo-1605649487212-4733155ab2b9';
  
  // Default travel fallback
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828';
};

const hydrateImage = (trip) => {
  if (!trip) return trip;
  if (!trip.image || trip.image.trim() === '' || trip.image.includes('1488646953014-85cb44e25828')) {
    trip.image = getDestinationImage(trip.destination, trip.title);
  }
  return trip;
};

// Get all trips for the authenticated user
export const getTrips = async () => {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (data) {
    data.forEach(hydrateImage);
  }
  return { data, error };
};

// Get a single trip by ID
export const getTripById = async (id) => {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();
    
  if (data) {
    hydrateImage(data);
  }
  return { data, error };
};

// Update an existing trip
export const updateTrip = async (id, updates) => {
  const { data, error } = await supabase
    .from("trips")
    .update(updates)
    .eq("id", id)
    .select();
  return { data, error };
};

// Delete a trip
export const deleteTrip = async (id) => {
  const { data, error } = await supabase
    .from("trips")
    .delete()
    .eq("id", id);
  return { data, error };
};

// Auto-seed mock trips
export const seedInitialTrips = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: new Error("User not authenticated") };

  const today = new Date();
  
  const getFutureDate = (daysToAdd) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysToAdd);
    return d.toISOString().split('T')[0];
  };

  const mockTrips = [
    {
      title: 'Goa Beach Vacation',
      destination: 'Goa, India',
      description: 'A relaxing week by the beach, exploring shacks, seafood, and sunsets.',
      budget: 1200,
      start_date: getFutureDate(15),
      end_date: getFutureDate(22),
      is_public: true,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      user_id: user.id
    },
    {
      title: 'Kerala Backwaters',
      destination: 'Kerala, India',
      description: 'Cruising through the serene backwaters on a traditional houseboat.',
      budget: 1500,
      start_date: getFutureDate(30),
      end_date: getFutureDate(35),
      is_public: true,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
      user_id: user.id
    },
    {
      title: 'Paris Adventure',
      destination: 'Paris, France',
      description: 'Romantic getaway to see the Eiffel Tower, Louvre, and eat amazing pastries.',
      budget: 4500,
      start_date: getFutureDate(45),
      end_date: getFutureDate(52),
      is_public: false,
      image: 'https://images.unsplash.com/photo-1502602898657-3e907611abf1',
      user_id: user.id
    },
    {
      title: 'Tokyo Explorer',
      destination: 'Tokyo, Japan',
      description: 'Immersing in the neon-lit streets, sushi, and ancient temples.',
      budget: 5000,
      start_date: getFutureDate(60),
      end_date: getFutureDate(70),
      is_public: true,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      user_id: user.id
    },
    {
      title: 'Manali Winter Trip',
      destination: 'Manali, India',
      description: 'Snowboarding, sipping hot cocoa, and taking in the majestic Himalayas.',
      budget: 900,
      start_date: getFutureDate(90),
      end_date: getFutureDate(95),
      is_public: false,
      image: 'https://images.unsplash.com/photo-1605649487212-4733155ab2b9',
      user_id: user.id
    },
    {
      title: 'Bali Retreat',
      destination: 'Bali, Indonesia',
      description: 'Yoga, surfing, and exploring lush monkey forests.',
      budget: 2500,
      start_date: getFutureDate(110),
      end_date: getFutureDate(120),
      is_public: true,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      user_id: user.id
    },
    {
      title: 'Dubai Luxury Tour',
      destination: 'Dubai, UAE',
      description: 'Experiencing the Burj Khalifa, desert safaris, and luxury shopping.',
      budget: 6000,
      start_date: getFutureDate(140),
      end_date: getFutureDate(145),
      is_public: false,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      user_id: user.id
    },
    {
      title: 'Switzerland Alps Journey',
      destination: 'Zermatt, Switzerland',
      description: 'Taking the Glacier Express and admiring the mighty Matterhorn.',
      budget: 7000,
      start_date: getFutureDate(180),
      end_date: getFutureDate(190),
      is_public: true,
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99',
      user_id: user.id
    }
  ];

  const { data, error } = await supabase.from('trips').insert(mockTrips).select();
  return { data, error };
};