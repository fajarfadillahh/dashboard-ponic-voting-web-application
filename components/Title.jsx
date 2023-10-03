export default function Title({ text, className }) {
  return (
    <h1 className="text-[28px] font-extrabold text-gray-900">
      {text}
      <span className="text-pink-500">.</span>
    </h1>
  );
}
