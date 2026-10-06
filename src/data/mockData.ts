import { Submission } from '../types';

export const INITIAL_SUBMISSIONS: Submission[] = [
  // --- September 24, 2026 (Highlighted in theme screenshot) ---
  {
    id: '5697',
    refId: '91520F11418D139',
    submissionNumber: '5697',
    title: 'UK_PM_TS_Data_Anomylised',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Analytics',
    propertyName: 'UK Portfolio Complex',
    dataset: 'UK_PM_TS_Data_Anomylised',
    dueDate: '2026-09-24',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'Anonymised property management transaction data review and validation.',
    files: [
      { name: 'UK_PM_TS_Data_Anomylised.xlsx', size: '3.2 MB', date: '2026-09-20', type: 'excel' },
      { name: 'Validation_Checksum_Log.txt', size: '14 KB', date: '2026-09-20', type: 'doc' }
    ],
    history: [
      { user: 'System', action: 'Uploaded file automatically via SFTP connector', timestamp: '2026-09-20 10:15 AM' },
      { user: 'DAP Admin', action: 'Assigned priority Medium', timestamp: '2026-09-20 11:00 AM' }
    ]
  },
  {
    id: '5696',
    refId: '101S20F11552D144',
    submissionNumber: '5696',
    title: 'SecureDataset',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Secure DAP team',
    propertyName: 'Enterprise Hub',
    dataset: 'SecureDataset',
    dueDate: '2026-09-24',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Secure DAP team dataset verification and security clearance check.',
    files: [
      { name: 'SecureDataset_TrialBalance.xlsx', size: '1.9 MB', date: '2026-09-21', type: 'excel' },
      { name: 'Compliance_Certificate.pdf', size: '420 KB', date: '2026-09-21', type: 'pdf' }
    ],
    history: [
      { user: 'System', action: 'Uploaded encrypted payload file', timestamp: '2026-09-21 11:30 AM' }
    ]
  },
  {
    id: '5694',
    refId: '250S20F11883D189',
    submissionNumber: '5694',
    title: 'Rule_Engine_01',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Rule_engine',
    propertyName: 'Automated Processing Center',
    dataset: 'Rule_Engine_01',
    dueDate: '2026-09-24',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'Rule engine batch execution outputs and discrepancy log.',
    files: [
      { name: 'Rule_Engine_01_Output.csv', size: '820 KB', date: '2026-09-21', type: 'csv' }
    ],
    history: [
      { user: 'System', action: 'Rule engine execution finished successfully', timestamp: '2026-09-21 02:45 PM' }
    ]
  },
  {
    id: '5692',
    refId: '275IS20F11418D203',
    submissionNumber: '5692',
    title: 'TrialBalanceData_1',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Analytics',
    propertyName: 'HQ Finance Hub',
    dataset: 'TrialBalanceData_1',
    dueDate: '2026-09-24',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'Trial balance consolidation for headquarter corporate cost centers.',
    files: [
      { name: 'TrialBalanceData_1.xlsx', size: '2.1 MB', date: '2026-09-22', type: 'excel' }
    ],
    history: [
      { user: 'Test keyas Entity Sp', action: 'Submitted batch #203', timestamp: '2026-09-22 08:30 AM' }
    ]
  },
  {
    id: '5691',
    refId: '76520F11418D129',
    submissionNumber: '5691',
    title: 'TrialBalanceData',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Analytics',
    propertyName: 'West Coast District',
    dataset: 'TrialBalanceData',
    dueDate: '2026-09-24',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'Low',
    assignedTo: 'DAP Admin',
    description: 'West coast regional entities operating trial balance ledger.',
    files: [
      { name: 'TrialBalanceData_WestCoast.xlsx', size: '1.4 MB', date: '2026-09-22', type: 'excel' }
    ],
    history: [
      { user: 'System', action: 'Auto-ingested via API gateway', timestamp: '2026-09-22 09:12 AM' }
    ]
  },
  {
    id: '5690',
    refId: '159IS20F11418D159',
    submissionNumber: '5690',
    title: 'PropertiesDetail',
    category: 'Loan',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Analytics',
    propertyName: 'Commercial Properties Group',
    dataset: 'PropertiesDetail',
    dueDate: '2026-09-24',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Commercial mortgage loan facility terms, amortization, and DSCR covenant data.',
    files: [
      { name: 'PropertiesDetail_Loan.pdf', size: '3.8 MB', date: '2026-09-22', type: 'pdf' },
      { name: 'Amortization_Schedule.xlsx', size: '920 KB', date: '2026-09-22', type: 'excel' }
    ],
    history: [
      { user: 'DAP Admin', action: 'Created loan covenant tracking entry', timestamp: '2026-09-22 10:05 AM' }
    ]
  },

  // --- Week 4 (Sep 21 - Sep 27, 2026) ---
  {
    id: '5689',
    refId: '322IS20F28D243',
    submissionNumber: '5689',
    title: 'Dataset_123',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Test Keyas1',
    propertyName: 'East Wing Facilities',
    dataset: 'Dataset_123',
    dueDate: '2026-09-25',
    postMonth: 'Sep, 2026',
    status: 'in-progress',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'Periodic facilities maintenance sub-ledger validation.',
    files: [
      { name: 'Dataset_123_October.xlsx', size: '1.7 MB', date: '2026-09-22', type: 'excel' }
    ],
    history: [
      { user: 'DAP Admin', action: 'In review by validation agent', timestamp: '2026-09-23 09:14 AM' }
    ]
  },
  {
    id: '5688',
    refId: '322IS20F28D243_OLD',
    submissionNumber: '5688',
    title: 'Dataset_123 (Feb 1995 Archive)',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Test Keyas1',
    propertyName: 'East Wing Facilities',
    dataset: 'Dataset_123',
    dueDate: '2026-09-23',
    postMonth: 'Feb, 1995',
    status: 'reopened_by_system',
    priority: 'Low',
    assignedTo: 'DAP Admin',
    description: 'System automatically flagged archived balance reconciliation for re-verification.',
    files: [
      { name: 'Dataset_123_Feb1995.xlsx', size: '940 KB', date: '2026-09-15', type: 'excel' }
    ],
    history: [
      { user: 'Automated Audit Bot', action: 'Reopened by System: Unmatched transaction detected in ledger index', timestamp: '2026-09-21 04:30 PM' }
    ]
  },
  {
    id: '5687',
    refId: '305IS20F11751D230',
    submissionNumber: '5687',
    title: 'DMAnomalyDataset',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'DM Enterprises',
    propertyName: 'Northwest Distribution Unit',
    dataset: 'DMAnomalyDataset',
    dueDate: '2026-09-22',
    postMonth: 'Feb, 1970',
    status: 'submitted_for_review',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Anomaly dataset submitted for compliance and signoff review.',
    files: [
      { name: 'DMAnomalyDataset_Review.pdf', size: '2.5 MB', date: '2026-09-18', type: 'pdf' }
    ],
    history: [
      { user: 'DM Enterprises', action: 'Submitted for signoff review', timestamp: '2026-09-21 03:15 PM' }
    ]
  },
  {
    id: '5686',
    refId: '412IS30F19D88',
    submissionNumber: '5686',
    title: 'Canary Wharf Tenant Rent Roll',
    category: 'Rent Roll',
    serviceProvider: 'CBRE Property Services',
    entityName: 'Metropolitan Commercial REIT',
    propertyName: 'Canary Wharf Tower B',
    dataset: 'Canary_Wharf_RR_Sep',
    dueDate: '2026-09-25',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'High',
    assignedTo: 'Sarah Jenkins',
    description: 'Monthly lease collections and occupancy roll-forward with lease expiry schedules.',
    files: [
      { name: 'Canary_Wharf_RR_Sep2026.xlsx', size: '5.1 MB', date: '2026-09-24', type: 'excel' },
      { name: 'Vacancy_Analysis_Memo.pdf', size: '1.2 MB', date: '2026-09-24', type: 'pdf' }
    ],
    history: [
      { user: 'CBRE Property Services', action: 'Uploaded rent roll', timestamp: '2026-09-24 08:20 AM' },
      { user: 'Sarah Jenkins', action: 'Completed and closed signoff', timestamp: '2026-09-24 02:40 PM' }
    ]
  },
  {
    id: '5685',
    refId: '809IS11F45D102',
    submissionNumber: '5685',
    title: 'Silicon Valley Campus OpEx Allocation',
    category: 'Journal Entry',
    serviceProvider: 'JLL Real Estate',
    entityName: 'Global Tech REIT',
    propertyName: 'Silicon Valley Tech Campus',
    dataset: 'OpEx_TechCampus_Q3',
    dueDate: '2026-09-26',
    postMonth: 'Sep, 2026',
    status: 'in-progress',
    priority: 'Medium',
    assignedTo: 'Marcus Vance',
    description: 'CAM charges and utility sub-metering allocations across tenant buildings.',
    files: [
      { name: 'OpEx_TechCampus_Q3.xlsx', size: '3.4 MB', date: '2026-09-24', type: 'excel' }
    ],
    history: [
      { user: 'Marcus Vance', action: 'Started variance audit', timestamp: '2026-09-25 10:10 AM' }
    ]
  },
  {
    id: '5684',
    refId: '622IS50F78D319',
    submissionNumber: '5684',
    title: 'Frankfurt Hub VAT Return Package',
    category: 'Tax Package',
    serviceProvider: 'PwC Tax & Compliance',
    entityName: 'European Logistics Real Estate IV',
    propertyName: 'Frankfurt Central Logistics',
    dataset: 'VAT_Frankfurt_Sep2026',
    dueDate: '2026-09-27',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'German cross-border VAT reconciliation and input tax refund submission.',
    files: [
      { name: 'VAT_Frankfurt_Sep2026.pdf', size: '2.8 MB', date: '2026-09-25', type: 'pdf' },
      { name: 'Input_Tax_Schedules.xlsx', size: '1.6 MB', date: '2026-09-25', type: 'excel' }
    ],
    history: [
      { user: 'PwC Tax & Compliance', action: 'Submitted draft tax package', timestamp: '2026-09-25 04:00 PM' }
    ]
  },

  // --- Week 1 (Sep 1 - Sep 6, 2026) ---
  {
    id: '5660',
    refId: '112IS10F01D011',
    submissionNumber: '5660',
    title: 'Nordic Fund Cash Balance Reconciliation',
    category: 'Bank Rec',
    serviceProvider: 'Apex Fund Administration',
    entityName: 'Nordic Prime Office Fund',
    propertyName: 'Stockholm Waterfront Hub',
    dataset: 'CashRec_Stockholm_Sep',
    dueDate: '2026-09-01',
    postMonth: 'Aug, 2026',
    status: 'completed',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'End-of-month treasury and bank statement clearing ledger.',
    files: [
      { name: 'CashRec_Stockholm_Aug2026.xlsx', size: '1.2 MB', date: '2026-08-31', type: 'excel' }
    ],
    history: [
      { user: 'DAP Admin', action: 'Approved and finalized', timestamp: '2026-09-01 03:00 PM' }
    ]
  },
  {
    id: '5661',
    refId: '113IS10F01D012',
    submissionNumber: '5661',
    title: 'September Opening Escrow Audit',
    category: 'Loan',
    serviceProvider: 'Cushman & Wakefield',
    entityName: 'Apex Capital Partners',
    propertyName: 'St. Peter\'s Square Plaza',
    dataset: 'Escrow_Audit_Sep2026',
    dueDate: '2026-09-01',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'Low',
    assignedTo: 'Sarah Jenkins',
    description: 'Lender tax and insurance reserve escrow account reconciliation.',
    files: [
      { name: 'Escrow_Audit_Report.pdf', size: '980 KB', date: '2026-09-01', type: 'pdf' }
    ],
    history: [
      { user: 'Sarah Jenkins', action: 'Matched against bank balance', timestamp: '2026-09-01 04:15 PM' }
    ]
  },
  {
    id: '5662',
    refId: '114IS10F02D015',
    submissionNumber: '5662',
    title: 'Media City Tenant Arrears Report',
    category: 'Rent Roll',
    serviceProvider: 'CMS Data Provider',
    entityName: 'CMS Settlement',
    propertyName: 'Manchester Media City Hub',
    dataset: 'Arrears_MediaCity_Q3',
    dueDate: '2026-09-02',
    postMonth: 'Sep, 2026',
    status: 'reopened',
    priority: 'High',
    assignedTo: 'Marcus Vance',
    description: 'Detailed 30/60/90 days aged arrears report with tenant dispute annotations.',
    files: [
      { name: 'Arrears_MediaCity_Q3.xlsx', size: '2.3 MB', date: '2026-09-01', type: 'excel' }
    ],
    history: [
      { user: 'Marcus Vance', action: 'Reopened for dispute verification on Suite 402', timestamp: '2026-09-03 11:15 AM' }
    ]
  },
  {
    id: '5663',
    refId: '115IS10F03D021',
    submissionNumber: '5663',
    title: 'Oxford Science Park Fixed Assets Register',
    category: 'Trial Balance',
    serviceProvider: 'Deloitte Real Estate',
    entityName: 'Life Sciences Real Estate Trust',
    propertyName: 'Oxford Science Park',
    dataset: 'FixedAssets_Oxford_Sep',
    dueDate: '2026-09-03',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'Lab equipment and tenant fit-out depreciation run.',
    files: [
      { name: 'FixedAssets_Oxford_Sep.xlsx', size: '4.1 MB', date: '2026-09-02', type: 'excel' }
    ],
    history: [
      { user: 'Deloitte Real Estate', action: 'Finalized book depreciation', timestamp: '2026-09-03 01:20 PM' }
    ]
  },
  {
    id: '5664',
    refId: '116IS10F04D028',
    submissionNumber: '5664',
    title: 'Amsterdam Logistics CapEx Draw #4',
    category: 'Loan',
    serviceProvider: 'Colliers International',
    entityName: 'European Logistics Real Estate IV',
    propertyName: 'Amsterdam Canal Office Suites',
    dataset: 'CapEx_Draw_Amsterdam_04',
    dueDate: '2026-09-04',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'High',
    assignedTo: 'Sarah Jenkins',
    description: 'Construction certificate and invoice dossier for solar panel installation.',
    files: [
      { name: 'CapEx_Draw_Amsterdam_04.pdf', size: '12.4 MB', date: '2026-09-03', type: 'pdf' },
      { name: 'Cost_Breakdown_Sheet.csv', size: '340 KB', date: '2026-09-03', type: 'csv' }
    ],
    history: [
      { user: 'Sarah Jenkins', action: 'Approved draw disbursement', timestamp: '2026-09-04 05:00 PM' }
    ]
  },
  {
    id: '5665',
    refId: '117IS10F05D033',
    submissionNumber: '5665',
    title: 'UK High Street AP Aging Ledger',
    category: 'AP Aging',
    serviceProvider: 'KPMG Forensic Audit',
    entityName: 'UK High Street Retail Fund',
    propertyName: 'UK Portfolio Complex',
    dataset: 'AP_Aging_HighStreet_Sep',
    dueDate: '2026-09-05',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'Accounts payable vendor aging analysis and early settlement discount reviews.',
    files: [
      { name: 'AP_Aging_HighStreet_Sep.xlsx', size: '1.9 MB', date: '2026-09-04', type: 'excel' }
    ],
    history: [
      { user: 'DAP Admin', action: 'Reconciled to master general ledger', timestamp: '2026-09-05 10:45 AM' }
    ]
  },

  // --- Week 2 (Sep 7 - Sep 13, 2026) ---
  {
    id: '5671',
    refId: '198IS30F63R31',
    submissionNumber: '5671',
    title: 'Seven Seas Report Package (Interim)',
    category: 'Rent Roll',
    serviceProvider: 'CMS Data Provider',
    entityName: 'CMS Settlement',
    propertyName: 'Seven Seas Plaza',
    dataset: 'Seven Seas Interim Rent Roll',
    dueDate: '2026-09-08',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Mid-month tenant rent collections and lease security deposit review.',
    files: [
      { name: 'Seven_Seas_Interim_RR.xlsx', size: '3.9 MB', date: '2026-09-07', type: 'excel' }
    ],
    history: [
      { user: 'CMS Data Provider', action: 'Submitted interim batch', timestamp: '2026-09-07 09:30 AM' }
    ]
  },
  {
    id: '5672',
    refId: '221IS20F15D055',
    submissionNumber: '5672',
    title: 'Enterprise Hub Utility Recovery Audit',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Secure DAP team',
    propertyName: 'Enterprise Hub',
    dataset: 'Utility_Audit_Sep2026',
    dueDate: '2026-09-09',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'Low',
    assignedTo: 'DAP Admin',
    description: 'HVAC and electricity submetering reconciliation across tenants.',
    files: [
      { name: 'Utility_Audit_Sep2026.xlsx', size: '1.5 MB', date: '2026-09-08', type: 'excel' }
    ],
    history: [
      { user: 'DAP Admin', action: 'Signed off', timestamp: '2026-09-09 02:00 PM' }
    ]
  },
  {
    id: '5673',
    refId: '224IS20F18D062',
    submissionNumber: '5673',
    title: 'Automated Processing Discrepancy File',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Rule_engine',
    propertyName: 'Automated Processing Center',
    dataset: 'Discrepancy_Log_09',
    dueDate: '2026-09-10',
    postMonth: 'Sep, 2026',
    status: 'in-progress',
    priority: 'High',
    assignedTo: 'Marcus Vance',
    description: 'System-generated discrepancies requiring manual accountant reconciliation.',
    files: [
      { name: 'Discrepancy_Log_09.csv', size: '480 KB', date: '2026-09-09', type: 'csv' }
    ],
    history: [
      { user: 'Marcus Vance', action: 'Investigating line items 45-52', timestamp: '2026-09-10 11:00 AM' }
    ]
  },
  {
    id: '5674',
    refId: '229IS30F21D075',
    submissionNumber: '5674',
    title: 'West Coast District Insurance Escrow Claim',
    category: 'Loan',
    serviceProvider: 'CBRE Property Services',
    entityName: 'Analytics',
    propertyName: 'West Coast District',
    dataset: 'Escrow_Claim_WC_01',
    dueDate: '2026-09-11',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'Medium',
    assignedTo: 'Sarah Jenkins',
    description: 'Roof storm repair claim draw submitted to lender escrow administrator.',
    files: [
      { name: 'Escrow_Claim_Dossier.pdf', size: '6.2 MB', date: '2026-09-10', type: 'pdf' }
    ],
    history: [
      { user: 'Sarah Jenkins', action: 'Funds released from escrow', timestamp: '2026-09-11 04:30 PM' }
    ]
  },
  {
    id: '5675',
    refId: '235IS40F25D088',
    submissionNumber: '5675',
    title: 'HQ Finance Hub Monthly Prepayments Roll',
    category: 'Journal Entry',
    serviceProvider: 'Ernst & Young Advisory',
    entityName: 'Analytics',
    propertyName: 'HQ Finance Hub',
    dataset: 'Prepayments_Roll_Sep',
    dueDate: '2026-09-12',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'Low',
    assignedTo: 'DAP Admin',
    description: 'Software licenses and corporate insurance monthly amortization voucher.',
    files: [
      { name: 'Prepayments_Roll_Sep.xlsx', size: '1.1 MB', date: '2026-09-11', type: 'excel' }
    ],
    history: [
      { user: 'DAP Admin', action: 'Posted to ledger', timestamp: '2026-09-12 11:20 AM' }
    ]
  },

  // --- Week 3 (Sep 14 - Sep 20, 2026) ---
  {
    id: '5680',
    refId: '301IS10F30D112',
    submissionNumber: '5680',
    title: 'Commercial Properties Interest Rate Swap Val',
    category: 'Loan',
    serviceProvider: 'Apex Capital Partners',
    entityName: 'Analytics',
    propertyName: 'Commercial Properties Group',
    dataset: 'Swap_Valuation_Sep',
    dueDate: '2026-09-15',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Mark-to-market derivative valuation certificate for SOFR hedging contracts.',
    files: [
      { name: 'Swap_MTM_Valuation.pdf', size: '2.1 MB', date: '2026-09-14', type: 'pdf' }
    ],
    history: [
      { user: 'Apex Capital Partners', action: 'Confirmed MTM pricing with counterparty bank', timestamp: '2026-09-15 01:00 PM' }
    ]
  },
  {
    id: '5681',
    refId: '302IS20F32D119',
    submissionNumber: '5681',
    title: 'East Wing Facilities Periodic Inventory',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Test Keyas1',
    propertyName: 'East Wing Facilities',
    dataset: 'Facilities_Inv_Sep',
    dueDate: '2026-09-16',
    postMonth: 'Sep, 2026',
    status: 'in-progress',
    priority: 'Medium',
    assignedTo: 'Marcus Vance',
    description: 'Physical equipment inspection and asset tagging count review.',
    files: [
      { name: 'Facilities_Inv_Sep.xlsx', size: '2.7 MB', date: '2026-09-15', type: 'excel' }
    ],
    history: [
      { user: 'Marcus Vance', action: 'Performing field audit check', timestamp: '2026-09-16 09:40 AM' }
    ]
  },
  {
    id: '5682',
    refId: '304IS30F35D125',
    submissionNumber: '5682',
    title: 'DM Enterprises Intercompany Reconciliation',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'DM Enterprises',
    propertyName: 'Northwest Distribution Unit',
    dataset: 'Intercompany_DM_Sep',
    dueDate: '2026-09-18',
    postMonth: 'Sep, 2026',
    status: 'reopened',
    priority: 'High',
    assignedTo: 'Sarah Jenkins',
    description: 'Cross-entity trade balances and management fee transfer charges.',
    files: [
      { name: 'Intercompany_DM_Sep.xlsx', size: '3.1 MB', date: '2026-09-17', type: 'excel' }
    ],
    history: [
      { user: 'System', action: 'Variance of €14,200 detected between entity 12 and DM Enterprises', timestamp: '2026-09-18 08:30 AM' },
      { user: 'Sarah Jenkins', action: 'Flagged for accountant clarification', timestamp: '2026-09-18 10:15 AM' }
    ]
  },
  {
    id: '5683',
    refId: '309IS40F38D130',
    submissionNumber: '5683',
    title: 'UK Portfolio Complex Statutory Lease Filings',
    category: 'Rent Roll',
    serviceProvider: 'Knight Frank Valuation',
    entityName: 'UK High Street Retail Fund',
    propertyName: 'UK Portfolio Complex',
    dataset: 'Statutory_Lease_Filings_2026',
    dueDate: '2026-09-19',
    postMonth: 'Sep, 2026',
    status: 'completed',
    priority: 'Low',
    assignedTo: 'DAP Admin',
    description: 'Land Registry lease deeds and Stamp Duty Land Tax certificates.',
    files: [
      { name: 'SDLT_Certificate_Bundle.pdf', size: '8.4 MB', date: '2026-09-18', type: 'pdf' }
    ],
    history: [
      { user: 'DAP Admin', action: 'Archived into compliance vault', timestamp: '2026-09-19 03:20 PM' }
    ]
  },

  // --- Week 5 (Sep 28 - Sep 30, 2026) ---
  {
    id: '5701',
    refId: '512IS20F11D401',
    submissionNumber: '5701',
    title: 'September Month-End Ledger Close Package',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Analytics',
    propertyName: 'Enterprise Hub',
    dataset: 'MonthEnd_Close_Sep2026',
    dueDate: '2026-09-28',
    postMonth: 'Sep, 2026',
    status: 'in-progress',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Consolidated trial balance close package including accruals and closing entries.',
    files: [
      { name: 'MonthEnd_Close_Sep2026.xlsx', size: '6.7 MB', date: '2026-09-27', type: 'excel' },
      { name: 'Financial_Statement_Draft.pdf', size: '3.1 MB', date: '2026-09-27', type: 'pdf' }
    ],
    history: [
      { user: 'DAP Admin', action: 'Reviewing trial balance reconciliations', timestamp: '2026-09-28 09:00 AM' }
    ]
  },
  {
    id: '5702',
    refId: '515IS20F14D412',
    submissionNumber: '5702',
    title: 'Automated Processing Engine Final Run',
    category: 'Trial Balance',
    serviceProvider: 'Test keyas Entity Sp',
    entityName: 'Rule_engine',
    propertyName: 'Automated Processing Center',
    dataset: 'Rule_Engine_FinalRun',
    dueDate: '2026-09-29',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'Medium',
    assignedTo: 'DAP Admin',
    description: 'Final automated batch rule verification before books lock.',
    files: [
      { name: 'Rule_Engine_FinalRun.csv', size: '1.1 MB', date: '2026-09-28', type: 'csv' }
    ],
    history: [
      { user: 'System', action: 'Scheduled batch scheduled for 23:59 GMT', timestamp: '2026-09-28 10:00 AM' }
    ]
  },
  {
    id: '5703',
    refId: '519IS30F18D420',
    submissionNumber: '5703',
    title: 'Canary Wharf Tower B Q3 Rent Settlement',
    category: 'Rent Roll',
    serviceProvider: 'CBRE Property Services',
    entityName: 'Metropolitan Commercial REIT',
    propertyName: 'Canary Wharf Tower B',
    dataset: 'Canary_Wharf_Q3_Settlement',
    dueDate: '2026-09-30',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'High',
    assignedTo: 'Sarah Jenkins',
    description: 'Quarterly commercial tenant rent reconciliation and turnover rent audits.',
    files: [
      { name: 'Canary_Wharf_Q3_Settlement.xlsx', size: '5.4 MB', date: '2026-09-29', type: 'excel' }
    ],
    history: [
      { user: 'CBRE Property Services', action: 'Package prepared for auditor signoff', timestamp: '2026-09-29 04:45 PM' }
    ]
  },
  {
    id: '5704',
    refId: '522IS40F22D435',
    submissionNumber: '5704',
    title: 'Frankfurt Hub September Cash Settlement',
    category: 'Bank Rec',
    serviceProvider: 'PwC Tax & Compliance',
    entityName: 'European Logistics Real Estate IV',
    propertyName: 'Frankfurt Central Logistics',
    dataset: 'Cash_Settlement_Frankfurt',
    dueDate: '2026-09-30',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'Medium',
    assignedTo: 'Marcus Vance',
    description: 'Inter-banking clearing statement and foreign currency balance revaluation.',
    files: [
      { name: 'Cash_Settlement_Frankfurt.xlsx', size: '2.2 MB', date: '2026-09-29', type: 'excel' }
    ],
    history: [
      { user: 'Marcus Vance', action: 'Pending final bank statement feed', timestamp: '2026-09-30 08:15 AM' }
    ]
  },

  // --- October 2026 Submissions (Upcoming in Theme Screenshot) ---
  {
    id: '5693',
    refId: '198IS30F63R31',
    submissionNumber: '5693',
    title: 'Seven Seas Report Package',
    category: 'Rent Roll',
    serviceProvider: 'CMS Data Provider',
    entityName: 'CMS Settlement',
    propertyName: 'Seven Seas Plaza',
    dataset: 'Seven Seas Report Package',
    dueDate: '2026-10-07',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Seven Seas consolidated lease rent roll and vacancy reporting package.',
    files: [
      { name: 'Seven_Seas_RentRoll_Package.xlsx', size: '4.6 MB', date: '2026-09-22', type: 'excel' }
    ],
    history: [
      { user: 'CMS Data Provider', action: 'Submitted package', timestamp: '2026-09-22 09:10 AM' }
    ]
  },
  {
    id: '5710',
    refId: '601IS10F05D501',
    submissionNumber: '5710',
    title: 'Q3 Consolidated Group Tax Provision',
    category: 'Tax Package',
    serviceProvider: 'PwC Tax & Compliance',
    entityName: 'Analytics',
    propertyName: 'HQ Finance Hub',
    dataset: 'Tax_Provision_Q3_2026',
    dueDate: '2026-10-15',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'High',
    assignedTo: 'DAP Admin',
    description: 'Quarterly corporate income tax accruals and deferred tax asset computations.',
    files: [
      { name: 'Tax_Provision_Q3_2026.pdf', size: '4.8 MB', date: '2026-09-23', type: 'pdf' },
      { name: 'Deferred_Tax_Models.xlsx', size: '3.9 MB', date: '2026-09-23', type: 'excel' }
    ],
    history: [
      { user: 'PwC Tax & Compliance', action: 'Draft model generated', timestamp: '2026-09-23 01:15 PM' }
    ]
  },
  {
    id: '5711',
    refId: '605IS20F12D510',
    submissionNumber: '5711',
    title: 'Nordic Fund Q3 Asset Appraisals',
    category: 'Trial Balance',
    serviceProvider: 'Knight Frank Valuation',
    entityName: 'Nordic Prime Office Fund',
    propertyName: 'Stockholm Waterfront Hub',
    dataset: 'Appraisals_Nordic_Q3',
    dueDate: '2026-10-18',
    postMonth: 'Sep, 2026',
    status: 'new',
    priority: 'Medium',
    assignedTo: 'Sarah Jenkins',
    description: 'Independent RICS valuation certificate for investment property portfolio.',
    files: [
      { name: 'Appraisal_Report_Nordic.pdf', size: '18.2 MB', date: '2026-09-23', type: 'pdf' }
    ],
    history: [
      { user: 'Knight Frank Valuation', action: 'Uploaded certified valuation documents', timestamp: '2026-09-23 03:00 PM' }
    ]
  }
];

export const KPI_METRICS = {
  newSubmissions: 573,
  inProgress: 226,
  completedClosed: 175,
  reopened: 125
};
