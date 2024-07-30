import zod from "zod";

export const AddTagSchema = zod.object({
  tag: zod.string().min(1, { message: "Tag name is required" }),
});

export type AddTagFields = zod.infer<typeof AddTagSchema>;
