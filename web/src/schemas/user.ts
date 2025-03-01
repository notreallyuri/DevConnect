import { z } from "zod";

const preferredStack = z.enum([
  "Typescript",
  "Go",
  "Javascript",
  "Rust",
  "Java",
  ".NET",
  "Elixir",
  "Python",
  "Ruby",
  "C++",
  "PHP",
  "Swift",
  "Kotlin",
  "Scala",
  "Dart",
  "C#",
  "HTML",
  "CSS",
  "Bash",
  "Perl",
  "COBOL",
  "Assembly",
  "Lua",
  "SQL",
  "R",
  "Clojure",
]);

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(4),
  password: z.string().min(4),

  preferredStack: z.array(preferredStack).min(1),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
