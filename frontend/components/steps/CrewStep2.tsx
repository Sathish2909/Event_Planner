'use client';

import { ChipMultiSelect, Field, TextField } from '../FieldPrimitives';
import { CREW_TYPES } from '@/lib/options';
import type { CrewDetails } from '@/lib/types';

interface Props {
  details: CrewDetails;
  onChange: (patch: Partial<CrewDetails>) => void;
  errors: Record<string, string>;
}

export default function CrewStep2({ details, onChange, errors }: Props) {
  function toggleCrewType(type: string) {
    const next = details.crewType.includes(type)
      ? details.crewType.filter((c) => c !== type)
      : [...details.crewType, type];
    onChange({ crewType: next });
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Crew requirements</h2>
        <p className="mt-1 text-sm text-slate">What kind of on-ground support do you need?</p>
      </div>

      <Field label="Crew type" required error={errors.crewType} hint="Select everything that applies">
        <ChipMultiSelect options={CREW_TYPES} selected={details.crewType} onToggle={toggleCrewType} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Number of crew needed" htmlFor="numberOfCrewNeeded" required error={errors.numberOfCrewNeeded}>
          <TextField
            id="numberOfCrewNeeded"
            type="number"
            value={details.numberOfCrewNeeded}
            onChange={(v) => onChange({ numberOfCrewNeeded: v })}
            placeholder="e.g. 12"
          />
        </Field>
        <Field label="Shift start" htmlFor="shiftStart" required error={errors.shiftStart}>
          <TextField id="shiftStart" type="time" value={details.shiftStart} onChange={(v) => onChange({ shiftStart: v })} />
        </Field>
        <Field label="Shift end" htmlFor="shiftEnd" required error={errors.shiftEnd}>
          <TextField id="shiftEnd" type="time" value={details.shiftEnd} onChange={(v) => onChange({ shiftEnd: v })} />
        </Field>
      </div>
    </div>
  );
}
