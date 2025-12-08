import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Search, CircleUser, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCinema } from "../context/CinemaContext";
import { useState } from "react";
import NavBarMenu from "./menus/navBarMenu";
import CinemaSelectModal from "./modals/CinemaSelectModal";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { cinema } = useCinema();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
        <div className="border-primary border-2 bg-black text-white w-3/4 max-w-[1500px] px-6 h-16 shadow-lg rounded-4xl flex items-center justify-between">

          {/* Lewa sekcja */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            {/* WYBÓR KINA */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-linear-to-r from-[#791225] via-[#AC1934] to-primary px-2 py-1 rounded-4xl text-white text-sm cursor-pointer"
            >
              {cinema?.name} - {cinema?.address}
            </button>
          </div>

          {/* Środkowa sekcja */}
          <div className="flex gap-6 justify-center grow">
            <Link to="/movies" className="text-2xl text-primary">Kina</Link>
            <Link to="/repertuar" className="text-2xl">Repertuar</Link>
            <Link to="/cinemas" className="text-2xl">Wkrótce</Link>
            <Link to="/offers" className="text-2xl">O nas</Link>
          </div>

          {/* Prawa sekcja */}
          <div className="flex gap-3 items-center">
            <Link to="/search" className="hover:text-gray-300">
              <Search className="w-8 h-auto" />
            </Link>
            {isAuthenticated ? (
              <NavBarMenu />
            ) : (
              <Link to="/login" className="hover:text-gray-300">
                <CircleUser color="#DF2144" strokeWidth={1} className="w-[52px] h-auto" />
              </Link>
            )}

          </div>

        </div>
      </nav>
      {/* MODAL */}
      {
        openModal && (
          <CinemaSelectModal onClose={() => setOpenModal(false)} />
        )
      }
    </>
  );
};

export default NavBar;
