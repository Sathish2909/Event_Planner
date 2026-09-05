'use client';

import { Pencil, TriangleAlert } from 'lucide-react';
import { CATEGORY_META } from '@/lib/options';
import type { Category, RequirementFormState } from '@/lib/types';

interface Props {
  form: RequirementFormState;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex justify-between gap-6 py-2 text-sm">
      <span className="text-slate">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

function SectionCard({
  title,
  step,
  onEdit,
  children
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-line bg-surface px-5 py-4">
      <div className="flex items-center justify-between border-b border-line pb-2.5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="focus-ring flex items-center gap-1 rounded-sm text-xs font-medium text-teal hover:underline"
        >
          <Pencil size={12} /> Edit
        </button>
      </div>
      <div className="divide-y divide-line/70">{children}</div>
    </div>
  );
}

export default function ReviewStep({ form, onEdit, onSubmit, submitting, submitError }: Props) {
  const { basics, plannerDetails, performerDetails, crewDetails } = form;
  const category = basics.category as Category;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Review & submit</h2>
        <p className="mt-1 text-sm text-slate">Check everything looks right before it goes out.</p>
      </div>

      <SectionCard title="Event basics" step={1} onEdit={onEdit}>
        <Row label="Event name" value={basics.eventName} />
        <Row label="Event type" value={basics.eventType} />
        <Row label={basics.isDateRange ? 'Dates' : 'Date'} value={basics.isDateRange ? `${basics.startDate} → ${basics.endDate}` : basics.startDate} />
        <Row label="Location" value={basics.location} />
        <Row label="Venue" value={basics.venue} />
        <Row label="Posting for" value={category && CATEGORY_META[category]?.label} />
      </SectionCard>

      {category === 'planner' && (
        <>
          <SectionCard title="Planning scope" step={2} onEdit={onEdit}>
            <Row label="Services needed" value={plannerDetails.servicesNeeded.join(', ')} />
            <Row label="Estimated budget" value={plannerDetails.estimatedBudget} />
            <Row label="Expected guests" value={plannerDetails.expectedGuestCount} />
            <Row label="Preferred theme" value={plannerDetails.preferredTheme} />
          </SectionCard>
          <SectionCard title="Planner preferences" step={3} onEdit={onEdit}>
            <Row label="Experience level" value={plannerDetails.planningExperienceLevel} />
            <Row label="Additional notes" value={plannerDetails.additionalNotes} />
          </SectionCard>
        </>
      )}

      {category === 'performer' && (
        <>
          <SectionCard title="Performance details" step={2} onEdit={onEdit}>
            <Row label="Performance type" value={performerDetails.performanceType} />
            <Row label="Genre / style" value={performerDetails.genreOrStyle} />
            <Row label="Duration needed" value={performerDetails.performanceDuration} />
            <Row label="Performers needed" value={performerDetails.numberOfPerformers} />
          </SectionCard>
          <SectionCard title="Technical & logistics" step={3} onEdit={onEdit}>
            <Row label="Sound system" value={performerDetails.soundSystemRequired} />
            <Row label="Stage size" value={performerDetails.stageSizeNeeded} />
            <Row label="Equipment on-site" value={performerDetails.equipmentNeeded.join(', ')} />
            <Row label="Soundcheck time" value={performerDetails.soundcheckTime} />
            <Row label="Expected audience" value={performerDetails.expectedAudienceSize} />
          </SectionCard>
        </>
      )}

      {category === 'crew' && (
        <>
          <SectionCard title="Crew requirements" step={2} onEdit={onEdit}>
            <Row label="Crew type" value={crewDetails.crewType.join(', ')} />
            <Row label="Crew needed" value={crewDetails.numberOfCrewNeeded} />
            <Row label="Shift" value={crewDetails.shiftStart && crewDetails.shiftEnd ? `${crewDetails.shiftStart} – ${crewDetails.shiftEnd}` : ''} />
          </SectionCard>
          <SectionCard title="Skills & logistics" step={3} onEdit={onEdit}>
            <Row label="Dress code" value={crewDetails.uniformRequired} />
            <Row label="Experience level" value={crewDetails.experienceLevel} />
            <Row label="Languages" value={crewDetails.languagePreferences.join(', ')} />
            <Row label="Special instructions" value={crewDetails.specialInstructions} />
          </SectionCard>
        </>
      )}

      {submitError && (
        <div className="flex items-start gap-2.5 rounded-md border border-rose/40 bg-rose-soft px-4 py-3 text-sm text-rose">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="focus-ring mt-1 inline-flex items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? 'Posting requirement…' : 'Post requirement'}
      </button>
    </div>
  );
}
