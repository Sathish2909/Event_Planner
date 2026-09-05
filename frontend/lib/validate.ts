import type { CrewDetails, EventBasics, PerformerDetails, PlannerDetails } from './types';

type Errors = Record<string, string>;

export function validateBasics(basics: EventBasics): Errors {
  const errors: Errors = {};
  if (!basics.eventName.trim()) errors.eventName = 'Give the event a name.';
  if (!basics.eventType) errors.eventType = 'Choose an event type.';
  if (!basics.startDate) errors.startDate = basics.isDateRange ? 'Pick a start date.' : 'Pick a date.';
  if (basics.isDateRange && !basics.endDate) errors.endDate = 'Pick an end date.';
  if (basics.isDateRange && basics.startDate && basics.endDate && basics.endDate < basics.startDate) {
    errors.endDate = 'End date should be on or after the start date.';
  }
  if (!basics.location.trim()) errors.location = 'Add a location.';
  if (!basics.category) errors.category = 'Choose who this requirement is for.';
  return errors;
}

export function validatePlannerStep2(details: PlannerDetails): Errors {
  const errors: Errors = {};
  if (details.servicesNeeded.length === 0) errors.servicesNeeded = 'Select at least one service.';
  if (!details.estimatedBudget) errors.estimatedBudget = 'Pick a budget range.';
  return errors;
}

export function validatePlannerStep3(details: PlannerDetails): Errors {
  const errors: Errors = {};
  if (!details.planningExperienceLevel) errors.planningExperienceLevel = 'Choose an experience level.';
  return errors;
}

export function validatePerformerStep2(details: PerformerDetails): Errors {
  const errors: Errors = {};
  if (!details.performanceType) errors.performanceType = 'Choose a performance type.';
  if (!details.performanceDuration) errors.performanceDuration = 'Choose an expected duration.';
  return errors;
}

export function validatePerformerStep3(details: PerformerDetails): Errors {
  const errors: Errors = {};
  if (!details.soundSystemRequired) errors.soundSystemRequired = 'Let performers know about sound.';
  if (!details.stageSizeNeeded) errors.stageSizeNeeded = 'Choose a stage size.';
  return errors;
}

export function validateCrewStep2(details: CrewDetails): Errors {
  const errors: Errors = {};
  if (details.crewType.length === 0) errors.crewType = 'Select at least one crew type.';
  if (!details.numberOfCrewNeeded) errors.numberOfCrewNeeded = 'How many crew members do you need?';
  if (!details.shiftStart) errors.shiftStart = 'Set a shift start time.';
  if (!details.shiftEnd) errors.shiftEnd = 'Set a shift end time.';
  return errors;
}

export function validateCrewStep3(details: CrewDetails): Errors {
  const errors: Errors = {};
  if (!details.uniformRequired) errors.uniformRequired = 'Choose a dress code.';
  if (!details.experienceLevel) errors.experienceLevel = 'Choose an experience level.';
  return errors;
}
