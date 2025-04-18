export const LEAVE_TYPE_FORM: Record<string, string> = {
  ANNUAL: 'Annual',
  SICK: 'Sick',
  MATERNITY: 'Maternity',
  COMPASSIONATE: 'Casual',
};

export const RELIEF_OFFICER_OPTIONS = [
  { value: 'June Heaney', label: 'June Heaney' },
  { value: 'Rudy Witting', label: 'Rudy Witting' },
  { value: 'Elaine Prohaska', label: 'Elaine Prohaska' },
  { value: 'Jordan Corwin', label: 'Jordan Corwin' },
  { value: 'Nadine Collins', label: 'Nadine Collins' },
  { value: 'Caleb Thiel', label: 'Caleb Thiel' },
];

export const JOB_CATEGORY_OPTIONS = [
  { value: 'Full Time', label: 'Full Time' },
  { value: 'Part Time', label: 'Part Time' },
];

export const RELATIONSHIP_OPTIONS = [
  { value: 'relative', label: 'Relative' },
  { value: 'independent', label: 'Independent' },
];

export enum RoleAuthentication {
  Admin = 'admin',
  Employee = 'employee',
  Candidate = 'candidate',
}
