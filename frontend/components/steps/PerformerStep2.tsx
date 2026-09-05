'use client';

import { Field, SelectField, TextField } from '../FieldPrimitives';
import { PERFORMANCE_DURATIONS, PERFORMANCE_TYPES } from '@/lib/options';
import type { PerformerDetails } from '@/lib/types';

interface Props {
  details: PerformerDetails;
  onChange: (patch: Partial<PerformerDetails>) => void;
  errors: Record<string, string>;
}

export default function PerformerStep2({ details, onChange, errors }: Props) {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Performance details</h2>
        <p className="mt-1 text-sm text-slate">What kind of act are you looking to book?</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Performance type" htmlFor="performanceType" required error={errors.performanceType}>
          <SelectField
            id="performanceType"
            value={details.performanceType}
            onChange={(v) => onChange({ performanceType: v })}
            options={PERFORMANCE_TYPES}
            placeholder="Select a performance type"
          />
        </Field>
        <Field label="Genre or style" htmlFor="genreOrStyle" hint="Optional">
          <TextField
            id="genreOrStyle"
            value={details.genreOrStyle}
            onChange={(v) => onChange({ genreOrStyle: v })}
            placeholder="e.g. Bollywood, jazz, classical"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Performance duration needed" htmlFor="performanceDuration" required error={errors.performanceDuration}>
          <SelectField
            id="performanceDuration"
            value={details.performanceDuration}
            onChange={(v) => onChange({ performanceDuration: v })}
            options={PERFORMANCE_DURATIONS}
            placeholder="Select expected duration"
          />
        </Field>
        <Field label="Number of performers needed" htmlFor="numberOfPerformers" error={errors.numberOfPerformers}>
          <TextField
            id="numberOfPerformers"
            type="number"
            value={details.numberOfPerformers}
            onChange={(v) => onChange({ numberOfPerformers: v })}
            placeholder="e.g. 4"
          />
        </Field>
      </div>
    </div>
  );
}
