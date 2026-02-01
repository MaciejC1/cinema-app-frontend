import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import EmptyLayout from "../layouts/EmptyLayout"
import HomePage from "../pages/homePage"
import MovieDetailsPage from "../pages/MovieDetailsPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import RepertoirePage from "../pages/RepertoirePage"
import SurveyPage from "../pages/SurveyPage"
import RecommendationPage from "../pages/RecommendationPage"
import TicketPage from "../pages/TicketPage"
import PaymentPage from "../pages/PaymentPage"
import ProfilePage from "../pages/ProfilePage"
import SoonPage from "../pages/SoonPage"
import TicketHistoryPage from "../pages/TicketHistoryPage"
import ProtectedRoute from "./ProtectedRoute"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:slug" element={<MovieDetailsPage />} />
          <Route path="/repertuar" element={<RepertoirePage />} />
          <Route path="/wkrotce" element={<SoonPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/rekomendacje" element={<RecommendationPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="/bilety" element={<TicketHistoryPage />} />
          </Route>

        </Route>

        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/rezerwacja/:showtimeId" element={<TicketPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/survey" element={<SurveyPage />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;