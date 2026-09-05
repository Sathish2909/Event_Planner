'use client';

import { ChipMultiSelect, Field, PillRadioGroup, TextField } from '../FieldPrimitives';
import { PERFORMER_EQUIPMENT, SOUND_REQUIREMENTS, STAGE_SIZES } from '@/lib/options';
import type { PerformerDetails } from '@/lib/types';

interface Props {
  details: PerformerDetails;
  onChange: (patch: Partial<PerformerDetails>) => void;
  errors: Record<string, string>;
}

export default function PerformerStep3({ details, onChange, errors }: Props) {
  function toggleEquipment(item: string) {
    const next = details.equipmentNeeded.includes(item)
      ? details.equipmentNeeded.filter((e) => e !== item)
      : [...details.equipmentNeeded, item];
    onChange({ equipmentNeeded: next });
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Technical & logistics</h2>
        <p className="mt-1 text-sm text-slate">Help performers understand what's on-site.</p>
      </div>

      <Field label="Sound system" required error={errors.soundSystemRequired}>
        <PillRadioGroup
          options={SOUND_REQUIREMENTS}
          value={details.soundSystemRequired}
          onChange={(v) => onChange({ soundSystemRequired: v })}
        />
      </Field>

      <Field label="Stage size needed" required error={errors.stageSizeNeeded}>
        <PillRadioGroup options={STAGE_SIZES} value={details.stageSizeNeeded} onChange={(v) => onChange({ stageSizeNeeded: v })} />
      </Field>

      <Field label="Equipment expected on-site" hint="Select everything already available at the venue">
        <ChipMultiSelect options={PERFORMER_EQUIPMENT} selected={details.equipmentNeeded} onToggle={toggleEquipment} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Soundcheck time" htmlFor="soundcheckTime" hint="Optional">
          <TextField id="soundcheckTime" type="time" value={details.soundcheckTime} onChange={(v) => onChange({ soundcheckTime: v })} />
        </Field>
        <Field label="Expected audience size" htmlFor="expectedAudienceSize" hint="Optional">
          <TextField
            id="expectedAudienceSize"
            type="number"
            value={details.expectedAudienceSize}
            onChange={(v) => onChange({ expectedAudienceSize: v })}
            placeholder="e.g. 500"
          />
        </Field>
      </div>
    </div>
  );
}
