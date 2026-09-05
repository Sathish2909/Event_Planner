import type { RequirementFormState, StoredRequirement } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

function toPayload(form: RequirementFormState) {
  const { basics } = form;

  return {
    eventName: basics.eventName,
    eventType: basics.eventType,
    isDateRange: basics.isDateRange,
    startDate: basics.startDate,
    endDate: basics.isDateRange ? basics.endDate : undefined,
    location: basics.location,
    venue: basics.venue || undefined,
    category: basics.category,
    plannerDetails: basics.category === 'planner' ? form.plannerDetails : undefined,
    performerDetails: basics.category === 'performer' ? form.performerDetails : undefined,
    crewDetails: basics.category === 'crew' ? form.crewDetails : undefined
  };
}

export async function submitRequirement(form: RequirementFormState): Promise<StoredRequirement> {
  const res = await fetch(`${API_URL}/api/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toPayload(form))
  });

  const json: ApiResponse<StoredRequirement> = await res.json();

  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.message || 'Something went wrong while submitting the requirement.');
  }

  return json.data;
}

export async function fetchRequirement(id: string): Promise<StoredRequirement> {
  const res = await fetch(`${API_URL}/api/requirements/${id}`);
  const json: ApiResponse<StoredRequirement> = await res.json();

  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.message || 'Could not load the saved requirement.');
  }

  return json.data;
}
