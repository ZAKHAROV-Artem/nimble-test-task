import { useGetContactsQuery } from "@/store/contacts/contacts-api";

import ContactItem from "./contact-item";

export default function Contacts() {
  const { data } = useGetContactsQuery();
  return (
    <div>
      <h2 className="mb-5 text-3xl">Contacts</h2>
      <div className="flex flex-col gap-y-5 pb-5">
        {data?.resources.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
