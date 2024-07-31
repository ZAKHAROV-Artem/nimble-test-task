import { Route, Routes } from "react-router-dom";

import { ContactDetails, Contacts } from "@/pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </>
  );
}

export default App;
