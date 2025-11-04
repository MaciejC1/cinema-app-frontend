import { Outlet } from "react-router-dom"
import NavBar from "../components/navBar"

export default function MainLayout() {
    return (
        <div className="min-h-screen">
            <NavBar />
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
