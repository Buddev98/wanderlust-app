export interface Trip {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  destinations: Destination[];
  budget: number;
  notes: string;
  coverImage: string;
}

export interface Destination {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
  accommodation: Accommodation | null;
  transportation: Transportation | null;
  notes: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  cost: number;
  notes: string;
  booked: boolean;
}

export interface Accommodation {
  id: string;
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  cost: number;
  bookingReference: string;
  notes: string;
}

export interface Transportation {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'other';
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  cost: number;
  bookingReference: string;
  notes: string;
}
