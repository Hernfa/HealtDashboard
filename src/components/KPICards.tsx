import React from 'react';
import { MetricSummary } from '../types';
import { Users, Activity, HeartPulse, Droplets, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

interface KPICardsProps {
  metrics: MetricSummary;
  totalDatasetCount: number;
}

export const KPICards: React.FC<KPICardsProps> = ({ metrics, totalDatasetCount }) => {
  return (
    <div id="kpi-summary-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Total Screened Individuals */}
      <div id="kpi-total-screened" className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">จำนวนผู้รับการคัดกรอง</span>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">{metrics.count}</span>
            <span className="text-xs text-slate-500 font-medium">ราย</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              ชาย: <strong className="text-slate-900 font-semibold">{metrics.maleCount}</strong> ({metrics.malePct}%)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              หญิง: <strong className="text-slate-900 font-semibold">{metrics.femaleCount}</strong> ({metrics.femalePct}%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Health Risk Distribution */}
      <div id="kpi-risk-proportions" className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">สัดส่วนระดับความเสี่ยง</span>
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-1 h-3 rounded-full bg-slate-100 p-0.5 overflow-hidden">
            <div 
              style={{ width: `${metrics.highRiskPct}%` }} 
              className="h-full bg-rose-500 rounded-sm transition-all"
              title={`เสี่ยงสูง: ${metrics.highRiskCount} ราย (${metrics.highRiskPct}%)`}
            />
            <div 
              style={{ width: `${metrics.mediumRiskPct}%` }} 
              className="h-full bg-amber-400 rounded-sm transition-all"
              title={`เสี่ยงปานกลาง: ${metrics.mediumRiskCount} ราย (${metrics.mediumRiskPct}%)`}
            />
            <div 
              style={{ width: `${metrics.lowRiskPct}%` }} 
              className="h-full bg-emerald-500 rounded-sm transition-all"
              title={`เสี่ยงต่ำ: ${metrics.lowRiskCount} ราย (${metrics.lowRiskPct}%)`}
            />
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              สูง: <strong>{metrics.highRiskCount}</strong> ({metrics.highRiskPct}%)
            </span>
            <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              กลาง: <strong>{metrics.mediumRiskCount}</strong> ({metrics.mediumRiskPct}%)
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ต่ำ: <strong>{metrics.lowRiskCount}</strong> ({metrics.lowRiskPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Blood Pressure Summary (SBP/DBP) */}
      <div id="kpi-blood-pressure" className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ความดันโลหิต (SBP/DBP)</span>
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl border border-teal-100">
            <HeartPulse className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">{metrics.avgSbp}/{metrics.avgDbp}</span>
            <span className="text-xs text-slate-500 font-medium">เฉลี่ย (mmHg)</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>ช่วง: <strong className="text-slate-900">{metrics.minSbp}-{metrics.maxSbp}</strong> mmHg</span>
            <span className="text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
              เสี่ยงสูง {metrics.hypertensionRiskPct}%
            </span>
          </div>
        </div>
      </div>

      {/* 4. Blood Sugar & BMI */}
      <div id="kpi-blood-sugar" className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ระดับน้ำตาลในเลือด & BMI</span>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
            <Droplets className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">{metrics.avgBloodSugar}</span>
            <span className="text-xs text-slate-500 font-medium">เฉลี่ย (mg/dL)</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>BMI เฉลี่ย: <strong className="text-slate-900 font-semibold">{metrics.avgBmi}</strong></span>
            <span className="text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
              เสี่ยงเบาหวาน {metrics.diabetesRiskPct}%
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
