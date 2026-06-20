'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormComponent from "./FormComponent";
import FormDate from "./FormDate";

const STATUS_OPTIONS = ["Applied", "In Review", "Interviewing", "Rejected", "Offered"];

export default function ApplicationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: "",
    roleTitle: "",
    dateApplied: "",
    source: "",
    status: "Applied",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ companyName?: string; roleTitle?: string }>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();   

    // client-side validation
    const errors: { companyName?: string; roleTitle?: string } = {};
    if (!formData.companyName.trim()) errors.companyName = "Company name is required.";
    if (!formData.roleTitle.trim())   errors.roleTitle   = "Role title is required.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Server error");
      }

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to save. Make sure Next.js application is running and MONGO_URI is set.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"          
      className="flex flex-col"
    >
      <FormComponent
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
      />
      {fieldErrors.companyName && (
        <p className="text-red-500 text-xs -mt-6 mb-2 text-right">{fieldErrors.companyName}</p>
      )}

      <FormComponent
        label="Role Title"
        name="roleTitle"
        value={formData.roleTitle}
        onChange={handleChange}
      />
      {fieldErrors.roleTitle && (
        <p className="text-red-500 text-xs -mt-6 mb-2 text-right">{fieldErrors.roleTitle}</p>
      )}

      <FormDate value={formData.dateApplied} onChange={handleChange} />

      <FormComponent
        label="Source"
        name="source"
        value={formData.source}
        onChange={handleChange}
      />
      
      <div className="flex justify-between items-center">
        <label className="mr-10 my-10">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded w-80 h-10 px-3 bg-white"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-black px-3 py-2 mt-4 rounded text-white disabled:opacity-50 transition-opacity"
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}