import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0D0D0D] text-white mt-20 border-t border-primary/20">
      <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-16 items-start md:divide-y-0 md:divide-x divide-[#DF2144]/10">

        <div className="pb-6 md:pb-0 md:pr-10">
          <Link to="/" className="flex">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-sm">
            Twój świat filmów i premier. Odkrywaj, oglądaj i śledź najnowsze produkcje kinowe.
          </p>
        </div>

        <div className="pt-6 md:pt-0 md:px-10 flex flex-col items-start text-left">
          <span className="text-lg font-semibold mb-3 text-primary">Informacje</span>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-primary transition-colors">Strona główna</a></li>
            <li><a href="/repertuar" className="hover:text-primary transition-colors">Repertuar</a></li>
            <li><a href="/" className="hover:text-primary transition-colors">Nadchodzące premiery</a></li>
            <li><a href="/" className="hover:text-primary transition-colors">Kontakt</a></li>
          </ul>
        </div>

        <div className="pt-6 md:pt-0 md:pl-10 flex flex-col items-start md:items-end text-left md:text-right">
          <h3 className="text-lg font-semibold mb-3 text-primary">Śledź nas</h3>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-primary/20 transition-all"><Facebook size={20} /></a>
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-primary/20 transition-all"><Instagram size={20} /></a>
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-primary/20 transition-all"><Twitter size={20} /></a>
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-primary/20 transition-all"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/10 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-primary font-medium">Cineo</span>. Wszystkie prawa zastrzeżone.
      </div>
    </footer>
  );
};

export default Footer;
