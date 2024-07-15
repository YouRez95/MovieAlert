export default function CardProcess({
  step,
  icon,
  heading,
  text,
  bg,
  textColor,
  badge,
}) {
  const Icon = icon;
  return (
    <div className={`relative rounded-md ${bg} ${textColor}`}>
      <span className="absolute text-[200px] -bottom-2 -left-6 opacity-20 font-secondary">
        {step}
      </span>
      <div className="p-6 md:p-10">
        <div className="flex gap-1 items-baseline">
          <Icon className="w-9 h-9" />
          <h2 className="font-primary text-xl">{heading}</h2>
        </div>
        <p className="font-secondary">{text}</p>

        <img src={badge} className="w-16 h-16 absolute top-0 right-0" />
      </div>
    </div>
  );
}
