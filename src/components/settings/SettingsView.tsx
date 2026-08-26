'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { ShieldCheck, Key, Users, Link2, CheckCircle2 } from 'lucide-react';

export function SettingsView() {
  const teamMembers = [
    { name: 'Cuma Kaya', email: 'cuma@oisio.ai', role: 'OWNER', status: 'Active' },
    { name: 'Sarah Meier', email: 'sarah@example.ch', role: 'ADMIN', status: 'Active' },
    { name: 'Thomas Weber', email: 'thomas@example.ch', role: 'EDITOR', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Workspace Settings & RBAC Permissions</span>
            <Badge variant="success" size="sm">AES-256-GCM Guarded</Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage team roles, access controls, and OAuth 2.0 connected marketing integrations.
          </p>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Link2 className="w-4 h-4 text-indigo-400" />
          <span>Connected Marketing Integrations</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="surface" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Google Search Console</span>
              <Badge variant="success" size="sm">Connected</Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Syncing search clicks, query impressions, and canonical index coverage.
            </p>
          </Card>

          <Card variant="surface" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Google Ads API v16</span>
              <Badge variant="success" size="sm">Connected</Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Automated RSA asset upload, quality score telemetry, and negative keyword sync.
            </p>
          </Card>

          <Card variant="surface" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Google Analytics 4 (GA4)</span>
              <Badge variant="success" size="sm">Connected</Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Tracking multi-touch conversion attribution and landing page bounce rates.
            </p>
          </Card>
        </div>
      </div>

      {/* Team & RBAC Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Team Members & Role-Based Access Control (RBAC)</span>
          </h3>
          <Button variant="secondary" size="xs">
            + Invite Member
          </Button>
        </div>

        <Table>
          <TableHeader>
            <tr>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {teamMembers.map((m) => (
              <TableRow key={m.email}>
                <TableCell className="font-semibold text-slate-200">{m.name}</TableCell>
                <TableCell className="font-mono text-slate-400">{m.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      m.role === 'OWNER' ? 'purple' : m.role === 'ADMIN' ? 'info' : 'neutral'
                    }
                    size="sm"
                  >
                    {m.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    {m.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
