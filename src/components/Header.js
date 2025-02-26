import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext } from "../App";

const navigation = [
  { name: "Employees", href: "/employees" },
  { name: "Customers", href: "/customers" },
  { name: "Dictionary", href: "/dictionary" },
];

function Header(props) {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  useEffect(() => {
    console.log(loggedIn);
  });
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => {
                        return (
                          "px-3 py-2 text-m text-indigo-500  font-medium no-underline" +
                          (isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white")
                        );
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <NavLink
                    to={loggedIn ? "/logout" : "/login"}
                    className="px-3 py-2 text-m text-indigo-500  font-medium no-underline"
                  >
                    {loggedIn ? "Logout" : "Login"}
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </Disclosure>
      {props.children}
    </>
  );
}

export default Header;
