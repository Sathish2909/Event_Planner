import type { Category } from './types';

export const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Concert / Festival',
  'Birthday / Private Party',
  'Conference / Seminar',
  'Product Launch',
  'Sports Event',
  'Other'
];

export const CATEGORY_META: Record<
  Category,
  { label: string; tagline: string }
> = {
  planner: {
    label: 'Event Planner',
    tagline: 'End-to-end planning, vendors, and on-ground coordination'
  },
  performer: {
    label: 'Performer',
    tagline: 'Bands, DJs, dancers, comedians, anchors and more'
  },
  crew: {
    label: 'Crew',
    tagline: 'Security, ushers, technical hands, hospitality and support staff'
  }
};

export const PLANNER_SERVICES = [
  'Catering',
  'Decoration & Styling',
  'Sound & Lighting',
  'Photography / Videography',
  'Anchor / MC',
  'Security Coordination',
  'Guest Logistics',
  'Permits & Compliance'
];

export const BUDGET_RANGES = [
  'Under ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000 – ₹7,00,000',
  '₹7,00,000 – ₹15,00,000',
  'Above ₹15,00,000',
  'To be discussed'
];

export const EXPERIENCE_LEVELS = ['Any experience level', 'Intermediate', 'Highly experienced only'];

export const PERFORMANCE_TYPES = [
  'Live Band',
  'DJ',
  'Dance Troupe',
  'Stand-up Comedy',
  'Magician',
  'Singer',
  'Anchor / MC',
  'Other'
];

export const PERFORMANCE_DURATIONS = ['Under 30 min', '30–60 min', '1–2 hours', '2+ hours'];

export const SOUND_REQUIREMENTS = ['Fully provided by venue', 'Performer brings own setup', 'Partial — needs discussion'];

export const STAGE_SIZES = ['Small (solo / duo)', 'Medium (band-sized)', 'Large (full production)'];

export const PERFORMER_EQUIPMENT = [
  'PA System',
  'Microphones',
  'Stage Lighting',
  'Instruments',
  'DJ Console',
  'Projector / Screen'
];

export const CREW_TYPES = [
  'Security',
  'Ushers / Hospitality',
  'Technical / AV',
  'Cleaning',
  'Backstage Support',
  'Volunteers / General Help'
];

export const UNIFORM_OPTIONS = ['Uniform provided by us', 'Crew to arrange own formal wear', 'No dress code'];

export const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'];

export const STEP_LABELS: Record<Category | 'default', { step2: string; step3: string }> = {
  default: { step2: 'Category Details', step3: 'Requirements' },
  planner: { step2: 'Planning Scope', step3: 'Planner Preferences' },
  performer: { step2: 'Performance Details', step3: 'Technical & Logistics' },
  crew: { step2: 'Crew Requirements', step3: 'Skills & Logistics' }
};
