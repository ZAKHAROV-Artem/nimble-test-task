import { useGetContactsQuery } from "@/store/contacts/contactsApi";

import ContactItem from "./contact-item";

export default function Contacts() {
  const { data } = useGetContactsQuery();
  return (
    <div>
      <h2 className="text-3xl mb-5">Contacts</h2>
      <div className="flex flex-col gap-y-5 pb-5">
        {data?.resources.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
