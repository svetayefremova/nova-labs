import type { Document } from '@/src/types/domain';

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'MRI Brain with & without Contrast',
    type: 'Radiology Report',
    author: 'Dr. R. Mehta, MD · Neuroradiology',
    date: '22 Apr 2026',
    pages: '3 pages',
    size: '284 KB',
    sections: [
      {
        title: 'Clinical indication',
        body: 'Progressive forgetfulness and new resting tremor of the right hand. Rule out structural lesion, vascular disease, or neurodegenerative change.',
      },
      {
        title: 'Technique',
        body: 'MRI brain performed on a 3T system. Axial T1, T2, FLAIR, DWI, SWI, and post-gadolinium T1 sequences obtained. No adverse reaction to contrast.',
      },
      {
        title: 'Findings',
        body: 'Mild generalized cortical volume loss, greater than expected for stated age of 58. Scattered T2/FLAIR hyperintensities in the periventricular and subcortical white matter, consistent with small vessel ischemic disease (Fazekas grade 1). No acute infarct. No hemorrhage. No mass or enhancement. Mild hippocampal volume loss bilaterally, left greater than right.',
      },
      {
        title: 'Impression',
        body: '1. Mild cortical atrophy with disproportionate hippocampal volume loss — correlate clinically for early neurodegenerative process.\n2. Mild white matter small vessel ischemic change (Fazekas grade 1).\n3. No acute intracranial abnormality.',
      },
    ],
  },
  {
    id: 'doc-2',
    title: 'Referral Letter',
    type: 'Neurology Referral',
    author: 'Dr. S. Chen, MD · Family Practice',
    date: '08 Apr 2026',
    pages: '2 pages',
    size: '128 KB',
    sections: [
      {
        title: 'Reason for referral',
        body: 'Patient referred to neurology for evaluation of a 9-month history of progressive forgetfulness, word-finding difficulty, and a new resting tremor of the right hand noted by family members in the past 6 weeks.',
      },
      {
        title: 'Relevant history',
        body: "No prior head trauma. No history of stroke, seizure, or psychiatric illness. Family history positive for Alzheimer's disease (mother, age 71) and essential tremor (father).",
      },
      {
        title: 'Examination',
        body: 'MMSE 26/30. Mild bradykinesia on right finger-tapping. 4 Hz resting tremor of right hand, dampens with action. No rigidity, gait normal. Cranial nerves intact.',
      },
      {
        title: 'Requested workup',
        body: 'MRI brain with and without contrast, DAT-SPECT if imaging non-diagnostic, neuropsychological battery, and basic metabolic / B12 / TSH labs (results attached).',
      },
    ],
  },
  {
    id: 'doc-3',
    title: 'Patient Intake Form',
    type: 'Medical History',
    author: 'Self-reported · Voxelwise Health',
    date: '02 Apr 2026',
    pages: '6 pages',
    size: '512 KB',
    sections: [
      {
        title: 'Demographics',
        body: 'Female, 58 years old. Right-handed. Retired schoolteacher. Lives with spouse. Two adult children, both well.',
      },
      {
        title: 'Chief complaint',
        body: 'Progressive forgetfulness over the past 9 months and new tremor of the right hand for 6 weeks.',
      },
      {
        title: 'Past medical history',
        body: 'Hypertension (controlled, lisinopril 10mg daily). Hypothyroidism (levothyroxine 75mcg daily). Mild osteoarthritis. No prior surgeries. No known drug allergies.',
      },
      {
        title: 'Family history',
        body: "Mother — Alzheimer's disease, deceased age 78. Father — essential tremor, living, age 84. One sibling, healthy.",
      },
      {
        title: 'Social history',
        body: 'Never smoker. Occasional wine (1–2 glasses/week). No recreational drug use. Regular walking exercise 4×/week.',
      },
      {
        title: 'Review of systems',
        body: 'Negative for headache, vision change, weakness, numbness, gait disturbance, urinary symptoms, sleep disturbance, mood changes. Positive for occasional constipation and reduced sense of smell over the last 2 years.',
      },
    ],
  },
  {
    id: 'doc-4',
    title: 'Laboratory Results',
    type: 'Lab Report',
    author: 'Auto-generated · LabCorp',
    date: '05 Apr 2026',
    pages: '3 pages',
    size: '221 KB',
    sections: [
      {
        title: 'Complete blood count',
        body: 'WBC 6.2 (4.0–11.0), Hgb 13.4 (12.0–15.5), Plt 248 (150–400), MCV 89 (80–100). All values within normal limits.',
      },
      {
        title: 'Comprehensive metabolic panel',
        body: 'Na 139, K 4.1, Cl 102, CO₂ 25, BUN 14, Cr 0.82 (eGFR >60), glucose 94. AST 22, ALT 19, alk phos 68, total bilirubin 0.6. Within normal limits.',
      },
      {
        title: 'Thyroid & vitamins',
        body: 'TSH 1.84 (0.4–4.0). Free T4 1.1. Vitamin B12 412 (200–900). Vitamin D 28 (mildly low — supplementation recommended). Folate WNL.',
      },
      {
        title: 'Comments',
        body: 'No metabolic etiology identified for cognitive symptoms. Recommend vitamin D 2000 IU daily and recheck in 3 months.',
      },
    ],
  },
  {
    id: 'doc-5',
    title: 'Current Medication List',
    type: 'Medication List',
    author: 'Updated by Dr. Chen · Riverside Family Medicine',
    date: '08 Apr 2026',
    pages: '1 page',
    size: '44 KB',
    sections: [
      {
        title: 'Active prescriptions',
        body: 'Lisinopril 10 mg PO daily — hypertension. Levothyroxine 75 mcg PO daily, AM, fasting — hypothyroidism. Atorvastatin 20 mg PO QHS — hyperlipidemia.',
      },
      {
        title: 'Over-the-counter',
        body: 'Vitamin D3 2000 IU daily. Calcium citrate 600 mg with meal. Multivitamin daily.',
      },
      {
        title: 'Allergies',
        body: 'No known drug allergies. Mild seasonal allergies (untreated).',
      },
      {
        title: 'Recent changes',
        body: 'Atorvastatin dose reduced from 40 mg to 20 mg on 12 Mar 2026 due to mild myalgia.',
      },
    ],
  },
  {
    id: 'doc-6',
    title: 'Insurance Authorization',
    type: 'Authorization',
    author: 'Auth #BSC-44182 · BlueShield · Member Services',
    date: '10 Apr 2026',
    pages: '2 pages',
    size: '96 KB',
    sections: [
      {
        title: 'Approved service',
        body: 'MRI brain with and without contrast (CPT 70553). One-time authorization. Approved facility: Voxelwise Imaging Center.',
      },
      {
        title: 'Validity',
        body: 'Authorization valid 10 Apr 2026 through 10 Jul 2026. Patient responsibility: $200 specialist deductible plus 20% coinsurance up to out-of-pocket maximum.',
      },
      {
        title: 'Notes',
        body: 'Pre-certification reviewed by Dr. R. Patel (medical director). No additional documentation required at time of service.',
      },
    ],
  },
];
