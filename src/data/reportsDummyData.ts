export interface ReportSubmissionRecord {
  submissionId: number;
  reportPackageName: string;
  serviceProviderName: string;
  propertyName: string;
  fundName: string;
  status: string;
  fileUploadedBy: string;
  postMonth: string;
  fileUploadedDate: string;
  days: number;
  errors: number;
}

export const INITIAL_REPORT_RECORDS: ReportSubmissionRecord[] = [
  {
    submissionId: 3,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Sep-23',
    fileUploadedDate: '9/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 4,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Oct-23',
    fileUploadedDate: '10/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 5,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Nov-23',
    fileUploadedDate: '11/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 6,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Dec-23',
    fileUploadedDate: '12/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 9,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Sep-23',
    fileUploadedDate: '9/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 10,
    reportPackageName: 'ESG - Electric City Usage',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Oct-23',
    fileUploadedDate: '10/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 11,
    reportPackageName: 'ESG - Electric City Usage',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Nov-23',
    fileUploadedDate: '11/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 12,
    reportPackageName: 'Property Attribute',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Dec-23',
    fileUploadedDate: '12/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 15,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'Nishifunabashi Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'NULL',
    postMonth: 'Sep-23',
    fileUploadedDate: '9/1/2023',
    days: 0,
    errors: 0
  },
  {
    submissionId: 18,
    reportPackageName: 'ESG - Electric City Usage',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'Alpha 1',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Jan-24',
    fileUploadedDate: '1/4/2024',
    days: 2,
    errors: 18
  },
  {
    submissionId: 21,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'Skybridge Realty Service Provider',
    propertyName: 'Square Tower',
    fundName: 'Metropolitan Trust',
    status: 'Completed',
    fileUploadedBy: 'Analyst2',
    postMonth: 'Feb-24',
    fileUploadedDate: '2/5/2024',
    days: 1,
    errors: 14
  },
  {
    submissionId: 24,
    reportPackageName: 'Tenancy Scheduled',
    serviceProviderName: 'Shamrock Service Provider',
    propertyName: 'Alpha 3',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Mar-24',
    fileUploadedDate: '3/6/2024',
    days: 1,
    errors: 12
  },
  {
    submissionId: 28,
    reportPackageName: 'Account Receivable',
    serviceProviderName: 'S cop Service Provider',
    propertyName: 'EPIC TOWER',
    fundName: 'Apex Capital Fund',
    status: 'Completed',
    fileUploadedBy: 'FinanceOps',
    postMonth: 'Apr-24',
    fileUploadedDate: '4/8/2024',
    days: 0,
    errors: 28
  },
  {
    submissionId: 32,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'Old Orleans Service Provider',
    propertyName: 'Alpha 2',
    fundName: 'Heritage RE Corp',
    status: 'Completed',
    fileUploadedBy: 'AdminUser',
    postMonth: 'May-24',
    fileUploadedDate: '5/3/2024',
    days: 0,
    errors: 13
  },
  {
    submissionId: 37,
    reportPackageName: 'Property Attribute',
    serviceProviderName: 'Phoenix Peak Service Provider',
    propertyName: 'Square Tower',
    fundName: 'Metropolitan Trust',
    status: 'Completed',
    fileUploadedBy: 'OpsSpecialist',
    postMonth: 'Jun-24',
    fileUploadedDate: '6/2/2024',
    days: 0,
    errors: 4
  },
  {
    submissionId: 44,
    reportPackageName: 'ESG - Electric City Usage',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Jul-24',
    fileUploadedDate: '7/2/2024',
    days: 0,
    errors: 3
  },
  {
    submissionId: 50,
    reportPackageName: 'Tenancy Scheduled',
    serviceProviderName: 'Skybridge Realty Service Provider',
    propertyName: 'Alpha 1',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Analyst2',
    postMonth: 'Aug-24',
    fileUploadedDate: '8/4/2024',
    days: 1,
    errors: 8
  },
  {
    submissionId: 58,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'CS Service Provider',
    propertyName: 'EPIC TOWER',
    fundName: 'Apex Capital Fund',
    status: 'Completed',
    fileUploadedBy: 'FinanceOps',
    postMonth: 'Sep-24',
    fileUploadedDate: '9/2/2024',
    days: 2,
    errors: 0
  },
  {
    submissionId: 64,
    reportPackageName: 'Trial Balance',
    serviceProviderName: 'Phoenix Peak Service Provider',
    propertyName: 'WT Tower',
    fundName: 'Large Company Inc',
    status: 'Completed',
    fileUploadedBy: 'Data Provider1',
    postMonth: 'Oct-24',
    fileUploadedDate: '10/1/2024',
    days: 0,
    errors: 1
  }
];

// Properties with Highest Errors (Screenshot 1)
export const PROPERTIES_HIGHEST_ERRORS = [
  { name: 'Alpha 1', count: 96 },
  { name: 'Square Tower', count: 80 },
  { name: 'Alpha 3', count: 77 },
  { name: 'EPIC TOWER', count: 65 },
  { name: 'Alpha 2', count: 62 }
];

// Dataset with Highest Average Errors (Screenshot 1)
export const DATASET_HIGHEST_AVG_ERRORS = [
  { name: 'ESG - Electric City Usage', avg: 1.48 },
  { name: 'Trial Balance', avg: 1.15 },
  { name: 'Property Attribute', avg: 0.95 },
  { name: 'Tenancy Scheduled', avg: 0.94 },
  { name: 'Account Receivable', avg: 0.93 }
];

// Submissions by Post Month (Screenshot 1 & attached image)
export const SUBMISSIONS_BY_POST_MONTH = [
  { month: 'Sep-23', success: 18, errors: 0 },
  { month: 'Oct-23', success: 72, errors: 12 },
  { month: 'Nov-23', success: 77, errors: 12 },
  { month: 'Dec-23', success: 80, errors: 14 },
  { month: 'Jan-24', success: 71, errors: 11 },
  { month: 'Feb-24', success: 71, errors: 13 },
  { month: 'Mar-24', success: 74, errors: 15 },
  { month: 'Apr-24', success: 77, errors: 28 },
  { month: 'May-24', success: 84, errors: 13 },
  { month: 'Jun-24', success: 77, errors: 13 },
  { month: 'Jul-24', success: 13, errors: 13 },
  { month: 'Aug-24', success: 22, errors: 0 },
  { month: 'Sep-24', success: 18, errors: 0 },
  { month: 'Oct-24', success: 1, errors: 1 }
];

// Accuracy by Service Provider (Screenshot 1)
export const ACCURACY_BY_SERVICE_PROVIDER = [
  { name: 'S cop Service Provider', successPct: 26.67, errorPct: 73.33 },
  { name: 'Shamrock Service Provider', successPct: 56.12, errorPct: 43.88 },
  { name: 'Skybridge Realty Service Provider', successPct: 77.97, errorPct: 22.03 },
  { name: 'Old Orleans Service Provider', successPct: 82.78, errorPct: 17.22 },
  { name: 'CS Service Provider', successPct: 84.86, errorPct: 15.14 },
  { name: 'Phoenix Peak Service Provider', successPct: 93.48, errorPct: 6.52 }
];

// Submission Status by Period (Screenshot 2: Turn Around Time)
export const SUBMISSION_STATUS_BY_PERIOD = [
  { month: 'Sep-23', onTime: 18, delayed: 7 },
  { month: 'Oct-23', onTime: 77, delayed: 12 },
  { month: 'Nov-23', onTime: 77, delayed: 11 },
  { month: 'Dec-23', onTime: 83, delayed: 10 },
  { month: 'Jan-24', onTime: 72, delayed: 9 },
  { month: 'Feb-24', onTime: 75, delayed: 7 },
  { month: 'Mar-24', onTime: 82, delayed: 22 },
  { month: 'Apr-24', onTime: 83, delayed: 9 },
  { month: 'May-24', onTime: 88, delayed: 19 },
  { month: 'Jun-24', onTime: 71, delayed: 3 },
  { month: 'Jul-24', onTime: 22, delayed: 8 },
  { month: 'Aug-24', onTime: 19, delayed: 4 },
  { month: 'Sep-24', onTime: 18, delayed: 1 },
  { month: 'Oct-24', onTime: 1, delayed: 0 }
];

// Avg Submission Days by Service Provider (Screenshot 2: Turn Around Time)
export const AVG_SUBMISSION_DAYS_BY_PROVIDER = [
  { name: 'CS Service Provider', days: 1.75 },
  { name: 'Skybridge Realty Service Provider', days: 1.47 },
  { name: 'Shamrock Service Provider', days: 0.62 },
  { name: 'Phoenix Peak Service Provider', days: 0.40 },
  { name: 'Old Orleans Service Provider', days: 0.16 },
  { name: 'S cop Service Provider', days: 0.00 }
];

// Total Submissions by Service Provider (Screenshot 2: Turn Around Time)
export const TOTAL_SUBMISSIONS_BY_PROVIDER = [
  { name: 'CS Service Provider', onTimePct: 67.57, delayedPct: 32.43 },
  { name: 'Skybridge Realty Service Provider', onTimePct: 74.58, delayedPct: 25.42 },
  { name: 'Shamrock Service Provider', onTimePct: 88.78, delayedPct: 11.22 },
  { name: 'Phoenix Peak Service Provider', onTimePct: 92.66, delayedPct: 7.34 },
  { name: 'Old Orleans Service Provider', onTimePct: 96.67, delayedPct: 3.33 },
  { name: 'S cop Service Provider', onTimePct: 100.00, delayedPct: 0.00 }
];
