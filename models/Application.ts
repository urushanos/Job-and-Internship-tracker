import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IApplication extends Document {
  userId: string,
  companyName: string;
  roleTitle: string;
  dateApplied: Date;
  source: string;
  status: {
  type: String,
  enum: [
    "Applied",
    "Interviewing",
    "Offered",
    "Rejected",
    "Withdrawn"
  ],
  default: "Applied",
};
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    userId:      { type: String, required: true, index: true},
    companyName: { type: String, required: true },
    roleTitle:   { type: String, required: true },
    dateApplied: { type: Date },
    source:      { type: String },
    status:      { type: String, default: "Applied" },
  },
  { timestamps: true }
);

// Prevent "Cannot overwrite model once compiled" error during Next.js hot reload
const Application: Model<IApplication> =
  (models.Application as Model<IApplication>) ||
  mongoose.model<IApplication>("Application", applicationSchema);

export default Application;
