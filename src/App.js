import "./index.css";
import { createContext, useState } from "react";
import Header from "./components/Header.js";
import Employees from "./pages/Employees.js";
import Customers from "./components/Customers.js";
import Dictionary from "./components/Dictionary.js";
import Definition from "./components/Definition.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer.js";
import Login from "./pages/Login.js";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
        <BrowserRouter>
          <Header>
            <Routes>
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<Customer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/definition/:search" element={<Definition />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Header>
        </BrowserRouter>
      </LoginContext.Provider>
    </>
  );
}

export default App;
