export type RequestStatus =
  | 'new'
  | 'under_review'
  | 'quotation_sent'
  | 'payment_received'
  | 'inspection_scheduled'
  | 'in_progress'
  | 'report_ready'
  | 'completed'

  
  | 'cancelled';

export type PaymentStatus =
  | 'unpaid'
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export interface ServiceRow {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  base_fee: number;
  pricing_type: 'fixed' | 'quote' | 'free';
  active: boolean;
  sort_order: number;
}

export interface RequestRow {
  id: string;
  reference: string;
  full_name: string;
  email: string;
  phone: string | null;
  service_id: string | null;
  service_name: string | null;
  property_type: string | null;
  property_address: string | null;
  property_purpose: string | null;
  property_size: string | null;
  notes: string | null;
  documents: { name: string; url: string; size?: number; type?: string }[];
  status: RequestStatus;
  quoted_amount: number | null;
  payment_link: string | null;
  payment_status: PaymentStatus;
  paystack_reference: string | null;
  amount_paid: number | null;
  paid_at: string | null;
  report_url: string | null;
  report_uploaded_at: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConsultationRow {
  id: string;
  reference: string;
  full_name: string;
  email: string;
  phone: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  topic: string | null;
  notes: string | null;
  fee: number;
  payment_status: PaymentStatus;
  paystack_reference: string | null;
  paid_at: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface PropertyRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  price_period: 'sale' | 'monthly' | 'yearly' | 'negotiable';
  location: string | null;
  city: string | null;
  state: string | null;
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  toilets: number | null;
  area_sqm: number | null;
  features: string[];
  images: string[];
  status: 'available' | 'sold' | 'rented' | 'pending';
  featured: boolean;
  created_at: string;
}
