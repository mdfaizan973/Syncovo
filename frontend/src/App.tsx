import { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes";
import Footer from "./shared/Footer";
import Language from "./shared/Language";
// import Navbar from "./shared/Navbar";
import { useLocation } from "react-router-dom";

function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  const isLoginOrSignupPage = ["/login", "/signup"].includes(pathname);


  return (
    <>
      {/* Navbar */}
      {/* {!isLoginOrSignupPage && <Navbar />} */}

      <div>
        <MainRoutes />
      </div>

      {/* Footer */}
      {!isLoginOrSignupPage && <Footer />}

      <Language />
    </>
  );
}

export default App;