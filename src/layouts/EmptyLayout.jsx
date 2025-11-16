import { Outlet, Link } from "react-router-dom"
import logo from "../assets/logo.png"

export default function EmptyLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <nav className="w-full py-2 px-10 flex items-center">
        <Link to="/" className="flex">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>
      </nav>

      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  )
}
