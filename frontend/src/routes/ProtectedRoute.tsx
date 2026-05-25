import { Navigate } from "react-router-dom";
import { getUserInfoStorage } from "../utils/storage";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const userInfo = getUserInfoStorage();
    
    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }
    return children;
}