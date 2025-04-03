'use client';

type InputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: 'text' | 'password';
  disabled?: boolean;
};

export const Input = ({
  name,
  value,
  onChange,
  label,
  type = 'text',
  disabled = false,
}: InputProps) => {
  return (
    <div className="relative group">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 group-hover:border-gray-300"
        placeholder=" "
        disabled={disabled}
        required
      />
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 bg-white px-1 ${
          value ? 'top-0 text-xs text-blue-500 -translate-y-1/2' : 'top-1/2 text-gray-500 -translate-y-1/2'
        } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-translate-y-1/2`}
      >
        {label}
      </label>
    </div>
  );
};