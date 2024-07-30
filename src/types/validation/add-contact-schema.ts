import zod from "zod";

export const AddContactSchema = zod.object({
  firstName: zod.string().min(1, { message: "First name is required" }),
  lastName: zod.string().min(1, { message: "Last name is required" }),
  email: zod.string().email({ message: "Invalid email address" }),
});

export type AddContactFields = zod.infer<typeof AddContactSchema>;
