import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CircleUser, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NavBarMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 hover:text-gray-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <CircleUser color="#DF2144" strokeWidth={1} className="w-10 h-auto" />
        <span>{user.firstName} {user.lastName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-black border-2 border-t-0 border-primary rounded-lg rounded-t-xs shadow-lg py-2 flex flex-col">
          <Link to="/profile" className="px-4 py-2 hover:bg-[#202020]">Profil</Link>
          <Link to="/my-tickets" className="px-4 py-2 hover:bg-[#202020]">Moje bilety</Link>
          <button
            onClick={logout}
            className="px-4 py-2 text-left hover:bg-[#202020] cursor-pointer flex items-center gap-2"
          >
            Wyloguj się <LogOut className="w-5 h-5" /> 
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBarMenu;
