import { useEffect, useState } from "react";
import { ArrowRightIcon, CheckIcon, MailIcon, ShieldCheckIcon } from "lucide-react";
import { Input, OtpInput } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { BackIcon } from "../../../components/ui/icons";
import { useTranslation } from "../../../hooks/useTranslation";
import Logo from "../../../shared/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { unpackToken } from "../../../utils/commonUtils";
import { setUserInfoStorage } from "../../../utils/storage";

type Step = "credentials" | "otp";

export default function AuthPanel() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { authLoading, login, verifyOtp } = useAuth();

    const [step, setStep] = useState<Step>("credentials");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    // const [gLoading, setGLoading] = useState(false);
    const [emailErr, setEmailErr] = useState("");
    const [countdown, setCd] = useState(0);

    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCd(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    const goToOtp = async () => {
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setEmailErr("Please enter a valid email address.");
            return;
        }
        const response = await login({ email });

        if (response.success) {
            setEmailErr("");
            setStep("otp");
        } else {
            setEmailErr(response.message);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.join("").length < 6) return;

        const obj = { 
            "email": email,
            "otp": otp.join("")
        }
        const response = await verifyOtp(obj);

        if (response) {
            const userData = await unpackToken(response.token);
            setUserInfoStorage(userData);
            setCd(5)
            navigate("/dashboard");
        }


    };

    // const handleGoogle = () => { setGLoading(true); setTimeout(() => setGLoading(false), 1500); };

    const backToLogin = () => {
        setStep("credentials");
        setOtp(["", "", "", "", "", ""]);
    };

    const otpComplete = otp.join("").length === 6;

    const handleNavigateToSignUpPage = () => {
        navigate("/register");
    };

    return (
        <div className="flex flex-col justify-center min-h-screen lg:min-h-0 h-full px-6 py-10 sm:px-10 lg:px-12 xl:px-16 bg-white">

            {/* Mobile logo */}
            <div className="flex items-center gap-2.5 mb-8 lg:hidden">
                <Logo />
            </div>

            <div className="w-full max-w-sm mx-auto">

                {/* ── STEP: CREDENTIALS ── */}
                {step === "credentials" && (
                    <div className="animate-[fadeUp_0.4s_ease_both]">
                        <div className="mb-7">
                            <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-orange-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse block" />
                                {t.auth.login?.badge || "Workspace • Tasks • Collaboration"}
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1.5">
                                {t.auth.login?.title || "Sign in to Syncovo"}
                            </h2>
                            <p className="text-sm text-gray-400">{t.auth.login?.description || "Enter your credentials to access your workspace."}</p>
                        </div>

                        <div className="space-y-4">
                            <Input label={t.auth.login?.fields?.email?.label || "Email address"} type="email" placeholder={t.auth.login?.fields?.email?.placeholder || "you@company.com"}
                                leftIcon={<MailIcon />} required value={email}
                                onChange={(e: any) => { setEmail(e.target.value); setEmailErr(""); }}
                                state={emailErr ? "error" : ""} helperText={emailErr} />


                            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none mt-1">
                                <div className="relative">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all duration-150 flex items-center justify-center">
                                        <span className="hidden peer-checked:flex text-white"><CheckIcon /></span>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{t.auth.login?.keepSignedIn || "Keep me signed in"}</span>
                            </label>

                            <div className="pt-1 space-y-3">
                                <Button fullWidth size="lg" loading={authLoading} onClick={goToOtp}
                                    rightIcon={<ArrowRightIcon />} className="font-bold tracking-wide text-base">
                                    {t.auth.login?.buttons?.continue || "Continue"}
                                </Button>

                                {/* <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-gray-100" />
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">or</span>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div> */}

                                {/* <Button fullWidth variant="secondary" size="lg" loading={gLoading} onClick={handleGoogle}
                                    leftIcon={<GoogleIcon />} className="text-sm">
                                    {t.auth.login?.buttons?.google || "Continue with Google"}
                                </Button> */}
                            </div>
                        </div>

                        <p className="text-sm text-center text-gray-400 mt-6">
                            {t.auth.login?.footer?.text || "No account?"} {" "}
                            <button onClick={handleNavigateToSignUpPage} type="button" className="cursor-pointer text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                                {t.auth.login?.buttons?.requestAccess || "Register"}
                            </button>
                        </p>
                    </div>
                )}

                {/* ── STEP: OTP ── */}
                {step === "otp" && (
                    <div className="animate-[fadeUp_0.4s_ease_both]">
                        <div className="mb-7">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center mb-5">
                                <span className="w-7 h-7 text-orange-500 block"><ShieldCheckIcon /></span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1.5">
                                {t.auth.otp?.title || "Two-step verification"}
                            </h2>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {t.auth.otp?.description || "We sent a 6-digit code to"} {" "}
                                <span className="font-semibold text-orange-500 break-all">{email}</span>
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">
                                    {t.auth.otp?.enterCode || "Enter your code"}
                                </p>
                                <OtpInput value={otp} onChange={setOtp} />
                            </div>

                            <Button fullWidth size="lg" loading={authLoading} disabled={!otpComplete}
                                onClick={handleVerifyOtp} rightIcon={<ArrowRightIcon />}
                                className="font-bold tracking-wide text-base">
                                {t.auth.otp?.buttons?.verify || "Verify & Sign in"}
                            </Button>

                            <div className="text-center">
                                {countdown > 0 ? (
                                    <p className="text-sm text-gray-400">
                                        {t.auth.otp?.countdown?.prefix || "Resend code in"} <span className="font-bold text-orange-500 tabular-nums">{countdown}s</span>
                                    </p>
                                ) : (
                                    <button type="button" onClick={() => {
                                        setOtp(["", "", "", "", "", ""]);
                                        setCd(30);
                                        goToOtp();
                                    }}
                                        className="text-sm cursor-pointer font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                                        {t.auth.otp?.buttons?.resend || "Resend code"}
                                    </button>
                                )}
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                                <button type="button" onClick={backToLogin}
                                    className="w-full cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 transition-colors py-1">
                                    <span className="w-3.5 h-3.5 block"><BackIcon /></span>
                                    {t.auth.otp?.buttons?.back || "Back to sign in"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer links */}
                <div className="flex items-center justify-center gap-5 mt-10 pt-6 border-t border-gray-100">
                    {Object.values(t.auth.bottomLinks).map(l => (
                        <button key={l} type="button" className="text-xs text-gray-300 hover:text-orange-500 font-medium transition-colors">{l}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}