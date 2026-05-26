// MainRoutes.tsx
import { Route, Routes } from "react-router-dom";
import UnderConstruction from "../components/showcase/UnderConstruction";
import SignUp from "../Pages/auth/SignUp";
import Login from "../Pages/auth/Login";
import NotFound from "../shared/NotFound";
import Dashboard from "../Pages/MainContent/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DashboardInfo from "../Pages/MainContent/components/DashboardInfo";
import CreateQuickNote from "../Pages/MainContent/components/QuickNotes/CreateQuickNote";
import QuickNotesDashboard from "../Pages/MainContent/components/QuickNotes/QuickNotesDashboard";

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
                <Route path="quicknote" element={<QuickNotesDashboard />} />
                <Route path="create-note" element={<CreateQuickNote />} />
                <Route path="view-note/:id" element={<CreateQuickNote />} />
            </Route>

        </Routes>
    );
}