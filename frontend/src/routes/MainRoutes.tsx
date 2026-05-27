// MainRoutes.tsx
import { Navigate, Route, Routes } from "react-router-dom";
// import UnderConstruction from "../components/showcase/UnderConstruction";
import SignUp from "../Pages/auth/SignUp";
import Login from "../Pages/auth/Login";
import NotFound from "../shared/NotFound";
import Dashboard from "../Pages/MainContent/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DashboardInfo from "../Pages/MainContent/components/DashboardInfo";
import CreateQuickNote from "../Pages/MainContent/components/QuickNotes/CreateQuickNote";
import QuickNotesDashboard from "../Pages/MainContent/components/QuickNotes/QuickNotesDashboard";
import WorkspacesDashboard from "../Pages/workspaces/WorkspacesDashboard";
import WorkspaceView from "../Pages/workspaces/WorkspaceView";
import TableView from "../Pages/workspaces/TableView";
import FormBuilder from "../Pages/workspaces/FormBuilder";
import FormsDashboard from "../Pages/workspaces/FormsDashboard";
import TablesDashboard from "../Pages/workspaces/TablesDashboard";
import LandingPage from "../Pages/prelogin/Landingpage";
import { getUserInfoStorage } from "../utils/storage";

export default function MainRoutes() {
    const isAuthenticated = !!getUserInfoStorage();

    const authRedirect = (component: React.ReactNode) => {
        return isAuthenticated
            ? <Navigate to="/dashboard" replace />
            : component;
    }

    return (
        <Routes>
            {/* <Route path="/" element={<UnderConstruction />} /> */}
            <Route path="/" element={authRedirect(<LandingPage />)} />
            <Route path="/register" element={authRedirect(<SignUp />)} />
            <Route path="/login" element={authRedirect(<Login />)} />

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
                <Route path="workspaces" element={<WorkspacesDashboard />} />
                <Route path="workspace-view/:workspaceId" element={<WorkspaceView />} />
                <Route path="table-view/:workspaceId/:tableId" element={<TableView />} />
                <Route path="form-builder" element={<FormBuilder />} />
                <Route path="forms" element={<FormsDashboard />} />
                <Route path="tables" element={<TablesDashboard />} />

            </Route>

        </Routes>
    );
}