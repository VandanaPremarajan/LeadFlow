export type LeadStatus = 'New' | 'Contacted' | 'Converted';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  createdAt?: string; //optional
}
