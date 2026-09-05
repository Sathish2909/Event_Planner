'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchRequirement } from '@/lib/api';
import { CATEGORY_META } from '@/lib/options';
import type { StoredRequirement } from '@/lib/types';

interface Props {
  requirementId: string;
  onPostAnother: () => void;
}

export default function SuccessScreen({ requirementId, onPostAnother }: Props) {
  const [record, setRecord] = useState<StoredRequirement | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchRequirement(requirementId)
      .then((data) => {
        if (!cancelled) setRecord(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : 'Could not reload the saved record.');
      });
    return () => {
      cancelled = true;
    };
  }, [requirementId]);

  return (
    <div className="step-enter flex flex-col items-center gap-6 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-soft text-teal">
        <CheckCircle2 size={30} strokeWidth={2} />
      </span>

      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Requirement posted</h2>
        <p className="mt-1 text-sm text-slate">
          Saved to the {record ? CATEGORY_META[record.category].label.toLowerCase() : ''} queue and ready to be matched.
        </p>
      </div>

      <div className="w-full max-w-sm rounded-md border border-line bg-surface px-5 py-4 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-slate">Reference</span>
          <span className="font-mono text-xs text-ink">{requirementId}</span>
        </div>
        {record && (
          <>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate">Category</span>
              <span className="text-xs font-medium text-ink">{CATEGORY_META[record.category].label}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate">Stored at</span>
              <span className="text-xs font-medium text-ink">{new Date(record.createdAt).toLocaleString()}</span>
            </div>
          </>
        )}
      </div>

      {loadError && <p className="text-xs text-rose">{loadError}</p>}

      {record && (
        <div className="w-full max-w-sm text-left">
          <button
            type="button"
            onClick={() => setShowRaw((v) => !v)}
            className="focus-ring flex w-full items-center justify-between rounded-md border border-line bg-surface px-4 py-2.5 text-xs font-medium text-ink"
          >
            View stored document
            {showRaw ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showRaw && (
            <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-ink px-4 py-3 font-mono text-[11px] leading-relaxed text-paper/90">
              {JSON.stringify(record, null, 2)}
            </pre>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onPostAnother}
        className="focus-ring rounded-md border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Post another requirement
      </button>
    </div>
  );
}
