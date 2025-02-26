import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import { LoginContext } from "../App";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/customers/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((res) => {
        if (res.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        return res.json();
      })
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);

  function addCustomer(name, industry) {
    fetch("http://127.0.0.1:8000/api/customers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, industry: industry }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        return res.json();
      })
      .then((data) => {
        toggleShow();
        setCustomers([...customers, data.customer]);
      });
  }
  return (
    <>
      <h1>Customers</h1>
      <ul>
        {customers
          ? customers.map((c) => {
              return (
                <li key={c.id}>
                  <Link to={"/customers/" + c.id}>{c.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
      <br />
      <AddCustomer
        addCustomer={addCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}

export default Customers;
