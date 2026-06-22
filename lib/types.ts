/** Shared domain types used across client components and API routes */

export interface Application {
  _id: string;
  companyName: string;
  roleTitle: string;
  dateApplied: Date;
  source: string;
  status: string;
}
