import { HealthRecord, MetricSummary } from '../types';

export const GOOGLE_SHEET_ID = '1RR0ZqVsMEerJFNUrFLOPwyWOOBKKKBi6Ly9ujgBJ7_8';
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'H0001',
    screeningDate: '3/1/2026',
    area: 'เมือง',
    gender: 'หญิง',
    age: 24,
    heightCm: 158,
    weightKg: 52,
    bmi: 20.8,
    sbp: 112,
    dbp: 72,
    pulse: 76,
    bloodSugar: 91,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-01'
  },
  {
    id: 'H0002',
    screeningDate: '5/1/2026',
    area: 'เหนือ',
    gender: 'ชาย',
    age: 45,
    heightCm: 170,
    weightKg: 78,
    bmi: 27.0,
    sbp: 138,
    dbp: 88,
    pulse: 82,
    bloodSugar: 118,
    smoking: 'สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 2,
    riskLevel: 'ปานกลาง',
    month: '2026-01'
  },
  {
    id: 'H0003',
    screeningDate: '8/1/2026',
    area: 'ตะวันออก',
    gender: 'หญิง',
    age: 63,
    heightCm: 155,
    weightKg: 69,
    bmi: 28.7,
    sbp: 151,
    dbp: 94,
    pulse: 86,
    bloodSugar: 142,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 6,
    riskLevel: 'สูง',
    month: '2026-01'
  },
  {
    id: 'H0004',
    screeningDate: '11/1/2026',
    area: 'ตะวันตก',
    gender: 'ชาย',
    age: 37,
    heightCm: 175,
    weightKg: 70,
    bmi: 22.9,
    sbp: 121,
    dbp: 78,
    pulse: 74,
    bloodSugar: 97,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-01'
  },
  {
    id: 'H0005',
    screeningDate: '14/1/2026',
    area: 'ใต้',
    gender: 'หญิง',
    age: 52,
    heightCm: 160,
    weightKg: 74,
    bmi: 28.9,
    sbp: 146,
    dbp: 92,
    pulse: 88,
    bloodSugar: 131,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 5,
    riskLevel: 'สูง',
    month: '2026-01'
  },
  {
    id: 'H0006',
    screeningDate: '17/1/2026',
    area: 'เมือง',
    gender: 'ชาย',
    age: 29,
    heightCm: 168,
    weightKg: 63,
    bmi: 22.3,
    sbp: 117,
    dbp: 76,
    pulse: 80,
    bloodSugar: 89,
    smoking: 'สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 1,
    riskLevel: 'ต่ำ',
    month: '2026-01'
  },
  {
    id: 'H0007',
    screeningDate: '20/1/2026',
    area: 'เหนือ',
    gender: 'หญิง',
    age: 41,
    heightCm: 162,
    weightKg: 67,
    bmi: 25.5,
    sbp: 129,
    dbp: 84,
    pulse: 79,
    bloodSugar: 108,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 1,
    riskLevel: 'ต่ำ',
    month: '2026-01'
  },
  {
    id: 'H0008',
    screeningDate: '23/1/2026',
    area: 'ตะวันออก',
    gender: 'ชาย',
    age: 68,
    heightCm: 165,
    weightKg: 82,
    bmi: 30.1,
    sbp: 158,
    dbp: 98,
    pulse: 91,
    bloodSugar: 154,
    smoking: 'สูบ',
    alcohol: 'ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 7,
    riskLevel: 'สูง',
    month: '2026-01'
  },
  {
    id: 'H0009',
    screeningDate: '26/1/2026',
    area: 'ตะวันตก',
    gender: 'หญิง',
    age: 56,
    heightCm: 157,
    weightKg: 61,
    bmi: 24.7,
    sbp: 134,
    dbp: 86,
    pulse: 83,
    bloodSugar: 113,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 1,
    riskLevel: 'ต่ำ',
    month: '2026-01'
  },
  {
    id: 'H0010',
    screeningDate: '29/1/2026',
    area: 'ใต้',
    gender: 'ชาย',
    age: 48,
    heightCm: 172,
    weightKg: 86,
    bmi: 29.1,
    sbp: 143,
    dbp: 91,
    pulse: 87,
    bloodSugar: 126,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 4,
    riskLevel: 'สูง',
    month: '2026-01'
  },
  {
    id: 'H0011',
    screeningDate: '2/2/2026',
    area: 'เมือง',
    gender: 'หญิง',
    age: 33,
    heightCm: 161,
    weightKg: 58,
    bmi: 22.4,
    sbp: 118,
    dbp: 75,
    pulse: 77,
    bloodSugar: 94,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-02'
  },
  {
    id: 'H0012',
    screeningDate: '5/2/2026',
    area: 'เหนือ',
    gender: 'ชาย',
    age: 59,
    heightCm: 169,
    weightKg: 81,
    bmi: 28.4,
    sbp: 148,
    dbp: 93,
    pulse: 89,
    bloodSugar: 137,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 5,
    riskLevel: 'สูง',
    month: '2026-02'
  },
  {
    id: 'H0013',
    screeningDate: '8/2/2026',
    area: 'ตะวันออก',
    gender: 'หญิง',
    age: 27,
    heightCm: 154,
    weightKg: 55,
    bmi: 23.2,
    sbp: 109,
    dbp: 70,
    pulse: 72,
    bloodSugar: 87,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-02'
  },
  {
    id: 'H0014',
    screeningDate: '11/2/2026',
    area: 'ตะวันตก',
    gender: 'ชาย',
    age: 51,
    heightCm: 178,
    weightKg: 92,
    bmi: 29.0,
    sbp: 141,
    dbp: 89,
    pulse: 84,
    bloodSugar: 124,
    smoking: 'สูบ',
    alcohol: 'ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 4,
    riskLevel: 'สูง',
    month: '2026-02'
  },
  {
    id: 'H0015',
    screeningDate: '14/2/2026',
    area: 'ใต้',
    gender: 'หญิง',
    age: 46,
    heightCm: 159,
    weightKg: 72,
    bmi: 28.5,
    sbp: 136,
    dbp: 87,
    pulse: 81,
    bloodSugar: 116,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 2,
    riskLevel: 'ปานกลาง',
    month: '2026-02'
  },
  {
    id: 'H0016',
    screeningDate: '17/2/2026',
    area: 'เมือง',
    gender: 'ชาย',
    age: 22,
    heightCm: 173,
    weightKg: 64,
    bmi: 21.4,
    sbp: 110,
    dbp: 68,
    pulse: 75,
    bloodSugar: 83,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-02'
  },
  {
    id: 'H0017',
    screeningDate: '20/2/2026',
    area: 'เหนือ',
    gender: 'หญิง',
    age: 65,
    heightCm: 156,
    weightKg: 76,
    bmi: 31.2,
    sbp: 155,
    dbp: 96,
    pulse: 92,
    bloodSugar: 149,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 6,
    riskLevel: 'สูง',
    month: '2026-02'
  },
  {
    id: 'H0018',
    screeningDate: '23/2/2026',
    area: 'ตะวันออก',
    gender: 'ชาย',
    age: 39,
    heightCm: 171,
    weightKg: 75,
    bmi: 25.6,
    sbp: 127,
    dbp: 82,
    pulse: 79,
    bloodSugar: 103,
    smoking: 'สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 2,
    riskLevel: 'ปานกลาง',
    month: '2026-02'
  },
  {
    id: 'H0019',
    screeningDate: '26/2/2026',
    area: 'ตะวันตก',
    gender: 'หญิง',
    age: 58,
    heightCm: 163,
    weightKg: 70,
    bmi: 26.3,
    sbp: 139,
    dbp: 89,
    pulse: 85,
    bloodSugar: 121,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 2,
    riskLevel: 'ปานกลาง',
    month: '2026-02'
  },
  {
    id: 'H0020',
    screeningDate: '1/3/2026',
    area: 'ใต้',
    gender: 'ชาย',
    age: 67,
    heightCm: 166,
    weightKg: 88,
    bmi: 31.9,
    sbp: 162,
    dbp: 101,
    pulse: 94,
    bloodSugar: 161,
    smoking: 'สูบ',
    alcohol: 'ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 7,
    riskLevel: 'สูง',
    month: '2026-03'
  },
  {
    id: 'H0021',
    screeningDate: '4/3/2026',
    area: 'เมือง',
    gender: 'หญิง',
    age: 35,
    heightCm: 160,
    weightKg: 63,
    bmi: 24.6,
    sbp: 122,
    dbp: 79,
    pulse: 76,
    bloodSugar: 99,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-03'
  },
  {
    id: 'H0022',
    screeningDate: '7/3/2026',
    area: 'เหนือ',
    gender: 'ชาย',
    age: 43,
    heightCm: 174,
    weightKg: 83,
    bmi: 27.4,
    sbp: 135,
    dbp: 86,
    pulse: 82,
    bloodSugar: 111,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 2,
    riskLevel: 'ปานกลาง',
    month: '2026-03'
  },
  {
    id: 'H0023',
    screeningDate: '10/3/2026',
    area: 'ตะวันออก',
    gender: 'หญิง',
    age: 61,
    heightCm: 152,
    weightKg: 68,
    bmi: 29.4,
    sbp: 149,
    dbp: 94,
    pulse: 88,
    bloodSugar: 139,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 5,
    riskLevel: 'สูง',
    month: '2026-03'
  },
  {
    id: 'H0024',
    screeningDate: '13/3/2026',
    area: 'ตะวันตก',
    gender: 'ชาย',
    age: 31,
    heightCm: 180,
    weightKg: 79,
    bmi: 24.4,
    sbp: 116,
    dbp: 74,
    pulse: 78,
    bloodSugar: 92,
    smoking: 'สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 1,
    riskLevel: 'ต่ำ',
    month: '2026-03'
  },
  {
    id: 'H0025',
    screeningDate: '16/3/2026',
    area: 'ใต้',
    gender: 'หญิง',
    age: 49,
    heightCm: 158,
    weightKg: 78,
    bmi: 31.2,
    sbp: 145,
    dbp: 91,
    pulse: 86,
    bloodSugar: 128,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 5,
    riskLevel: 'สูง',
    month: '2026-03'
  },
  {
    id: 'H0026',
    screeningDate: '19/3/2026',
    area: 'เมือง',
    gender: 'ชาย',
    age: 26,
    heightCm: 169,
    weightKg: 67,
    bmi: 23.5,
    sbp: 114,
    dbp: 72,
    pulse: 74,
    bloodSugar: 88,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-03'
  },
  {
    id: 'H0027',
    screeningDate: '22/3/2026',
    area: 'เหนือ',
    gender: 'หญิง',
    age: 54,
    heightCm: 164,
    weightKg: 73,
    bmi: 27.1,
    sbp: 137,
    dbp: 88,
    pulse: 83,
    bloodSugar: 117,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 2,
    riskLevel: 'ปานกลาง',
    month: '2026-03'
  },
  {
    id: 'H0028',
    screeningDate: '25/3/2026',
    area: 'ตะวันออก',
    gender: 'ชาย',
    age: 64,
    heightCm: 167,
    weightKg: 85,
    bmi: 30.5,
    sbp: 153,
    dbp: 97,
    pulse: 90,
    bloodSugar: 145,
    smoking: 'สูบ',
    alcohol: 'ดื่ม',
    exercise: 'ไม่ออกกำลังกาย',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 7,
    riskLevel: 'สูง',
    month: '2026-03'
  },
  {
    id: 'H0029',
    screeningDate: '28/3/2026',
    area: 'ตะวันตก',
    gender: 'หญิง',
    age: 40,
    heightCm: 157,
    weightKg: 60,
    bmi: 24.3,
    sbp: 124,
    dbp: 80,
    pulse: 77,
    bloodSugar: 101,
    smoking: 'ไม่สูบ',
    alcohol: 'ไม่ดื่ม',
    exercise: 'สม่ำเสมอ',
    diabetesScreening: 'ไม่มี',
    hypertensionScreening: 'ไม่มี',
    riskScore: 0,
    riskLevel: 'ต่ำ',
    month: '2026-03'
  },
  {
    id: 'H0030',
    screeningDate: '31/3/2026',
    area: 'ใต้',
    gender: 'ชาย',
    age: 57,
    heightCm: 172,
    weightKg: 89,
    bmi: 30.1,
    sbp: 147,
    dbp: 92,
    pulse: 87,
    bloodSugar: 133,
    smoking: 'ไม่สูบ',
    alcohol: 'ดื่ม',
    exercise: 'บางครั้ง',
    diabetesScreening: 'มีแนวโน้ม/เสี่ยง',
    hypertensionScreening: 'มีแนวโน้ม/เสี่ยง',
    riskScore: 5,
    riskLevel: 'สูง',
    month: '2026-03'
  }
];

export function parseCSV(csvText: string): HealthRecord[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];

  const records: HealthRecord[] = [];

  // Helper to split CSV line respecting quotes
  const parseLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));
    return values;
  };

  const header = parseLine(lines[0]);
  const idIdx = header.findIndex(h => h.includes('รหัสบุคคล') || h.toLowerCase() === 'id');
  const dateIdx = header.findIndex(h => h.includes('วันที่คัดกรอง') || h.toLowerCase() === 'date');
  const areaIdx = header.findIndex(h => h.includes('พื้นที่') || h.toLowerCase() === 'area');
  const genderIdx = header.findIndex(h => h.includes('เพศ') || h.toLowerCase() === 'gender');
  const ageIdx = header.findIndex(h => h.includes('อายุ') || h.toLowerCase() === 'age');
  const heightIdx = header.findIndex(h => h.includes('ส่วนสูง') || h.toLowerCase().includes('height'));
  const weightIdx = header.findIndex(h => h.includes('น้ำหนัก') || h.toLowerCase().includes('weight'));
  const bmiIdx = header.findIndex(h => h.toLowerCase() === 'bmi' || h.includes('bmi'));
  const sbpIdx = header.findIndex(h => h.includes('SBP') || h.includes('sbp'));
  const dbpIdx = header.findIndex(h => h.includes('DBP') || h.includes('dbp'));
  const pulseIdx = header.findIndex(h => h.includes('ชีพจร') || h.includes('pulse'));
  const sugarIdx = header.findIndex(h => h.includes('น้ำตาล') || h.includes('sugar'));
  const smokeIdx = header.findIndex(h => h.includes('สูบ') || h.includes('smoke'));
  const alcoholIdx = header.findIndex(h => h.includes('ดื่ม') || h.includes('alcohol'));
  const exerciseIdx = header.findIndex(h => h.includes('ออกกำลังกาย') || h.includes('exercise'));
  const dmIdx = header.findIndex(h => h.includes('เบาหวาน') || h.includes('diabetes'));
  const htIdx = header.findIndex(h => h.includes('ความดันโลหิตสูง') || h.includes('hypertension'));
  const scoreIdx = header.findIndex(h => h.includes('คะแนนความเสี่ยง') || h.includes('score'));
  const riskIdx = header.findIndex(h => h.includes('ระดับความเสี่ยง') || h.includes('risk'));
  const monthIdx = header.findIndex(h => h.includes('เดือน') || h.includes('month'));

  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim()) continue;
    const cols = parseLine(raw);
    const id = cols[idIdx >= 0 ? idIdx : 0] || `H${String(i).padStart(4, '0')}`;
    if (!id || id.trim() === '') continue;

    const screeningDate = cols[dateIdx >= 0 ? dateIdx : 1] || '';
    const area = cols[areaIdx >= 0 ? areaIdx : 2] || 'ทั่วไป';
    const gender = (cols[genderIdx >= 0 ? genderIdx : 3] || 'ชาย') as 'ชาย' | 'หญิง';
    const age = parseFloat(cols[ageIdx >= 0 ? ageIdx : 4]) || 0;
    const heightCm = parseFloat(cols[heightIdx >= 0 ? heightIdx : 5]) || 0;
    const weightKg = parseFloat(cols[weightIdx >= 0 ? weightIdx : 6]) || 0;
    const bmi = parseFloat(cols[bmiIdx >= 0 ? bmiIdx : 7]) || (heightCm ? Number((weightKg / Math.pow(heightCm / 100, 2)).toFixed(1)) : 0);
    const sbp = parseFloat(cols[sbpIdx >= 0 ? sbpIdx : 8]) || 0;
    const dbp = parseFloat(cols[dbpIdx >= 0 ? dbpIdx : 9]) || 0;
    const pulse = parseFloat(cols[pulseIdx >= 0 ? pulseIdx : 10]) || 0;
    const bloodSugar = parseFloat(cols[sugarIdx >= 0 ? sugarIdx : 11]) || 0;
    const smoking = (cols[smokeIdx >= 0 ? smokeIdx : 12]?.includes('สูบ') && !cols[smokeIdx >= 0 ? smokeIdx : 12]?.includes('ไม่') ? 'สูบ' : 'ไม่สูบ') as 'สูบ' | 'ไม่สูบ';
    const alcohol = (cols[alcoholIdx >= 0 ? alcoholIdx : 13]?.includes('ดื่ม') && !cols[alcoholIdx >= 0 ? alcoholIdx : 13]?.includes('ไม่') ? 'ดื่ม' : 'ไม่ดื่ม') as 'ดื่ม' | 'ไม่ดื่ม';
    const exercise = (cols[exerciseIdx >= 0 ? exerciseIdx : 14] || 'สม่ำเสมอ') as any;
    const diabetesScreening = cols[dmIdx >= 0 ? dmIdx : 15] || 'ไม่มี';
    const hypertensionScreening = cols[htIdx >= 0 ? htIdx : 16] || 'ไม่มี';
    const riskScore = parseFloat(cols[scoreIdx >= 0 ? scoreIdx : 17]) || 0;
    let riskLevel = (cols[riskIdx >= 0 ? riskIdx : 18] || '') as 'ต่ำ' | 'ปานกลาง' | 'สูง';
    if (!['ต่ำ', 'ปานกลาง', 'สูง'].includes(riskLevel)) {
      riskLevel = riskScore >= 4 ? 'สูง' : riskScore >= 2 ? 'ปานกลาง' : 'ต่ำ';
    }
    const month = cols[monthIdx >= 0 ? monthIdx : 19] || (screeningDate.includes('/') ? `2026-${screeningDate.split('/')[1]?.padStart(2, '0')}` : '2026-01');

    records.push({
      id,
      screeningDate,
      area,
      gender,
      age,
      heightCm,
      weightKg,
      bmi,
      sbp,
      dbp,
      pulse,
      bloodSugar,
      smoking,
      alcohol,
      exercise,
      diabetesScreening,
      hypertensionScreening,
      riskScore,
      riskLevel,
      month
    });
  }

  return records;
}

export async function fetchGoogleSheetRecords(sheetId: string = GOOGLE_SHEET_ID): Promise<HealthRecord[]> {
  const urls = [
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`,
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (response.ok) {
        const text = await response.text();
        if (text && text.includes('รหัสบุคคล')) {
          const parsed = parseCSV(text);
          if (parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn(`Failed fetching from ${url}, trying fallback`, e);
    }
  }

  // If fetching directly fails (e.g. strict browser CORS in iframe), return initial health records
  return INITIAL_HEALTH_RECORDS;
}

export function calculateMetrics(records: HealthRecord[]): MetricSummary {
  const count = records.length;
  if (count === 0) {
    return {
      count: 0,
      avgAge: 0, minAge: 0, maxAge: 0,
      avgBmi: 0, minBmi: 0, maxBmi: 0,
      avgBloodSugar: 0, minBloodSugar: 0, maxBloodSugar: 0,
      avgSbp: 0, minSbp: 0, maxSbp: 0,
      avgDbp: 0, minDbp: 0, maxDbp: 0,
      avgPulse: 0, avgRiskScore: 0,
      highRiskCount: 0, highRiskPct: 0,
      mediumRiskCount: 0, mediumRiskPct: 0,
      lowRiskCount: 0, lowRiskPct: 0,
      maleCount: 0, malePct: 0,
      femaleCount: 0, femalePct: 0,
      smokerCount: 0, smokerPct: 0,
      drinkerCount: 0, drinkerPct: 0,
      exerciseRegularCount: 0, exerciseRegularPct: 0,
      diabetesRiskCount: 0, diabetesRiskPct: 0,
      hypertensionRiskCount: 0, hypertensionRiskPct: 0
    };
  }

  const ages = records.map(r => r.age);
  const bmis = records.map(r => r.bmi);
  const sugars = records.map(r => r.bloodSugar);
  const sbps = records.map(r => r.sbp);
  const dbps = records.map(r => r.dbp);
  const pulses = records.map(r => r.pulse);
  const scores = records.map(r => r.riskScore);

  const sum = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0);

  const highRiskCount = records.filter(r => r.riskLevel === 'สูง').length;
  const mediumRiskCount = records.filter(r => r.riskLevel === 'ปานกลาง').length;
  const lowRiskCount = records.filter(r => r.riskLevel === 'ต่ำ').length;

  const maleCount = records.filter(r => r.gender === 'ชาย').length;
  const femaleCount = records.filter(r => r.gender === 'หญิง').length;

  const smokerCount = records.filter(r => r.smoking === 'สูบ').length;
  const drinkerCount = records.filter(r => r.alcohol === 'ดื่ม').length;
  const exerciseRegularCount = records.filter(r => r.exercise === 'สม่ำเสมอ').length;

  const diabetesRiskCount = records.filter(r => r.diabetesScreening.includes('เสี่ยง')).length;
  const hypertensionRiskCount = records.filter(r => r.hypertensionScreening.includes('เสี่ยง')).length;

  return {
    count,
    avgAge: Number((sum(ages) / count).toFixed(1)),
    minAge: Math.min(...ages),
    maxAge: Math.max(...ages),

    avgBmi: Number((sum(bmis) / count).toFixed(1)),
    minBmi: Math.min(...bmis),
    maxBmi: Math.max(...bmis),

    avgBloodSugar: Number((sum(sugars) / count).toFixed(1)),
    minBloodSugar: Math.min(...sugars),
    maxBloodSugar: Math.max(...sugars),

    avgSbp: Number((sum(sbps) / count).toFixed(1)),
    minSbp: Math.min(...sbps),
    maxSbp: Math.max(...sbps),

    avgDbp: Number((sum(dbps) / count).toFixed(1)),
    minDbp: Math.min(...dbps),
    maxDbp: Math.max(...dbps),

    avgPulse: Number((sum(pulses) / count).toFixed(1)),
    avgRiskScore: Number((sum(scores) / count).toFixed(1)),

    highRiskCount,
    highRiskPct: Number(((highRiskCount / count) * 100).toFixed(1)),

    mediumRiskCount,
    mediumRiskPct: Number(((mediumRiskCount / count) * 100).toFixed(1)),

    lowRiskCount,
    lowRiskPct: Number(((lowRiskCount / count) * 100).toFixed(1)),

    maleCount,
    malePct: Number(((maleCount / count) * 100).toFixed(1)),

    femaleCount,
    femalePct: Number(((femaleCount / count) * 100).toFixed(1)),

    smokerCount,
    smokerPct: Number(((smokerCount / count) * 100).toFixed(1)),

    drinkerCount,
    drinkerPct: Number(((drinkerCount / count) * 100).toFixed(1)),

    exerciseRegularCount,
    exerciseRegularPct: Number(((exerciseRegularCount / count) * 100).toFixed(1)),

    diabetesRiskCount,
    diabetesRiskPct: Number(((diabetesRiskCount / count) * 100).toFixed(1)),

    hypertensionRiskCount,
    hypertensionRiskPct: Number(((hypertensionRiskCount / count) * 100).toFixed(1)),
  };
}
