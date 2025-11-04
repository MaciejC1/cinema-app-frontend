import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import EmptyLayout from "../layouts/EmptyLayout"
import HomePage from "../pages/homePage"

const  AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<HomePage />} />
        </Route>

        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<HomePage />} />
          <Route path="/register" element={<HomePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;