'use client';

import { Field, PillRadioGroup, TextAreaField } from '../FieldPrimitives';
import { EXPERIENCE_LEVELS } from '@/lib/options';
import type { PlannerDetails } from '@/lib/types';

interface Props {
  details: PlannerDetails;
  onChange: (patch: Partial<PlannerDetails>) => void;
  errors: Record<string, string>;
}

export default function PlannerStep3({ details, onChange, errors }: Props) {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Planner preferences</h2>
        <p className="mt-1 text-sm text-slate">A few last details before we match you with planners.</p>
      </div>

      <Field label="Experience level required" required error={errors.planningExperienceLevel}>
        <PillRadioGroup
          options={EXPERIENCE_LEVELS}
          value={details.planningExperienceLevel}
          onChange={(v) => onChange({ planningExperienceLevel: v })}
        />
      </Field>

      <Field label="Anything else the planner should know?" htmlFor="additionalNotes" hint="Optional">
        <TextAreaField
          id="additionalNotes"
          value={details.additionalNotes}
          onChange={(v) => onChange({ additionalNotes: v })}
          placeholder="Special requirements, past vendors to avoid, must-have moments, etc."
        />
      </Field>
    </div>
  );
}
