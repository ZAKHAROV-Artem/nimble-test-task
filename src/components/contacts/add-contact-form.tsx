import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  AddContactFields,
  AddContactSchema,
} from "../../types/validation/add-contact-schema";

export default function AddContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddContactFields>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    resolver: zodResolver(AddContactSchema),
  });

  const onSubmit: SubmitHandler<AddContactFields> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl mb-5">Create contact</h2>
      <div className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="firstName">First name</label>
          <input
            {...register("firstName")}
            id="firstName"
            type="text"
            className="border-2 rounded-lg p-3 text-lg border-gray-400"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last name</label>
          <input
            {...register("lastName")}
            id="lastName"
            type="text"
            className="border-2 rounded-lg p-3 text-lg border-gray-400"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="border-2 rounded-lg p-3 text-lg border-gray-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="border-2 mt-3 hover:bg-gray-400 duration-200 hover:text-white border-gray-400 w-full p-3 rounded-lg font-bold text-xl"
      >
        Add contact
      </button>
    </form>
  );
}
