const Detail = ({
  label,
  value,
  badgeColor,
  isMultiline = false,
  children,
}: {
  label: string;
  value?: string | number;
  badgeColor?: string;
  isMultiline?: boolean;
  children?: React.ReactNode;
}) => {
  if (!value && !children) return null;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1">
      <span className="font-medium text-neutral-400">{label}</span>

      {children ? (
        children
      ) : badgeColor ? (
        <span
          className={`text-sm px-3 py-1 rounded-full ${badgeColor} text-white font-semibold uppercase`}
        >
          {value}
        </span>
      ) : isMultiline ? (
        <p className="text-white whitespace-pre-line">{value}</p>
      ) : (
        <span className="text-white">{value}</span>
      )}
    </div>
  );
};

export default Detail;
