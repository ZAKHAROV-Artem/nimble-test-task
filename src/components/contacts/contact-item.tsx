import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

import { useDeleteContactMutation } from "@/store/contacts/contactsApi";
import { Contact } from "@/types/contacts";

type ContactItemProps = {
  contact: Contact;
};
export default function ContactItem({ contact }: ContactItemProps) {
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(contact.id).then(() => {
        toast.success("Contact deleted successfully");
      });
    }
  };
  return (
    <div className="relative rounded-md bg-gray-200 p-5">
      <Link to={`/contact/${contact.id}`} className="flex gap-x-2">
        <div className="min-w-16">
          <img
            alt={`${contact.fields?.["first name"]?.[0]?.value || ""} ${contact.fields?.["last name"]?.[0]?.value || ""}'s avatar`}
            src={contact.avatar_url}
            className="h-16 w-16 rounded-full"
          />
        </div>
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">
              {contact.fields?.["first name"]?.[0]?.value || ""}{" "}
              {contact.fields?.["last name"]?.[0]?.value || ""}
            </h3>
            <h3 className="text-xl font-semibold">
              {contact.fields?.email?.[0]?.value || ""}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {contact.tags.map((tag) => (
              <span
                key={tag.id}
                className="mr-2 rounded-sm bg-gray-400 px-3 py-1 text-sm font-semibold text-black"
              >
                {tag.tag}
              </span>
            ))}
          </div>
        </div>{" "}
      </Link>
      <IoMdCloseCircleOutline
        onClick={handleDelete}
        className="absolute right-3 top-3 h-6 w-6"
      />
    </div>
  );
}
