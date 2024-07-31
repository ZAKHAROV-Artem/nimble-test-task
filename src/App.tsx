import { Route, Routes } from "react-router-dom";

import { ContactDetails, Contacts, NotFoundPage } from "@/pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
