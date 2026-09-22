import React from 'react';
import { HealthRecord, MetricSummary } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  ScatterChart, Scatter, ZAxis, Cell, CartesianGrid
} from 'recharts';
import { ShieldAlert, AlertTriangle, CheckCircle, MapPin, Scale, Heart } from 'lucide-react';

interface HealthRiskViewProps {
  records: HealthRecord[];
  metrics: MetricSummary;
}

export const HealthRiskView: React.FC<HealthRiskViewProps> = ({ records, metrics }) => {
  // 1. Risk by Age Groups
  const ageGroupLabels = ['<30 ปี', '30-44 ปี', '45-59 ปี', '60+ ปี'];
  const ageRiskData = ageGroupLabels.map(label => {
    let groupRecords: HealthRecord[] = [];
    if (label === '<30 ปี') groupRecords = records.filter(r => r.age < 30);
    else if (label === '30-44 ปี') groupRecords = records.filter(r => r.age >= 30 && r.age <= 44);
    else if (label === '45-59 ปี') groupRecords = records.filter(r => r.age >= 45 && r.age <= 59);
    else groupRecords = records.filter(r => r.age >= 60);

    const low = groupRecords.filter(r => r.riskLevel === 'ต่ำ').length;
    const med = groupRecords.filter(r => r.riskLevel === 'ปานกลาง').length;
    const high = groupRecords.filter(r => r.riskLevel === 'สูง').length;

    return {
      name: label,
      ต่ำ: low,
      ปานกลาง: med,
      สูง: high,
      total: groupRecords.length,
      highPct: groupRecords.length ? Math.round((high / groupRecords.length) * 100) : 0
    };
  });

  // Find age group with highest risk
  const highestRiskAgeGroup = [...ageRiskData].sort((a, b) => b.สูง - a.สูง)[0];

  // 2. Risk by Area (พื้นที่ที่มีผู้เสี่ยงสูง)
  const areas = Array.from(new Set(records.map(r => r.area)));
  const areaRiskData = areas.map(areaName => {
    const areaRecords = records.filter(r => r.area === areaName);
    const low = areaRecords.filter(r => r.riskLevel === 'ต่ำ').length;
    const med = areaRecords.filter(r => r.riskLevel === 'ปานกลาง').length;
    const high = areaRecords.filter(r => r.riskLevel === 'สูง').length;
    return {
      area: areaName,
      ต่ำ: low,
      ปานกลาง: med,
      สูง: high,
      total: areaRecords.length,
      highCount: high
    };
  }).sort((a, b) => b.highCount - a.highCount);

  const highestRiskArea = areaRiskData[0];

  // 3. BMI vs Blood Sugar Scatter Data
  const scatterBmiSugarData = records.map(r => ({
    id: r.id,
    x: r.bmi,
    y: r.bloodSugar,
    risk: r.riskLevel,
    age: r.age,
    gender: r.gender,
  }));

  // 4. BMI vs SBP Scatter Data
  const scatterBmiSbpData = records.map(r => ({
    id: r.id,
    x: r.bmi,
    y: r.sbp,
    risk: r.riskLevel,
    age: r.age,
    gender: r.gender,
  }));

  const getRiskColor = (risk: string) => {
    if (risk === 'สูง') return '#f43f5e';
    if (risk === 'ปานกลาง') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div id="health-risk-view" className="space-y-6">
      
      {/* Risk Highlight Callout Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Highest Risk Age Group Highlight */}
        <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200/90 rounded-2xl p-4.5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-md">
              กลุ่มอายุที่มีความเสี่ยงสูงที่สุด
            </span>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {highestRiskAgeGroup ? highestRiskAgeGroup.name : 'ไม่มีข้อมูล'}
            </div>
            <p className="text-xs text-slate-600">
              พบผู้มีความเสี่ยงสูง <strong className="text-rose-600 font-bold">{highestRiskAgeGroup?.สูง || 0} ราย</strong> (คิดเป็น {highestRiskAgeGroup?.highPct || 0}% ของกลุ่มนี้)
            </p>
          </div>
          <div className="p-3 bg-white text-rose-600 rounded-2xl shadow-xs border border-rose-200 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Highest Risk Area Highlight */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-4.5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md">
              พื้นที่ที่มีผู้เสี่ยงสูงมากที่สุด
            </span>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              พื้นที่ {highestRiskArea ? `ภาค${highestRiskArea.area}` : 'ไม่มีข้อมูล'}
            </div>
            <p className="text-xs text-slate-600">
              มีผู้มีความเสี่ยงสูงจำนวน <strong className="text-amber-800 font-bold">{highestRiskArea?.highCount || 0} ราย</strong> จากประชากรคัดกรอง {highestRiskArea?.total || 0} ราย
            </p>
          </div>
          <div className="p-3 bg-white text-amber-600 rounded-2xl shadow-xs border border-amber-200 shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Row 1: Charts - Risk by Age and Risk by Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Risk Distribution by Age Group */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">การกระจายระดับความเสี่ยงตามกลุ่มอายุ</h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">Stacked Bar</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">จำแนกตามช่วงอายุ (&lt;30, 30-44, 45-59, 60+ ปี)</p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageRiskData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="ต่ำ" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="เสี่ยงต่ำ (Low)" />
                <Bar dataKey="ปานกลาง" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} name="เสี่ยงปานกลาง (Med)" />
                <Bar dataKey="สูง" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} name="เสี่ยงสูง (High)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>สังเกต: กลุ่มอายุ 45 ปีขึ้นไปมีสัดส่วนความเสี่ยงสูงเพิ่มขึ้นอย่างชัดเจน</span>
          </div>
        </div>

        {/* Chart 2: Risk by Area */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">การกระจายความเสี่ยงจำแนกตามพื้นที่</h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">5 ภูมิภาค</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">วิเคราะห์จำนวนผู้เสี่ยงแต่ละระดับในแต่ละพื้นที่</p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaRiskData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="area" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="ต่ำ" fill="#10b981" radius={[3, 3, 0, 0]} name="เสี่ยงต่ำ" />
                <Bar dataKey="ปานกลาง" fill="#f59e0b" radius={[3, 3, 0, 0]} name="เสี่ยงปานกลาง" />
                <Bar dataKey="สูง" fill="#f43f5e" radius={[3, 3, 0, 0]} name="เสี่ยงสูง" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>พื้นที่เป้าหมายการลงพื้นที่เชิงรุก: ภาคใต้และภาคตะวันออก</span>
          </div>
        </div>

      </div>

      {/* Row 2: Correlation Analysis (Scatter Plots) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Scatter 1: BMI vs Blood Sugar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-500" />
                <span>ความสัมพันธ์ระหว่าง BMI กับระดับน้ำตาลในเลือด</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                Scatter Plot
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              แกน X = BMI (kg/m²), แกน Y = น้ำตาลในเลือด (mg/dL) • สีจุดระบุระดับความเสี่ยง
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 15, right: 15, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="BMI" 
                  unit=" kg/m²" 
                  domain={[18, 35]} 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="น้ำตาล" 
                  unit=" mg/dL" 
                  domain={[70, 160]} 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-md text-xs">
                          <p className="font-bold text-slate-900">{data.id} ({data.gender}, {data.age} ปี)</p>
                          <p className="text-slate-600">BMI: <strong className="text-slate-900">{data.x}</strong> kg/m²</p>
                          <p className="text-slate-600">น้ำตาลในเลือด: <strong className="text-amber-600">{data.y}</strong> mg/dL</p>
                          <p className="text-slate-600">ระดับความเสี่ยง: <strong style={{ color: getRiskColor(data.risk) }}>{data.risk}</strong></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="ผู้รับการคัดกรอง" data={scatterBmiSugarData}>
                  {scatterBmiSugarData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getRiskColor(entry.risk)} 
                      opacity={0.85}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>เกณฑ์เตือน: BMI &gt; 25 kg/m² และน้ำตาล &gt; 100 mg/dL มักจัดอยู่ในกลุ่มเสี่ยงสูง</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-rose-600 font-semibold"><span className="w-2 h-2 rounded-full bg-rose-500"/> สูง</span>
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold"><span className="w-2 h-2 rounded-full bg-amber-500"/> กลาง</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold"><span className="w-2 h-2 rounded-full bg-emerald-500"/> ต่ำ</span>
            </div>
          </div>
        </div>

        {/* Scatter 2: BMI vs SBP (Blood Pressure) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>ความสัมพันธ์ระหว่าง BMI กับความดันโลหิต (SBP)</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                Scatter Plot
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              แกน X = BMI (kg/m²), แกน Y = SBP ความดันตัวบน (mmHg)
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 15, right: 15, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="BMI" 
                  unit=" kg/m²" 
                  domain={[18, 35]} 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="SBP" 
                  unit=" mmHg" 
                  domain={[100, 160]} 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-md text-xs">
                          <p className="font-bold text-slate-900">{data.id} ({data.gender}, {data.age} ปี)</p>
                          <p className="text-slate-600">BMI: <strong className="text-slate-900">{data.x}</strong> kg/m²</p>
                          <p className="text-slate-600">ความดัน SBP: <strong className="text-rose-600">{data.y}</strong> mmHg</p>
                          <p className="text-slate-600">ระดับความเสี่ยง: <strong style={{ color: getRiskColor(data.risk) }}>{data.risk}</strong></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="ผู้รับการคัดกรอง" data={scatterBmiSbpData}>
                  {scatterBmiSbpData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getRiskColor(entry.risk)} 
                      opacity={0.85}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>เกณฑ์เตือน: ผู้ที่มี BMI &ge; 28 มักมีความดันโลหิตสูงกว่า 140 mmHg</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-rose-600 font-semibold"><span className="w-2 h-2 rounded-full bg-rose-500"/> สูง</span>
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold"><span className="w-2 h-2 rounded-full bg-amber-500"/> กลาง</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold"><span className="w-2 h-2 rounded-full bg-emerald-500"/> ต่ำ</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
