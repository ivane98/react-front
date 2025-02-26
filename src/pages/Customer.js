import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import { LoginContext } from "../App";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [tempCustomer, setTempCustomer] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  let [loggedIn, setLoggedIn] = useContext(LoginContext);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/customers/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
        } else if (res.status === 401) {
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
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      });
  }, []);

  useEffect(() => {
    if (!customer) return;
    if (!customer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) setChanged(false);
  });

  function updateCustomer(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/customers/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(tempCustomer),
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
        if (!res.ok) {
          throw new Error("Ivalid request");
        }
        return res.json();
      })
      .then((data) => {
        setTempCustomer(data.customer);
        setChanged(false);
        setError(undefined);
        console.log(data);
      })
      .catch((e) => {
        setError(e.message);
        console.log(e);
      });
  }

  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? (
        <div>
          <form
            id="customer"
            onSubmit={updateCustomer}
            className="w-full max-w-sm"
          >
            <label for="name">Name</label>
            <input
              id="name"
              className="m-2 block px-2 outline"
              type="text"
              value={tempCustomer.name}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({ ...tempCustomer, name: e.target.value });
              }}
            />
            <label for="industry">Industry</label>
            <input
              id="industry"
              className="m-2 block px-2 outline"
              type="text"
              value={tempCustomer.industry}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({ ...tempCustomer, industry: e.target.value });
              }}
            />
          </form>
          {changed ? (
            <>
              <button
                onClick={() => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button form="customer">Save</button>
            </>
          ) : null}
        </div>
      ) : null}
      <button
        onClick={() => {
          fetch("http://127.0.0.1:8000/api/customers/" + customer.id, {
            method: "DELETE",
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
              if (!res.ok) {
                throw new Error("Invalid Request");
              }
              navigate("/customers");
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/customers">Back To Customers</Link>
    </>
  );
}
