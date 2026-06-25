import Application from "../models/Application";

export async function getUserApplications(userId: string) {
  return Application.find({ userId });
}