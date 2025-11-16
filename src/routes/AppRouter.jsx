import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import EmptyLayout from "../layouts/EmptyLayout"
import HomePage from "../pages/homePage"
import MovieDetailsPage from "../pages/MovieDetailsPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

const  AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:slug" element={<MovieDetailsPage />} />
        </Route>

        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;