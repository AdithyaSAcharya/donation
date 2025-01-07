"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiUserPlus,
  FiUsers,
  FiDollarSign,
  FiList,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedExpiry = localStorage.getItem("loginExpiry");

    if (storedUsername && storedExpiry) {
      const expiry = new Date(storedExpiry);
      if (expiry > new Date()) {
        setIsLoggedIn(true);
      } else {
        localStorage.clear();
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    if (username === "username" && password === "password1") {
      setIsLoggedIn(true);
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 1);
      localStorage.setItem("username", username);
      localStorage.setItem("loginExpiry", expiry.toISOString());
      setIsLoginPopupOpen(false);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <>
      <header className="bg-slate-800 text-slate-100 shadow-lg fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-wider">Donation App</h1>
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            className="text-slate-100 text-2xl md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {isLoggedIn && (
                <>
                  <li>
                    <Link
                      href="/addMember"
                      className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                    >
                      <FiUserPlus />
                      <span>Add Member</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/addDonation"
                      className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                    >
                      <FiDollarSign />
                      <span>Add Donations</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="/listMember"
                  className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                >
                  <FiUsers />
                  <span>List Members</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/listDonations"
                  className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                >
                  <FiList />
                  <span>List Donations</span>
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsLoginPopupOpen(true)}
                    className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                  >
                    <FiLogIn />
                    <span>Admin Login</span>
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-slate-800 text-slate-100 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-20`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            className="text-slate-100 text-2xl"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>
        <ul className="mt-4 space-y-4 px-4">
          {isLoggedIn && (
            <>
              <li>
                <Link
                  href="/addMember"
                  className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUserPlus />
                  <span>Add Member</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/addDonation"
                  className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiDollarSign />
                  <span>Add Donations</span>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              href="/listMember"
              className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUsers />
              <span>List Members</span>
            </Link>
          </li>
          <li>
            <Link
              href="/listDonations"
              className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiList />
              <span>List Donations</span>
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginPopupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
              >
                <FiLogIn />
                <span>Admin Login</span>
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
          aria-hidden="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsLoginPopupOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
