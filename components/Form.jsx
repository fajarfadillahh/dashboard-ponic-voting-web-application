export default function Form({
  type,
  placeholder,
  className,
  onChange,
  value,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`flex h-[48px] w-full rounded-md bg-gray-100 px-6 text-base font-bold text-gray-900 outline-none placeholder:text-[14px] placeholder:font-semibold placeholder:text-gray-600 focus:border focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 dark:bg-blue-gray-800 dark:text-white dark:placeholder:text-blue-gray-200 ${className}`}
      onChange={onChange}
      value={value}
    />
  );
}
