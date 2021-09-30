import React, { useEffect, useState } from "react";
import useDarkmode from "../hook/useDarkMode";
import { FiSun } from "react-icons/fi";
import { GiMoonBats } from "react-icons/gi";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaUserAlt, FaPaw } from "react-icons/fa";
import { AiOutlineFullscreenExit, AiOutlineMenu } from "react-icons/ai";
import useAuth from "../hook/useAuth";
import { Link, useHistory } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [navigation, setNavigation] = useState([]);
  const [current, setCurrent] = useState("");

  const { login, handleLogout } = useAuth();
  useEffect(() => {
    let nav;
    if (!login) {
      nav = [
        { name: "Home", href: "/", current: "" },
        { name: "Cachorros", href: "/dogs", current: "" },
        { name: "Gatos", href: "/cats", current: "" },
        { name: "Perdidos", href: "/lostanimals", current: "" },
        { name: "Login", href: "/login", current: "" },
        { name: "Registrar-se", href: "/users", current: "" },
      ];
    } else {
      nav = [
        { name: "Cachorros", href: "/dogs", current: "" },
        { name: "Gatos", href: "/cats", current: "" },
        { name: "Perdidos", href: "/lostanimals", current: "" },
        { name: "Meus pets", href: "/profile", current: "" },
        { name: "Cadastrar pet", href: "/petregister", current: "" },
      ];
    }
    console.log(current);
    setNavigation(nav);
  }, [login, current]);

  const deleteFilter = () => {
    localStorage.removeItem("filter");
  };
  const setCurrentValue = (name) => {
    setCurrent(name);
    deleteFilter();
  };
  const history = useHistory();
  const [colorTheme, setTheme] = useDarkmode();
  const handleLogOut = async () => {
    await handleLogout();
    history.push("/");
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-white shadow dark:bg-gray-800">
        {({ open, close }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <AiOutlineFullscreenExit
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <AiOutlineMenu
                        className="block h-6 w-6 dark:text-white"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <FaPaw
                      className="text-gray-900 dark:text-white"
                      size={30}
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          to={item.href}
                          onClick={() => setCurrentValue(item.name)}
                          key={item.name}
                          className={classNames(
                            item.name === current
                              ? "bg-gray-600 dark:bg-gray-900 text-white"
                              : "text-gray-800 dark:text-white hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={
                            item.name === current ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <span
                    className="w-10 h-10 bg-indigo-500 block rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center"
                    onClick={() => setTheme(colorTheme)}
                  >
                    {colorTheme === "light" ? <FiSun /> : <GiMoonBats />}
                  </span>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button>
                            <span className="sr-only">Open user menu</span>
                            {login && (
                              <FaUserAlt className="text-gray-900 dark:text-white" />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/#"
                                  onClick={handleLogOut}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sair
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    to={item.href}
                    key={item.name}
                    onClick={() => {
                      close();
                    }}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-gray-800 dark:text-white"
                        : "text-gray-800 dark:text-white hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Header;
