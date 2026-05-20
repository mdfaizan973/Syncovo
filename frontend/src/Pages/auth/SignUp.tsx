import SignUpLeftPanel from "./components/SignUpLeftPanel";
import SignUpForm from "./components/SignUpForm";

export default function SignUp() {

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

      <div className="flex flex-col lg:flex-row min-h-screen font-sans bg-white">

        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-5/12 xl:w-[46%] flex-shrink-0">
          <SignUpLeftPanel />
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}