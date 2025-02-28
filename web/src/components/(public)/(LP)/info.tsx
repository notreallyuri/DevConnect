import cn from "@/utils/cn";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InfoSquare({
  icon,
  title,
  desc,
  className,
}: {
  title: string;
  desc: string;
  icon?: IconDefinition;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-6 backdrop-blur-3xl",
        "border-white/20 bg-white/1 hover:bg-white/2.5",
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <FontAwesomeIcon icon={icon} className={cn("text-lg", className)} />
        )}
        <h3 className="font-display text-2xl font-semibold select-none">
          {title}
        </h3>
      </div>
      <p className="text-gray-400 select-none">{desc}</p>
    </div>
  );
}
