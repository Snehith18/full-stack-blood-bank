export interface User {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'recipient' | 'admin';
  phone: string;
  address: string;
  bloodType: BloodType;
  dateOfBirth?: string;
  createdAt: string;
}

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface BloodRequest {
  id: string;
  recipientId: string;
  recipientName: string;
  bloodType: BloodType;
  unitsNeeded: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  hospitalName: string;
  hospitalAddress: string;
  contactNumber: string;
  medicalReason: string;
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected';
  requestDate: string;
  requiredBy: string;
  notes?: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  bloodType: BloodType;
  unitsCollected: number;
  donationDate: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  nextEligibleDate: string;
  healthChecked: boolean;
  notes?: string;
}

export interface BloodInventory {
  bloodType: BloodType;
  unitsAvailable: number;
  unitsReserved: number;
  expiryDates: string[];
  lastUpdated: string;
  location: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}