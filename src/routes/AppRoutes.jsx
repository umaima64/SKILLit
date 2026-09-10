import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import FindSkillsPage from "../pages/FindSkillsPage";
import UserDetailPage from "../pages/UserDetailPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import ServicesPage from "../pages/ServicesPage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import CheckoutPage from "../pages/CheckoutPage";
import SkillExchangePage from "../pages/SkillExchangePage";
import SkillExchangeDetailPage from "../pages/SkillExchangeDetailPage";
import RequestsPage from "../pages/RequestsPage";
import CollaborationsPage from "../pages/CollaborationsPage";
import CollaborationDetailPage from "../pages/CollaborationDetailPage";
import WorkspacePage from "../pages/WorkspacePage";
import NotificationsPage from "../pages/NotificationsPage";
import ReviewsPage from "../pages/ReviewsPage";

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/find-skills" element={<FindSkillsPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/skill-exchange" element={<SkillExchangePage />} />
        <Route
          path="/skill-exchange/:id"
          element={<SkillExchangeDetailPage />}
        />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/collaborations" element={<CollaborationsPage />} />
        <Route
          path="/collaborations/:id"
          element={<CollaborationDetailPage />}
        />
        <Route path="/workspace/:id" element={<WorkspacePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
