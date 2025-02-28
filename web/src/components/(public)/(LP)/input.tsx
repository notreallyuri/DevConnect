import cn from "@/utils/cn";

export default function LPInput() {
  return (
    <div
      className={cn(
        "mt-4 flex h-14 w-96 overflow-hidden bg-white p-1",
        "gap-2 rounded-lg",
      )}
    >
      <div
        className={cn(
          "h-full w-full border border-transparent",
          "relative overflow-hidden rounded-lg focus-within:border-blue-400",
          "transition-all",
        )}
      >
        <input
          type="text"
          id="sign"
          className={cn(
            "group peer h-full w-full rounded-lg transition-colors outline-none",
            "text-black disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-transparent focus:placeholder:text-gray-400",
            "flex justify-end px-4 pt-5",
          )}
          placeholder="you@domain.com"
        />
        <label
          htmlFor="sign"
          className={cn(
            "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-700",
            "placeholder-shown:top-4",
            "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs",
            "peer-focus:top-3 peer-focus:text-xs",
            "transition-all",
          )}
        >
          Enter your email
        </label>
      </div>
      <button
        className={cn(
          "flex h-full shrink-0 items-center justify-center px-4",
          "rounded-lg transition-colors cursor-pointer",
          "bg-blue-400 hover:bg-blue-500",
        )}
      >
        Join Now
      </button>
    </div>
  );
}
