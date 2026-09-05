'use client';

import clsx from 'clsx';
import { Check } from 'lucide-react';

interface StepRailProps {
  labels: string[];
  currentStep: number;
}

export default function StepRail({ labels, currentStep }: StepRailProps) {
  return (
    <>
      {/* Desktop: dark running-order spine */}
      <aside className="hidden w-64 shrink-0 bg-ink px-8 py-12 text-paper md:block">
        <p className="font-mono text-xs uppercase tracking-wider text-amber">Requirement · Posting</p>
        <h1 className="mt-3 font-display text-2xl font-semibold leading-tight">Running order</h1>
        <ol className="mt-10 flex flex-col gap-7">
          {labels.map((label, index) => {
            const stepNumber = index + 1;
            const state = stepNumber < currentStep ? 'done' : stepNumber === currentStep ? 'active' : 'upcoming';
            return (
              <li key={label} className="flex items-start gap-3">
                <span
                  className={clsx(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm font-mono text-xs',
                    state === 'done' && 'bg-amber text-ink',
                    state === 'active' && 'border border-amber text-amber',
                    state === 'upcoming' && 'border border-white/20 text-white/40'
                  )}
                >
                  {state === 'done' ? <Check size={13} strokeWidth={3} /> : stepNumber}
                </span>
                <span
                  className={clsx(
                    'text-sm leading-6',
                    state === 'upcoming' ? 'text-white/40' : 'text-paper/90',
                    state === 'active' && 'font-medium text-paper'
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Mobile: horizontal progress bar */}
      <div className="border-b border-line bg-ink px-5 pb-4 pt-6 text-paper md:hidden">
        <p className="font-mono text-[11px] uppercase tracking-wider text-amber">
          Step {currentStep} of {labels.length}
        </p>
        <p className="mt-1 font-display text-lg font-semibold">{labels[currentStep - 1]}</p>
        <div className="mt-3 flex gap-1.5">
          {labels.map((label, index) => (
            <span
              key={label}
              className={clsx(
                'h-1 flex-1 rounded-full',
                index + 1 <= currentStep ? 'bg-amber' : 'bg-white/15'
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
