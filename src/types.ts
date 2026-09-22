export type RiskLevel = 'ต่ำ' | 'ปานกลาง' | 'สูง';

export type Gender = 'ชาย' | 'หญิง';

export type ExerciseLevel = 'สม่ำเสมอ' | 'บางครั้ง' | 'ไม่ออกกำลังกาย';

export interface HealthRecord {
  id: string; // รหัสบุคคล เช่น H0001
  screeningDate: string; // วันที่คัดกรอง เช่น 3/1/2026
  area: string; // พื้นที่ เช่น เมือง, เหนือ, ตะวันออก, ตะวันตก, ใต้
  gender: Gender; // ชาย / หญิง
  age: number; // อายุ
  heightCm: number; // ส่วนสูง cm
  weightKg: number; // น้ำหนัก kg
  bmi: number; // BMI
  sbp: number; // SBP mmHg
  dbp: number; // DBP mmHg
  pulse: number; // ชีพจร bpm
  bloodSugar: number; // น้ำตาล mg/dL
  smoking: 'สูบ' | 'ไม่สูบ'; // สูบบุหรี่
  alcohol: 'ดื่ม' | 'ไม่ดื่ม'; // ดื่มแอลกอฮอล์
  exercise: ExerciseLevel; // การออกกำลังกาย
  diabetesScreening: string; // ไม่มี / มีแนวโน้ม/เสี่ยง
  hypertensionScreening: string; // ไม่มี / มีแนวโน้ม/เสี่ยง
  riskScore: number; // คะแนนความเสี่ยง
  riskLevel: RiskLevel; // ต่ำ / ปานกลาง / สูง
  month: string; // 2026-01
}

export type NavigationTab = 'home' | 'risk' | 'trend' | 'behavior' | 'table';

export interface FilterState {
  ageGroup: string; // 'all' | '<30' | '30-44' | '45-59' | '60+'
  gender: string; // 'all' | 'ชาย' | 'หญิง'
  riskLevel: string; // 'all' | 'ต่ำ' | 'ปานกลาง' | 'สูง'
  area: string; // 'all' | 'เมือง' | 'เหนือ' | 'ตะวันออก' | 'ตะวันตก' | 'ใต้'
  searchQuery: string;
}

export interface MetricSummary {
  count: number;
  avgAge: number;
  minAge: number;
  maxAge: number;
  avgBmi: number;
  minBmi: number;
  maxBmi: number;
  avgBloodSugar: number;
  minBloodSugar: number;
  maxBloodSugar: number;
  avgSbp: number;
  minSbp: number;
  maxSbp: number;
  avgDbp: number;
  minDbp: number;
  maxDbp: number;
  avgPulse: number;
  avgRiskScore: number;
  highRiskCount: number;
  highRiskPct: number;
  mediumRiskCount: number;
  mediumRiskPct: number;
  lowRiskCount: number;
  lowRiskPct: number;
  maleCount: number;
  malePct: number;
  femaleCount: number;
  femalePct: number;
  smokerCount: number;
  smokerPct: number;
  drinkerCount: number;
  drinkerPct: number;
  exerciseRegularCount: number;
  exerciseRegularPct: number;
  diabetesRiskCount: number;
  diabetesRiskPct: number;
  hypertensionRiskCount: number;
  hypertensionRiskPct: number;
}
