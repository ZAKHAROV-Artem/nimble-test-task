import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import {
  useAddTagsMutation,
  useGetContactQuery,
} from "../store/contacts/contactsApi";
import { AddTagFields, AddTagSchema } from "../types/validation/add-tag-schema";

export default function ContactDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: contact, error, isLoading } = useGetContactQuery(id!);
  const [addTag] = useAddTagsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTagFields>({
    defaultValues: {
      tags: "",
    },
    resolver: zodResolver(AddTagSchema),
  });

  const onSubmit: SubmitHandler<AddTagFields> = async (data) => {
    await addTag({
      id: id!,
      tags: [
        ...contact!.tags.map((tag) => tag.tag),
        ...data.tags.split(",").map((tag) => tag.trim()),
      ],
    }).then(() => {
      toast.success("Tag added successfully");
      reset();
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading contact</div>;

  return (
    <div className="max-w-screen-sm px-5 mx-auto py-10 space-y-5">
      <div className="flex gap-x-5">
        <div className="min-w-16">
          <img
            src={contact?.avatar_url}
            className="w-16 h-16 rounded-full"
            alt=""
          />
        </div>
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">
              {contact?.fields?.["first name"]?.[0]?.value || ""}{" "}
              {contact?.fields?.["last name"]?.[0]?.value || ""}
            </h3>
            <h3 className="text-xl font-semibold">
              {contact?.fields?.email?.[0]?.value || ""}
            </h3>
          </div>
        </div>{" "}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {contact?.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-400 text-black rounded-sm px-3 py-1 text-sm font-semibold mr-2"
            >
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="tags">Add new tags</label>
          <input
            {...register("tags")}
            type="text"
            id="tags"
            placeholder="ex: tag1, tag2, tag3"
            className="border-2 rounded-lg p-3 text-lg border-gray-400"
          />
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="border-2 mt-3 hover:bg-gray-400 duration-200 hover:text-white border-gray-400 w-full p-3 rounded-lg font-bold text-xl"
        >
          Add contact
        </button>
      </form>
    </div>
  );
}
