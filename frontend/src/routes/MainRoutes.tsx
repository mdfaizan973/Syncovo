// MainRoutes.tsx
import { Route, Routes } from "react-router-dom";
import UnderConstruction from "../components/showcase/UnderConstruction";
import SignUp from "../Pages/auth/SignUp";
import Login from "../Pages/auth/Login";
import NotFound from "../shared/NotFound";
import Dashboard from "../Pages/MainContent/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import QuickNote from "../Pages/MainContent/components/QuickNote";
import DashboardInfo from "../Pages/MainContent/components/DashboardInfo";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UnderConstruction />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }>
                <Route index element={<DashboardInfo />} />
                <Route path="quicknote" element={<QuickNote />} />
            </Route>

        </Routes>
    );
}