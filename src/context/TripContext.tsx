import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Trip, Destination, Activity, Accommodation, Transportation } from '../types';

interface TripContextType {
  trips: Trip[];
  currentTrip: Trip | null;
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  setCurrentTrip: (id: string | null) => void;
  addDestination: (tripId: string, destination: Omit<Destination, 'id'>) => void;
  updateDestination: (tripId: string, destination: Destination) => void;
  deleteDestination: (tripId: string, destinationId: string) => void;
  addActivity: (tripId: string, destinationId: string, activity: Omit<Activity, 'id'>) => void;
  updateActivity: (tripId: string, destinationId: string, activity: Activity) => void;
  deleteActivity: (tripId: string, destinationId: string, activityId: string) => void;
  updateAccommodation: (tripId: string, destinationId: string, accommodation: Accommodation | null) => void;
  updateTransportation: (tripId: string, destinationId: string, transportation: Transportation | null) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const SAMPLE_TRIPS: Trip[] = [
  {
    id: '1',
    title: 'European Adventure',
    startDate: '2023-06-15',
    endDate: '2023-06-30',
    destinations: [
      {
        id: 'd1',
        name: 'Paris, France',
        startDate: '2023-06-15',
        endDate: '2023-06-20',
        activities: [
          {
            id: 'a1',
            title: 'Visit Eiffel Tower',
            date: '2023-06-16',
            time: '10:00',
            location: 'Eiffel Tower',
            cost: 25,
            notes: 'Buy tickets in advance',
            booked: true
          },
          {
            id: 'a2',
            title: 'Louvre Museum',
            date: '2023-06-17',
            time: '13:00',
            location: 'Louvre Museum',
            cost: 15,
            notes: 'Spend at least 3 hours here',
            booked: true
          }
        ],
        accommodation: {
          id: 'acc1',
          name: 'Hotel de Paris',
          address: '123 Rue de Rivoli',
          checkIn: '2023-06-15',
          checkOut: '2023-06-20',
          cost: 800,
          bookingReference: 'PARIS123',
          notes: 'Breakfast included'
        },
        transportation: {
          id: 'tr1',
          type: 'flight',
          departureLocation: 'New York',
          arrivalLocation: 'Paris',
          departureDate: '2023-06-15',
          departureTime: '08:00',
          arrivalDate: '2023-06-15',
          arrivalTime: '20:00',
          cost: 600,
          bookingReference: 'FL123456',
          notes: 'Terminal 2E'
        },
        notes: 'Remember to bring adapter for French outlets'
      },
      {
        id: 'd2',
        name: 'Rome, Italy',
        startDate: '2023-06-21',
        endDate: '2023-06-30',
        activities: [
          {
            id: 'a3',
            title: 'Colosseum Tour',
            date: '2023-06-22',
            time: '09:00',
            location: 'Colosseum',
            cost: 20,
            notes: 'Guided tour in English',
            booked: true
          }
        ],
        accommodation: {
          id: 'acc2',
          name: 'Roma Luxe Hotel',
          address: '45 Via del Corso',
          checkIn: '2023-06-21',
          checkOut: '2023-06-30',
          cost: 950,
          bookingReference: 'ROME456',
          notes: 'City view room'
        },
        transportation: {
          id: 'tr2',
          type: 'train',
          departureLocation: 'Paris',
          arrivalLocation: 'Rome',
          departureDate: '2023-06-20',
          departureTime: '14:00',
          arrivalDate: '2023-06-21',
          arrivalTime: '10:00',
          cost: 150,
          bookingReference: 'TR789012',
          notes: 'First class seats'
        },
        notes: 'Learn basic Italian phrases'
      }
    ],
    budget: 3000,
    notes: 'First time in Europe!',
    coverImage: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Asian Expedition',
    startDate: '2023-09-10',
    endDate: '2023-09-25',
    destinations: [
      {
        id: 'd3',
        name: 'Tokyo, Japan',
        startDate: '2023-09-10',
        endDate: '2023-09-17',
        activities: [
          {
            id: 'a4',
            title: 'Tokyo Skytree',
            date: '2023-09-11',
            time: '16:00',
            location: 'Tokyo Skytree',
            cost: 30,
            notes: 'Sunset view recommended',
            booked: false
          }
        ],
        accommodation: {
          id: 'acc3',
          name: 'Shinjuku Grand Hotel',
          address: '1-5-8 Kabukicho, Shinjuku',
          checkIn: '2023-09-10',
          checkOut: '2023-09-17',
          cost: 700,
          bookingReference: 'TKY789',
          notes: 'Close to train station'
        },
        transportation: null,
        notes: 'Get Suica card for public transport'
      }
    ],
    budget: 4500,
    notes: 'Need to exchange currency',
    coverImage: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    const savedTrips = localStorage.getItem('trips');
    return savedTrips ? JSON.parse(savedTrips) : SAMPLE_TRIPS;
  });
  
  const [currentTrip, setCurrentTripState] = useState<Trip | null>(null);

  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip = { ...trip, id: uuidv4() };
    setTrips([...trips, newTrip]);
  };

  const updateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip));
    if (currentTrip?.id === updatedTrip.id) {
      setCurrentTripState(updatedTrip);
    }
  };

  const deleteTrip = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
    if (currentTrip?.id === id) {
      setCurrentTripState(null);
    }
  };

  const setCurrentTrip = (id: string | null) => {
    if (id === null) {
      setCurrentTripState(null);
    } else {
      const trip = trips.find(t => t.id === id) || null;
      setCurrentTripState(trip);
    }
  };

  const addDestination = (tripId: string, destination: Omit<Destination, 'id'>) => {
    const newDestination = { ...destination, id: uuidv4(), activities: [] };
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: [...trip.destinations, newDestination]
        };
      }
      return trip;
    }));
  };

  const updateDestination = (tripId: string, updatedDestination: Destination) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: trip.destinations.map(dest => 
            dest.id === updatedDestination.id ? updatedDestination : dest
          )
        };
      }
      return trip;
    }));
  };

  const deleteDestination = (tripId: string, destinationId: string) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: trip.destinations.filter(dest => dest.id !== destinationId)
        };
      }
      return trip;
    }));
  };

  const addActivity = (tripId: string, destinationId: string, activity: Omit<Activity, 'id'>) => {
    const newActivity = { ...activity, id: uuidv4() };
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: trip.destinations.map(dest => {
            if (dest.id === destinationId) {
              return {
                ...dest,
                activities: [...dest.activities, newActivity]
              };
            }
            return dest;
          })
        };
      }
      return trip;
    }));
  };

  const updateActivity = (tripId: string, destinationId: string, updatedActivity: Activity) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: trip.destinations.map(dest => {
            if (dest.id === destinationId) {
              return {
                ...dest,
                activities: dest.activities.map(act => 
                  act.id === updatedActivity.id ? updatedActivity : act
                )
              };
            }
            return dest;
          })
        };
      }
      return trip;
    }));
  };

  const deleteActivity = (tripId: string, destinationId: string, activityId: string) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: trip.destinations.map(dest => {
            if (dest.id === destinationId) {
              return {
                ...dest,
                activities: dest.activities.filter(act => act.id !== activityId)
              };
            }
            return dest;
          })
        };
      }
      return trip;
    }));
  };

  const updateAccommodation = (tripId: string, destinationId: string, accommodation: Accommodation | null) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: trip.destinations.map(dest => {
            if (dest.id === destinationId) {
              return {
                ...dest,
                accommodation: accommodation ? { ...accommodation, id: accommodation.id || uuidv4() } : null
              };
            }
            return dest;
          })
        };
      }
      return trip;
    }));
  };

  const updateTransportation = (tripId: string, destinationId: string, transportation: Transportation | null) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          destinations: trip.destinations.map(dest => {
            if (dest.id === destinationId) {
              return {
                ...dest,
                transportation: transportation ? { ...transportation, id: transportation.id || uuidv4() } : null
              };
            }
            return dest;
          })
        };
      }
      return trip;
    }));
  };

  return (
    <TripContext.Provider value={{
      trips,
      currentTrip,
      addTrip,
      updateTrip,
      deleteTrip,
      setCurrentTrip,
      addDestination,
      updateDestination,
      deleteDestination,
      addActivity,
      updateActivity,
      deleteActivity,
      updateAccommodation,
      updateTransportation
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
