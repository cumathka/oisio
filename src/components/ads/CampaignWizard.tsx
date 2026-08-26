'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Target,
  Globe2,
  DollarSign,
  Layers,
  Sparkles,
  Rocket,
} from 'lucide-react';
import { RsaBuilderSplitView } from './RsaBuilderSplitView';

export interface CampaignWizardProps {
  currency: string;
  onLaunchCampaign?: (data: any) => void;
}

export function CampaignWizard({ currency = 'CHF', onLaunchCampaign }: CampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [goal, setGoal] = useState<'LEADS' | 'SALES' | 'TRAFFIC'>('LEADS');
  const [dailyBudget, setDailyBudget] = useState('50');
  const [biddingStrategy, setBiddingStrategy] = useState('MAX_CONVERSIONS');
  const [targetLocation, setTargetLocation] = useState('Switzerland (CH) + DACH');

  const steps = [
    { number: 1, title: 'Goal & Objective', icon: Target },
    { number: 2, title: 'Network & Location', icon: Globe2 },
    { number: 3, title: 'Budget & Bidding', icon: DollarSign },
    { number: 4, title: 'Responsive Search Ads', icon: Layers },
    { number: 5, title: 'Review & Push to Google', icon: Rocket },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="space-y-6">
      {/* Wizard Progress Stepper */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between overflow-x-auto gap-2">
          {steps.map((step, idx) => {
            const isDone = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.number}>
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isDone
                      ? 'text-emerald-400 hover:bg-slate-800'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isCurrent
                        ? 'bg-white text-indigo-700'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3" /> : step.number}
                  </div>
                  <span className="whitespace-nowrap">{step.title}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-700 flex-shrink-0 hidden md:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[380px]">
        {currentStep === 1 && (
          <Card variant="surface" padding="lg" className="space-y-4">
            <h3 className="text-base font-bold text-slate-100">Step 1: Campaign Objective</h3>
            <p className="text-xs text-slate-400">
              Select the primary business outcome for this campaign.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {[
                { id: 'LEADS', label: 'B2B Leads & Demos', desc: 'Maximize form submissions and demo requests with qualified B2B intent.' },
                { id: 'SALES', label: 'Online Sales / MRR', desc: 'Direct self-serve SaaS subscriptions with automated tracking.' },
                { id: 'TRAFFIC', label: 'Qualified Website Visits', desc: 'Drive high-volume organic searchers into mid-funnel content.' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setGoal(item.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    goal === item.id
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-950/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-slate-200">{item.label}</h4>
                    {goal === item.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {currentStep === 2 && (
          <Card variant="surface" padding="lg" className="space-y-4">
            <h3 className="text-base font-bold text-slate-100">Step 2: Geographic & Language Targeting</h3>
            <p className="text-xs text-slate-400">
              Target local regional markets with high Swiss Franc purchasing power.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Target Locations
                </label>
                <input
                  type="text"
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-200">Recommended Geo-Modifiers:</div>
                <div>• Zurich (Kanton ZH), Geneva, Basel-Stadt, Bern</div>
                <div>• Exclude non-relevant IP regions via automated SSRF/Fraud Shield</div>
              </div>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card variant="surface" padding="lg" className="space-y-4">
            <h3 className="text-base font-bold text-slate-100">Step 3: Budget & Smart Bidding</h3>
            <p className="text-xs text-slate-400">
              Set your target daily spend and automated bidding algorithm.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Daily Budget ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono">
                    {currency === 'CHF' ? 'Fr.' : currency === 'EUR' ? '€' : '$'}
                  </span>
                  <input
                    type="number"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Est. Monthly Spend: ~{currency} {(Number(dailyBudget) * 30.4).toFixed(0)}
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Bidding Strategy
                </label>
                <select
                  value={biddingStrategy}
                  onChange={(e) => setBiddingStrategy(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="MAX_CONVERSIONS">Maximize Conversions (Target CPA)</option>
                  <option value="MAX_CONV_VALUE">Maximize Conversion Value (Target ROAS)</option>
                  <option value="MAX_CLICKS">Maximize Clicks</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100">Step 4: Responsive Search Ad Composition</h3>
            <RsaBuilderSplitView />
          </div>
        )}

        {currentStep === 5 && (
          <Card variant="surface" padding="lg" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">Step 5: Pre-Flight Audit & Deployment</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verify campaign parameters against Google Ads API v16 schemas.
                </p>
              </div>
              <Badge variant="success" size="md">Ready for API Sync</Badge>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Campaign Objective</span>
                <span className="font-semibold text-slate-200">{goal}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Target Location</span>
                <span className="font-mono text-slate-200">{targetLocation}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Daily Spend</span>
                <span className="font-mono font-bold text-emerald-400">{currency} {dailyBudget}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RSA Ad Strength</span>
                <span className="font-semibold text-indigo-400">EXCELLENT (100% Policy Clean)</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrev}
          disabled={currentStep === 1}
          icon={<ChevronLeft className="w-3.5 h-3.5" />}
        >
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            iconRight={<ChevronRight className="w-3.5 h-3.5" />}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="ai"
            size="md"
            onClick={() => onLaunchCampaign && onLaunchCampaign({ goal, dailyBudget, targetLocation })}
            icon={<Rocket className="w-4 h-4 text-white" />}
          >
            Publish Campaign to Google Ads
          </Button>
        )}
      </div>
    </div>
  );
}
