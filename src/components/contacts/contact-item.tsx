import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

import { useDeleteContactMutation } from "../../store/contacts/contactsApi";
import { Contact } from "../../types/contacts";

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
    <div className="bg-gray-200 rounded-md p-5 relative">
      <Link to={`/contact/${contact.id}`} className="flex gap-x-2">
        <div className="min-w-16">
          <img
            src={contact.avatar_url}
            className="w-16 h-16 rounded-full"
            alt=""
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
                className="bg-gray-400 text-black rounded-sm px-3 py-1 text-sm font-semibold mr-2"
              >
                {tag.tag}
              </span>
            ))}
          </div>
        </div>{" "}
      </Link>
      <IoMdCloseCircleOutline
        onClick={handleDelete}
        className="absolute top-3 right-3 w-6 h-6"
      />
    </div>
  );
}
