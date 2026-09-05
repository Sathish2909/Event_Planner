'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StepRail from './StepRail';
import SuccessScreen from './SuccessScreen';
import Step1Basics from './steps/Step1Basics';
import PlannerStep2 from './steps/PlannerStep2';
import PlannerStep3 from './steps/PlannerStep3';
import PerformerStep2 from './steps/PerformerStep2';
import PerformerStep3 from './steps/PerformerStep3';
import CrewStep2 from './steps/CrewStep2';
import CrewStep3 from './steps/CrewStep3';
import ReviewStep from './steps/ReviewStep';
import { submitRequirement } from '@/lib/api';
import { STEP_LABELS } from '@/lib/options';
import { initialFormState, type RequirementFormState } from '@/lib/types';
import {
  validateBasics,
  validateCrewStep2,
  validateCrewStep3,
  validatePerformerStep2,
  validatePerformerStep3,
  validatePlannerStep2,
  validatePlannerStep3
} from '@/lib/validate';

export default function RequirementWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RequirementFormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const category = form.basics.category;
  const stepLabels = STEP_LABELS[category || 'default'];
  const labels = useMemo(
    () => ['Event Basics', stepLabels.step2, stepLabels.step3, 'Review & Submit'],
    [stepLabels]
  );

  function updateBasics(patch: Partial<RequirementFormState['basics']>) {
    setForm((f) => ({ ...f, basics: { ...f.basics, ...patch } }));
  }
  function updatePlanner(patch: Partial<RequirementFormState['plannerDetails']>) {
    setForm((f) => ({ ...f, plannerDetails: { ...f.plannerDetails, ...patch } }));
  }
  function updatePerformer(patch: Partial<RequirementFormState['performerDetails']>) {
    setForm((f) => ({ ...f, performerDetails: { ...f.performerDetails, ...patch } }));
  }
  function updateCrew(patch: Partial<RequirementFormState['crewDetails']>) {
    setForm((f) => ({ ...f, crewDetails: { ...f.crewDetails, ...patch } }));
  }

  function validateCurrentStep(): boolean {
    let stepErrors: Record<string, string> = {};

    if (step === 1) stepErrors = validateBasics(form.basics);
    else if (step === 2) {
      if (category === 'planner') stepErrors = validatePlannerStep2(form.plannerDetails);
      if (category === 'performer') stepErrors = validatePerformerStep2(form.performerDetails);
      if (category === 'crew') stepErrors = validateCrewStep2(form.crewDetails);
    } else if (step === 3) {
      if (category === 'planner') stepErrors = validatePlannerStep3(form.plannerDetails);
      if (category === 'performer') stepErrors = validatePerformerStep3(form.performerDetails);
      if (category === 'crew') stepErrors = validateCrewStep3(form.crewDetails);
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  function handleNext() {
    if (!validateCurrentStep()) return;
    setStep((s) => Math.min(s + 1, 4));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleEdit(targetStep: number) {
    setErrors({});
    setStep(targetStep);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const saved = await submitRequirement(form);
      setSavedId(saved._id);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handlePostAnother() {
    setForm(initialFormState);
    setErrors({});
    setSubmitError(null);
    setSavedId(null);
    setStep(1);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col md:flex-row">
      {!savedId && <StepRail labels={labels} currentStep={step} />}

      <div className="flex-1 px-5 py-10 md:px-16 md:py-16">
        <div key={savedId ? 'success' : step} className="step-enter mx-auto max-w-content">
          {savedId ? (
            <SuccessScreen requirementId={savedId} onPostAnother={handlePostAnother} />
          ) : (
            <>
              {step === 1 && <Step1Basics basics={form.basics} onChange={updateBasics} errors={errors} />}

              {step === 2 && category === 'planner' && (
                <PlannerStep2 details={form.plannerDetails} onChange={updatePlanner} errors={errors} />
              )}
              {step === 2 && category === 'performer' && (
                <PerformerStep2 details={form.performerDetails} onChange={updatePerformer} errors={errors} />
              )}
              {step === 2 && category === 'crew' && (
                <CrewStep2 details={form.crewDetails} onChange={updateCrew} errors={errors} />
              )}

              {step === 3 && category === 'planner' && (
                <PlannerStep3 details={form.plannerDetails} onChange={updatePlanner} errors={errors} />
              )}
              {step === 3 && category === 'performer' && (
                <PerformerStep3 details={form.performerDetails} onChange={updatePerformer} errors={errors} />
              )}
              {step === 3 && category === 'crew' && (
                <CrewStep3 details={form.crewDetails} onChange={updateCrew} errors={errors} />
              )}

              {step === 4 && (
                <>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="focus-ring mb-6 flex items-center gap-1.5 rounded-md text-sm font-medium text-slate hover:text-ink"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                  <ReviewStep form={form} onEdit={handleEdit} onSubmit={handleSubmit} submitting={submitting} submitError={submitError} />
                </>
              )}

              {step < 4 && (
                <div className="mt-9 flex items-center justify-between border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="focus-ring flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-slate transition-colors hover:text-ink disabled:opacity-0"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="focus-ring flex items-center gap-1.5 rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
                  >
                    Continue <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
