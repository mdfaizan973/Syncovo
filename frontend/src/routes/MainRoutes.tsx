// MainRoutes.tsx
import { Route, Routes } from "react-router-dom";
import UnderConstruction from "../components/showcase/UnderConstruction";
import SignUp from "../Pages/auth/SignUp";
import Login from "../Pages/auth/Login";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UnderConstruction />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}