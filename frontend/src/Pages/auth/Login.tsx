import AuthPanel from "./components/LoginForm";
import LoginLeftPanel from "./components/LoginLeftPanel";


export default function Login() {

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="relative flex flex-col lg:flex-row min-h-screen font-sans bg-[#f8fafc]">

        {/* Left — Brand Panel */}
        <div className="hidden lg:flex lg:w-5/12 xl:w-[46%] flex-col flex-shrink-0">
          <LoginLeftPanel />
        </div>

        {/* Right — Auth Panel */}
        <div className="flex-1 flex flex-col">
          <AuthPanel />
        </div>

      </div>
    </>
  );
}