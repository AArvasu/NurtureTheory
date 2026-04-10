// Mock data store for the Pēds app
export const mockChildren = [
  {
    id: 'child-1',
    name: 'Liam',
    dob: '2022-03-15',
    ageLabel: '3 yrs',
    avatar: '🧒',
    bloodType: 'O+',
    weight: '14.2 kg',
    height: '96 cm',
    conditions: ['Asthma (mild)'],
    allergies: [
      { substance: 'Peanuts', severity: 'anaphylactic', epipen: true },
      { substance: 'Amoxicillin', severity: 'moderate', epipen: false },
    ],
    vaccines: [
      { name: 'MMR', date: '2023-09-10', status: 'done' },
      { name: 'Flu Shot', date: '2024-11-01', status: 'done' },
      { name: 'DTaP Booster', date: null, status: 'overdue' },
      { name: 'Varicella', date: '2023-09-10', status: 'done' },
    ],
    medications: [
      { name: 'Salbutamol Inhaler', dose: '100mcg', frequency: 'As needed', lastGiven: '2025-12-10' },
      { name: 'Cetirizine', dose: '5mg', frequency: 'Daily (allergy season)', lastGiven: '2025-11-30' },
    ],
    milestones: [
      { domain: 'language', label: 'Uses 2-word sentences', achieved: true, date: '2023-10-01' },
      { domain: 'motor', label: 'Kicks a ball', achieved: true, date: '2024-01-15' },
      { domain: 'cognitive', label: 'Sorts by color', achieved: true, date: '2024-03-01' },
      { domain: 'social', label: 'Plays with peers', achieved: false, date: null },
    ],
  },
  {
    id: 'child-2',
    name: 'Mia',
    dob: '2024-07-02',
    ageLabel: '9 mo',
    avatar: '👶',
    bloodType: 'A+',
    weight: '8.5 kg',
    height: '71 cm',
    conditions: [],
    allergies: [],
    vaccines: [
      { name: 'Hepatitis B (2)', date: '2024-09-01', status: 'done' },
      { name: 'DTaP (1)', date: '2024-09-01', status: 'done' },
      { name: 'Hib (2)', date: '2024-11-01', status: 'done' },
      { name: 'PCV13 (3)', date: null, status: 'due-soon' },
    ],
    medications: [],
    milestones: [
      { domain: 'motor', label: 'Sits without support', achieved: true, date: '2025-01-10' },
      { domain: 'language', label: 'Babbles consonants', achieved: true, date: '2025-01-20' },
      { domain: 'social', label: 'Stranger anxiety', achieved: true, date: '2025-02-01' },
      { domain: 'cognitive', label: 'Object permanence', achieved: false, date: null },
    ],
  },
];

export const mockParentingMoments = [
  {
    id: 'moment-1',
    childId: 'child-1',
    date: '2026-04-08',
    situation: 'Bedtime resistance',
    tried: 'Extended story time + dim lights',
    outcome: 'worked',
    note: 'Took 20 min total, calm throughout',
  },
  {
    id: 'moment-2',
    childId: 'child-1',
    date: '2026-04-05',
    situation: 'Meltdown at grocery store',
    tried: 'Distraction with phone',
    outcome: 'backfired',
    note: 'Got more agitated. Try leaving earlier next time.',
  },
  {
    id: 'moment-3',
    childId: 'child-1',
    date: '2026-03-30',
    situation: 'Refusing vegetables',
    tried: 'Made it a game — "eat the trees"',
    outcome: 'worked',
    note: 'Ate broccoli for the first time!',
  },
];

export const mockInsights = [
  "Liam's meltdown frequency is 2.3× higher in the two weeks following a respiratory illness. Consider reduced expectations during recovery periods.",
  "The speech regression logged in November coincides with the ear infection period — possible temporary hearing reduction affecting speech practice. Flag for pediatrician.",
  "Bedtime routines with dim lighting + story have a 78% success rate based on 9 logged moments.",
];

export const mockSymptomHistory = [
  {
    id: 'sym-1',
    childId: 'child-1',
    date: '2026-01-18',
    symptom: 'Cough + mild wheeze',
    resolution: 'Resolved in 4 days with reliever inhaler',
    escalated: false,
  },
  {
    id: 'sym-2',
    childId: 'child-1',
    date: '2025-11-22',
    symptom: 'Fever 39.1°C, runny nose',
    resolution: 'Resolved in 3 days, paracetamol given',
    escalated: false,
  },
];
