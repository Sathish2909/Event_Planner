'use client';

import { ChipMultiSelect, Field, PillRadioGroup, TextAreaField } from '../FieldPrimitives';
import { EXPERIENCE_LEVELS, LANGUAGES, UNIFORM_OPTIONS } from '@/lib/options';
import type { CrewDetails } from '@/lib/types';

interface Props {
  details: CrewDetails;
  onChange: (patch: Partial<CrewDetails>) => void;
  errors: Record<string, string>;
}

export default function CrewStep3({ details, onChange, errors }: Props) {
  function toggleLanguage(lang: string) {
    const next = details.languagePreferences.includes(lang)
      ? details.languagePreferences.filter((l) => l !== lang)
      : [...details.languagePreferences, lang];
    onChange({ languagePreferences: next });
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Skills & logistics</h2>
        <p className="mt-1 text-sm text-slate">Fine-tune who gets matched to this call.</p>
      </div>

      <Field label="Dress code" required error={errors.uniformRequired}>
        <PillRadioGroup options={UNIFORM_OPTIONS} value={details.uniformRequired} onChange={(v) => onChange({ uniformRequired: v })} />
      </Field>

      <Field label="Experience level required" required error={errors.experienceLevel}>
        <PillRadioGroup
          options={EXPERIENCE_LEVELS}
          value={details.experienceLevel}
          onChange={(v) => onChange({ experienceLevel: v })}
        />
      </Field>

      <Field label="Language preferences" hint="Optional — select any that matter">
        <ChipMultiSelect options={LANGUAGES} selected={details.languagePreferences} onToggle={toggleLanguage} />
      </Field>

      <Field label="Special instructions" htmlFor="specialInstructions" hint="Optional">
        <TextAreaField
          id="specialInstructions"
          value={details.specialInstructions}
          onChange={(v) => onChange({ specialInstructions: v })}
          placeholder="Briefing notes, physical requirements, reporting point, etc."
        />
      </Field>
    </div>
  );
}
