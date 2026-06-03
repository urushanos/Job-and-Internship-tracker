'use client'

type FormDateProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function FormDate({ value, onChange }: FormDateProps) {
  return (
    <div className="flex justify-between items-center">
      <label className="mr-10 my-10">Date Applied</label>
      <input
        type="date"
        name="dateApplied"
        value={value}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        className="border rounded w-80 h-10 px-3"
      />
    </div>
  );
}