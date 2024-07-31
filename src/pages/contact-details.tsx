import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAddTagsMutation,
  useGetContactQuery,
} from "@/store/contacts/contacts-api";
import { AddTagFields, AddTagSchema } from "@/types/validation/add-tag-schema";

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
    <div className="mx-auto max-w-screen-sm space-y-5 px-5 py-10">
      <div className="flex gap-x-5">
        <div className="min-w-16">
          <img
            src={contact?.avatar_url}
            className="h-16 w-16 rounded-full"
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
        <h3 className="mb-3 text-xl font-semibold">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {contact?.tags.map((tag) => (
            <span
              key={tag.id}
              className="mr-2 rounded-sm bg-gray-400 px-3 py-1 text-sm font-semibold text-black"
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
            className="rounded-lg border-2 border-gray-400 p-3 text-lg"
          />
          {errors.tags && (
            <span className="text-sm text-red-500">{errors.tags.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="mt-3 w-full rounded-lg border-2 border-gray-400 p-3 text-xl font-bold duration-200 hover:bg-gray-400 hover:text-white"
        >
          Add contact
        </button>
      </form>
    </div>
  );
}
