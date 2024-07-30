import { IoMdCloseCircleOutline } from "react-icons/io";

import { Contact } from "../../types/contacts";

type ContactItemProps = {
  contact: Contact;
};
export default function ContactItem({ contact }: ContactItemProps) {
  return (
    <div className="bg-gray-200 rounded-md p-5 relative flex gap-x-2">
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
      </div>
      <IoMdCloseCircleOutline className="absolute top-3 right-3 w-6 h-6" />
    </div>
  );
}
