'use client';

import { ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const inputBase =
  'w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-[15px] text-ink placeholder:text-slate-light transition-colors focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/25 disabled:bg-paper disabled:text-slate-light';

interface WrapperProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function Field({ label, htmlFor, hint, error, required, children }: WrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-rose"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate">{hint}</p>}
      {error && <p className="text-xs text-rose">{error}</p>}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'time' | 'number';
}

export function TextField({ id, value, onChange, placeholder, type = 'text' }: TextFieldProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(inputBase, 'focus-ring')}
    />
  );
}

interface TextAreaFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextAreaField({ id, value, onChange, placeholder, rows = 3 }: TextAreaFieldProps) {
  return (
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(inputBase, 'resize-none focus-ring')}
    />
  );
}

interface SelectFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function SelectField({ id, value, onChange, options, placeholder = 'Select an option' }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(inputBase, 'focus-ring appearance-none pr-9')}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate"
      />
    </div>
  );
}

interface ChipMultiSelectProps {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}

export function ChipMultiSelect({ options, selected, onToggle }: ChipMultiSelectProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={active}
            className={clsx(
              'focus-ring inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors',
              active
                ? 'border-teal bg-teal-soft text-teal'
                : 'border-line bg-surface text-ink hover:border-slate-light'
            )}
          >
            {active && <Check size={14} strokeWidth={2.5} />}
            {option}
          </button>
        );
      })}
    </div>
  );
}

interface PillRadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function PillRadioGroup({ options, value, onChange }: PillRadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={clsx(
              'focus-ring rounded-md border px-3 py-1.5 text-sm transition-colors',
              active ? 'border-amber-dark bg-amber-soft text-ink' : 'border-line bg-surface text-ink hover:border-slate-light'
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
