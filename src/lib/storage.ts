import { Lead } from './types';

const KEY = 'leadflow_leads';

export const getLeads = (): Lead[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) || '[]');
};

export const saveLeads = (leads: Lead[]) => {
  localStorage.setItem(KEY, JSON.stringify(leads));
};
