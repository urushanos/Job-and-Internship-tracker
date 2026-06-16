'use client'

type formProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function FormComponent({ label, name, value, onChange }: formProps) {
  return (
    <div className="flex justify-between items-center">
      <label className="mr-10 my-10" htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded w-80 h-10 px-3"
      />
    </div>
  );
}