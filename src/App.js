import "./index.css";
import { createContext, useState, useEffect } from "react";
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
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  useEffect(() => {
    function refreshToken() {
      if (localStorage.refresh) {
        fetch("http://127.0.0.1:8000/api/token/refresh/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }

    let minutes = 1000 * 60;
    refreshToken();
    setInterval(refreshToken, minutes * 3);
  }, []);
  return (
    <>
      <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
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
