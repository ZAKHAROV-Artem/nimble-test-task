import zod from "zod";

export const AddTagSchema = zod.object({
  tags: zod
    .string()
    .min(1, { message: "Tags are required" })
    .regex(/[a-z]+(,\s*[a-z]+)*/, "Invalid tags format"),
});

export type AddTagFields = zod.infer<typeof AddTagSchema>;
