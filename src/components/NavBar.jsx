import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Search, CircleUser, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCinema } from "../context/CinemaContext";
import { useState } from "react";
import NavBarMenu from "./menus/navBarMenu";
import CinemaSelectModal from "./modals/CinemaSelectModal";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { cinema } = useCinema();

  const [openModal, setOpenModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 mt-2 sm:mt-4">
        <div
          className="
            border-primary border-2 bg-black text-white
            w-full max-w-[1500px] 
            px-3 sm:px-6
            h-14 sm:h-16
            shadow-lg rounded-full
            flex items-center justify-between
          "
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex">
              <img
                src={logo}
                alt="Logo"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </Link>

            <button
              onClick={() => setOpenModal(true)}
              className="
                hidden md:block
                bg-linear-to-r from-[#791225] via-[#AC1934] to-primary
                px-3 py-1 rounded-full
                text-white text-sm
                cursor-pointer
                truncate max-w-[260px]
              "
            >
              {cinema?.name} – {cinema?.address}
            </button>
          </div>

          <div className="hidden lg:flex gap-6 justify-center grow">
            <Link to="/movies" className="text-2xl hover:text-primary">
              Kina
            </Link>
            <Link to="/repertuar" className="text-2xl hover:text-primary">
              Repertuar
            </Link>
            <Link to="/wkrotce" className="text-2xl hover:text-primary">
              Wkrótce
            </Link>
            <Link to="/offers" className="text-2xl hover:text-primary">
              O nas
            </Link>
          </div>

          <div className="flex gap-3 items-center">
            <Link to="/search" className="hover:text-gray-300">
              <Search className="w-6 sm:w-7 h-auto" />
            </Link>

            {isAuthenticated ? (
              <NavBarMenu />
            ) : (
              <Link to="/login" className="hover:text-gray-300">
                <CircleUser
                  color="#DF2144"
                  strokeWidth={1}
                  className="w-8 sm:w-10 h-auto"
                />
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="
            fixed top-[72px] left-0 right-0 z-40
            bg-black border-t border-primary
            flex flex-col items-center gap-4 py-6
            lg:hidden
          "
        >
          <button
            onClick={() => {
              setOpenModal(true);
              setMobileMenuOpen(false);
            }}
            className="
              bg-linear-to-r from-[#791225] via-[#AC1934] to-primary
              px-4 py-2 rounded-full
              text-sm
            "
          >
            {cinema?.name}
          </button>

          <Link to="/movies" onClick={() => setMobileMenuOpen(false)}>
            Kina
          </Link>
          <Link to="/repertuar" onClick={() => setMobileMenuOpen(false)}>
            Repertuar
          </Link>
          <Link to="/cinemas" onClick={() => setMobileMenuOpen(false)}>
            Wkrótce
          </Link>
          <Link to="/offers" onClick={() => setMobileMenuOpen(false)}>
            O nas
          </Link>
        </div>
      )}

      {openModal && <CinemaSelectModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default NavBar;
