import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { useAddContactMutation } from "@/store/contacts/contacts-api";
import {
  AddContactFields,
  AddContactSchema,
} from "@/types/validation/add-contact-schema";

export default function AddContactForm() {
  const [addContact] = useAddContactMutation();
  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit: SubmitHandler<AddContactFields> = async (data) => {
    await addContact({
      record_type: "person",
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
      fields: {
        "first name": [
          { value: data.firstName, modifier: "", label: "first name" },
        ],
        "last name": [
          { value: data.lastName, modifier: "", label: "last name" },
        ],
        email: [{ value: data.email, modifier: "", label: "email" }],
      },
    }).then(() => {
      toast.success("Contact added successfully");
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-5 text-3xl">Create contact</h2>
      <div className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="firstName">First name</label>
          <input
            {...register("firstName")}
            id="firstName"
            type="text"
            className="rounded-lg border-2 border-gray-400 p-3 text-lg"
          />
          {errors.firstName && (
            <span className="text-sm text-red-500">
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
            className="rounded-lg border-2 border-gray-400 p-3 text-lg"
          />
          {errors.lastName && (
            <span className="text-sm text-red-500">
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
            className="rounded-lg border-2 border-gray-400 p-3 text-lg"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-3 w-full rounded-lg border-2 border-gray-400 p-3 text-xl font-bold duration-200 hover:bg-gray-400 hover:text-white"
      >
        Add contact
      </button>
    </form>
  );
}
