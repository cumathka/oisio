'use client';

import React, { useState } from 'react';
import { CampaignWizard } from './CampaignWizard';
import { RsaBuilderSplitView } from './RsaBuilderSplitView';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Megaphone, Layers, ShieldCheck, Sparkles, Plus } from 'lucide-react';

export interface AdsViewProps {
  currency: string;
}

export function AdsView({ currency }: AdsViewProps) {
  const [activeTab, setActiveTab] = useState<'builder' | 'wizard'>('builder');

  return (
    <div className="space-y-6">
      {/* Top Banner & Sub Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Google Ads & SEA Optimization</span>
            <Badge variant="ai" size="sm">GAds API v16 Ready</Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Construct high-converting Responsive Search Ads with live Google SERP preview & strict character limit enforcement.
          </p>
        </div>

        <Tabs
          items={[
            { id: 'builder', label: 'RSA Ad Studio', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'wizard', label: 'Campaign Wizard', icon: <Megaphone className="w-3.5 h-3.5" /> },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          variant="segmented"
        />
      </div>

      {activeTab === 'builder' && <RsaBuilderSplitView />}
      {activeTab === 'wizard' && <CampaignWizard currency={currency} />}
    </div>
  );
}
