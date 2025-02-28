"use client";
import { Input } from "@/components/(auth)/input";
import { Select, MultiSelect } from "@/components/(auth)/select";
import { motion, AnimatePresence } from "framer-motion";
import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import cn from "@/utils/cn";

type ButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "h-10 w-full rounded-xl border border-zinc-100/20",
          "bg-blue-600 transition-colors hover:bg-blue-700",
        )}
        {...props}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";

function OnBoardBasic() {
  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex h-full flex-col gap-4"
      >
        <motion.h1
          className="font-display self-start text-4xl font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Basic Info
        </motion.h1>
        <Input label="Email" />
        <Input label="Password" type="password" />
      </motion.div>
    </div>
  );
}
function OnBoardProfile() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <motion.h1 className="font-display text-4xl font-medium">
        Profile Details
      </motion.h1>
      <div className="flex w-full flex-col items-center gap-4">
        <motion.div
          variants={item}
          className="relative flex h-48 w-full items-end justify-center"
        >
          <button
            className={cn(
              "border border-white/25",
              "flex justify-center pt-5",
              "group relative h-full w-full",
              !bannerImage && "bg-zinc-600",
              "bg-cover bg-center transition-all",
              "text-transparent hover:text-zinc-200",
              "absolute z-10 overflow-hidden rounded-lg",
              "cursor-pointer",
            )}
            type="button"
            style={
              bannerImage ? { backgroundImage: `url(${bannerImage})` } : {}
            }
            onClick={() => setBannerImage("")}
          >
            <p className="z-20 text-sm">Change banner</p>
            <div className="absolute top-0 z-19 size-full bg-black/0 transition-colors hover:bg-black/20" />
          </button>
          <button
            className={cn(
              "group relative size-32 rounded-full",
              !profilePicture && "bg-zinc-700",
              "text-transparent hover:text-zinc-200",
              "bg-cover bg-center transition-all",
              "z-20 mb-2 cursor-pointer overflow-hidden",
              "border border-white/25",
            )}
            type="button"
            style={
              profilePicture
                ? { backgroundImage: `url(${profilePicture})` }
                : {}
            }
            onClick={() => setProfilePicture("")}
          >
            <p className="z-20 text-sm">Change picture</p>
            <div className="absolute top-0 z-19 size-full bg-black/0 transition-colors hover:bg-black/20" />
          </button>
        </motion.div>
        <Input label="Username" />
      </div>
    </motion.div>
  );
}
function OnBoardPreferences() {
  const techStackOptions = [
    { label: "Go", value: "Go" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "Rust", value: "Rust" },
    { label: "Java", value: "Java" },
    { label: ".NET", value: ".NET" },
    { label: "Elixir", value: "Elixir" },
    { label: "Python", value: "Python" },
    { label: "Ruby", value: "Ruby" },
    { label: "C++", value: "C++" },
    { label: "PHP", value: "PHP" },
    { label: "Swift", value: "Swift" },
    { label: "Kotlin", value: "Kotlin" },
    { label: "Scala", value: "Scala" },
    { label: "Dart", value: "Dart" },
    { label: "C#", value: "C#" },
    { label: "R", value: "R" },
    { label: "SQL", value: "SQL" },
    { label: "HTML", value: "HTML" },
    { label: "CSS", value: "CSS" },
    { label: "Bash", value: "Bash" },
    { label: "Perl", value: "Perl" },
    { label: "COBOL", value: "COBOL" },
    { label: "Clojure", value: "Clojure" },
    { label: "Lua", value: "Lua" },
    { label: "Assembly", value: "Assembly" },
  ];

  return (
    <div className="h-full">
      <h1 className="font-display text-4xl font-medium">Preferences</h1>
      <div className="flex flex-col gap-4">
        <Select
          label="Account Privacy"
          name="privacyStatus"
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
        />
        <MultiSelect
          label="Preferred Stacks"
          name="preferredStacks"
          options={techStackOptions.map((obj) => ({
            label: obj.label,
            value: obj.value,
          }))}
          defaultValue={[]}
        />
        <select
          name=""
          id=""
          className="h-10 w-full rounded-lg border border-white/10 bg-white/5"
        >
          <option value="">Teste</option>
          <option value="">Teste</option>
          <option value="">Teste</option>
          <option value="">Teste</option>
        </select>
      </div>
    </div>
  );
}

export default function Auth() {
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const router = useRouter();

  const handlePrevStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDirection("prev");

    if (step === 1) router.push("/");

    setTimeout(() => {
      setStep((prev) => Math.max(prev - 1, 1));
    }, 50);
  };

  const handleNextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDirection("next");

    // let valid = false;

    // if (step === 1) valid = await methods.trigger(["email", "password"]);
    // else if (step === 2) valid = await methods.trigger(["username"]);

    // if (!valid) {
    //   console.log("Validation failed", methods.formState.errors);
    //   return;
    // }

    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, 3));
    }, 50);
  };

  const slideVariants = {
    enterFromRight: {
      x: 100,
      opacity: 0,
      scale: 0.95,
    },
    enterFromLeft: {
      x: -100,
      opacity: 0,
      scale: 0.95,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exitToLeft: {
      x: -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    exitToRight: {
      x: 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <main className="flex h-screen w-screen">
        <div className="hidden h-screen w-full bg-zinc-800 lg:block"></div>
        <div className="relative flex h-screen w-full flex-col justify-center overflow-hidden px-4">
          <form className="w-full px-48">
            <div
              className={cn(
                "relative transition-all",
                step === 1 && "h-62",
                step === 2 && "h-88",
                step === 3 && "h-60",
              )}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  variants={slideVariants}
                  initial={
                    direction === "next" ? "enterFromRight" : "enterFromLeft"
                  }
                  animate="center"
                  exit={direction === "next" ? "exitToLeft" : "exitToRight"}
                  className="absolute h-full w-full"
                >
                  {step === 1 && <OnBoardBasic />}
                  {step === 2 && <OnBoardProfile />}
                  {step === 3 && <OnBoardPreferences />}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                label={step === 1 ? "Exit" : "Return"}
                onClick={handlePrevStep}
                type="button"
              />
              {step === 3 ? (
                <Button label="Finish" type="submit" />
              ) : (
                <Button label="Next" onClick={handleNextStep} type="button" />
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
