export type Category = 'planner' | 'performer' | 'crew';

export interface EventBasics {
  eventName: string;
  eventType: string;
  isDateRange: boolean;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  category: Category | '';
}

export interface PlannerDetails {
  servicesNeeded: string[];
  estimatedBudget: string;
  expectedGuestCount: string;
  preferredTheme: string;
  planningExperienceLevel: string;
  additionalNotes: string;
}

export interface PerformerDetails {
  performanceType: string;
  genreOrStyle: string;
  performanceDuration: string;
  numberOfPerformers: string;
  soundSystemRequired: string;
  stageSizeNeeded: string;
  equipmentNeeded: string[];
  soundcheckTime: string;
  expectedAudienceSize: string;
}

export interface CrewDetails {
  crewType: string[];
  numberOfCrewNeeded: string;
  shiftStart: string;
  shiftEnd: string;
  uniformRequired: string;
  experienceLevel: string;
  languagePreferences: string[];
  specialInstructions: string;
}

export interface RequirementFormState {
  basics: EventBasics;
  plannerDetails: PlannerDetails;
  performerDetails: PerformerDetails;
  crewDetails: CrewDetails;
}

export const initialFormState: RequirementFormState = {
  basics: {
    eventName: '',
    eventType: '',
    isDateRange: false,
    startDate: '',
    endDate: '',
    location: '',
    venue: '',
    category: ''
  },
  plannerDetails: {
    servicesNeeded: [],
    estimatedBudget: '',
    expectedGuestCount: '',
    preferredTheme: '',
    planningExperienceLevel: '',
    additionalNotes: ''
  },
  performerDetails: {
    performanceType: '',
    genreOrStyle: '',
    performanceDuration: '',
    numberOfPerformers: '',
    soundSystemRequired: '',
    stageSizeNeeded: '',
    equipmentNeeded: [],
    soundcheckTime: '',
    expectedAudienceSize: ''
  },
  crewDetails: {
    crewType: [],
    numberOfCrewNeeded: '',
    shiftStart: '',
    shiftEnd: '',
    uniformRequired: '',
    experienceLevel: '',
    languagePreferences: [],
    specialInstructions: ''
  }
};

export interface StoredRequirement {
  _id: string;
  eventName: string;
  eventType: string;
  isDateRange: boolean;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: Category;
  plannerDetails?: PlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;
  status: string;
  createdAt: string;
  updatedAt: string;
}
