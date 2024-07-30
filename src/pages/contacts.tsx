import { AddContactForm, Contacts } from "../components/contacts";

export default function ContactsPage() {
  return (
    <div className="container grid md:grid-cols-[1fr,2fr] gap-10 pt-10">
      <AddContactForm />
      <Contacts />
    </div>
  );
}
