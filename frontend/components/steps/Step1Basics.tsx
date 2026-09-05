'use client';

import clsx from 'clsx';
import { ClipboardList, HardHat, Mic2 } from 'lucide-react';
import { Field, SelectField, TextField } from '../FieldPrimitives';
import { CATEGORY_META, EVENT_TYPES } from '@/lib/options';
import type { Category, EventBasics } from '@/lib/types';

const CATEGORY_ICONS: Record<Category, typeof ClipboardList> = {
  planner: ClipboardList,
  performer: Mic2,
  crew: HardHat
};

interface Step1Props {
  basics: EventBasics;
  onChange: (patch: Partial<EventBasics>) => void;
  errors: Record<string, string>;
}

export default function Step1Basics({ basics, onChange, errors }: Step1Props) {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Event basics</h2>
        <p className="mt-1 text-sm text-slate">Tell us what the event is and where it's happening.</p>
      </div>

      <Field label="Event name" htmlFor="eventName" required error={errors.eventName}>
        <TextField
          id="eventName"
          value={basics.eventName}
          onChange={(v) => onChange({ eventName: v })}
          placeholder="e.g. Kavya & Arjun's Wedding Reception"
        />
      </Field>

      <Field label="Event type" htmlFor="eventType" required error={errors.eventType}>
        <SelectField
          id="eventType"
          value={basics.eventType}
          onChange={(v) => onChange({ eventType: v })}
          options={EVENT_TYPES}
          placeholder="Choose the type of event"
        />
      </Field>

      <div className="flex flex-col gap-3">
        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-ink">
          <input
            type="checkbox"
            checked={basics.isDateRange}
            onChange={(e) => onChange({ isDateRange: e.target.checked })}
            className="focus-ring h-4 w-4 rounded-sm border-line text-amber-dark accent-amber-dark"
          />
          This event spans multiple days
        </label>

        <div className={clsx('grid gap-4', basics.isDateRange ? 'grid-cols-2' : 'grid-cols-1')}>
          <Field
            label={basics.isDateRange ? 'Start date' : 'Event date'}
            htmlFor="startDate"
            required
            error={errors.startDate}
          >
            <TextField id="startDate" type="date" value={basics.startDate} onChange={(v) => onChange({ startDate: v })} />
          </Field>
          {basics.isDateRange && (
            <Field label="End date" htmlFor="endDate" required error={errors.endDate}>
              <TextField id="endDate" type="date" value={basics.endDate} onChange={(v) => onChange({ endDate: v })} />
            </Field>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location" htmlFor="location" required error={errors.location} hint="City or area">
          <TextField id="location" value={basics.location} onChange={(v) => onChange({ location: v })} placeholder="e.g. Bengaluru" />
        </Field>
        <Field label="Venue" htmlFor="venue" hint="Optional">
          <TextField id="venue" value={basics.venue} onChange={(v) => onChange({ venue: v })} placeholder="e.g. The Leela Palace" />
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm font-medium text-ink">
            Who are you posting this for? <span className="text-rose">*</span>
          </p>
          <p className="mt-0.5 text-xs text-slate">This decides which questions come next.</p>
        </div>
        {errors.category && <p className="text-xs text-rose">{errors.category}</p>}

        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(CATEGORY_META) as Category[]).map((key) => {
            const meta = CATEGORY_META[key];
            const Icon = CATEGORY_ICONS[key];
            const active = basics.category === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange({ category: key })}
                aria-pressed={active}
                className={clsx(
                  'focus-ring flex flex-col items-start gap-2.5 rounded-md border px-4 py-4 text-left transition-colors',
                  active ? 'border-amber-dark bg-amber-soft' : 'border-line bg-surface hover:border-slate-light'
                )}
              >
                <span
                  className={clsx(
                    'flex h-9 w-9 items-center justify-center rounded-sm',
                    active ? 'bg-amber-dark text-white' : 'bg-paper text-ink'
                  )}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="font-display text-[15px] font-semibold text-ink">{meta.label}</span>
                <span className="text-xs leading-snug text-slate">{meta.tagline}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
