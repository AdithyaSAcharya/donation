"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiUserPlus, FiUsers, FiDollarSign, FiList } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-slate-800 text-slate-100 shadow-lg fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wider">Donation App</h1>

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
                  href="/listMember"
                  className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                >
                  <FiUsers />
                  <span>List Members</span>
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
              <li>
                <Link
                  href="/listDonations"
                  className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
                >
                  <FiList />
                  <span>List Donations</span>
                </Link>
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
              href="/addDonations"
              className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiDollarSign />
              <span>Add Donations</span>
            </Link>
          </li>
          <li>
            <Link
              href="/list-donations"
              className="flex items-center space-x-2 hover:text-slate-300 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiList />
              <span>List Donations</span>
            </Link>
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
    </>
  );
};

export default Header;
