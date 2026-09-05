'use client';

import { ChipMultiSelect, Field, SelectField, TextField } from '../FieldPrimitives';
import { BUDGET_RANGES, PLANNER_SERVICES } from '@/lib/options';
import type { PlannerDetails } from '@/lib/types';

interface Props {
  details: PlannerDetails;
  onChange: (patch: Partial<PlannerDetails>) => void;
  errors: Record<string, string>;
}

export default function PlannerStep2({ details, onChange, errors }: Props) {
  function toggleService(service: string) {
    const next = details.servicesNeeded.includes(service)
      ? details.servicesNeeded.filter((s) => s !== service)
      : [...details.servicesNeeded, service];
    onChange({ servicesNeeded: next });
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Planning scope</h2>
        <p className="mt-1 text-sm text-slate">What should the planner take ownership of?</p>
      </div>

      <Field label="Services needed" required error={errors.servicesNeeded} hint="Select everything that applies">
        <ChipMultiSelect options={PLANNER_SERVICES} selected={details.servicesNeeded} onToggle={toggleService} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Estimated budget" htmlFor="estimatedBudget" required error={errors.estimatedBudget}>
          <SelectField
            id="estimatedBudget"
            value={details.estimatedBudget}
            onChange={(v) => onChange({ estimatedBudget: v })}
            options={BUDGET_RANGES}
            placeholder="Select a budget range"
          />
        </Field>
        <Field label="Expected guest count" htmlFor="expectedGuestCount" error={errors.expectedGuestCount}>
          <TextField
            id="expectedGuestCount"
            type="number"
            value={details.expectedGuestCount}
            onChange={(v) => onChange({ expectedGuestCount: v })}
            placeholder="e.g. 250"
          />
        </Field>
      </div>

      <Field label="Preferred theme or style" htmlFor="preferredTheme" hint="Optional">
        <TextField
          id="preferredTheme"
          value={details.preferredTheme}
          onChange={(v) => onChange({ preferredTheme: v })}
          placeholder="e.g. Minimal, floral, traditional"
        />
      </Field>
    </div>
  );
}
