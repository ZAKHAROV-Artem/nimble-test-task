import { AddContactForm, Contacts } from "@/components/contacts";

export default function ContactsPage() {
  return (
    <div className="container grid gap-10 pt-10 md:grid-cols-[1fr,2fr]">
      <AddContactForm />
      <Contacts />
    </div>
  );
}
