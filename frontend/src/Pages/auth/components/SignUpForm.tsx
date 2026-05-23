import Logo from "../../../shared/Logo";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { UserIcon, MailIcon, LockIcon, CheckIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

type SignupPayload = {
    full_name: string;
    email: string;
    phone_number: string;
  };

export default function SignUpForm() {

    const navigate = useNavigate();

    const { register, loading } = useAuth();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone_number: "",
    });

    const [errors, setErrors] = useState({
        full_name: "",
        email: "",
        phone_number: "",
    });

    /* ─────────────────────────────
        Input Change
    ───────────────────────────── */
    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    /* ─────────────────────────────
        Validation
    ───────────────────────────── */
    const validate = () => {
        const nextErrors = {
            full_name: "",
            email: "",
            phone_number: "",
        };

        if (!form.full_name.trim()) {
            nextErrors.full_name = "Please enter your full full name.";
        }

        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        setErrors(nextErrors);

        return !nextErrors.full_name && !nextErrors.email
    };

    /* ─────────────────────────────
        Submit
    ───────────────────────────── */
    const handleSignup = async () => {
        const isValid = validate();

        if (!isValid) return;

        setLoading(true);

        const payload: SignupPayload = {
            full_name: form.full_name,
            email: form.email,
            phone_number: form.phone_number,
        };

        const response = await register(payload);

        if (response.success) {
            navigate("/login");
        }

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const handleNavigateToLoginPage = () => {
        navigate("/login");
    };


    return (
        <>
            <div className="flex-1 flex flex-col justify-center min-h-screen lg:min-h-0 px-6 py-10 sm:px-10 lg:px-12 xl:px-16 bg-white">

                {/* Mobile Logo */}
                <div className="flex items-center gap-2.5 mb-8 lg:hidden">
                    <Logo />
                </div>

                <div className="w-full max-w-sm mx-auto animate-[fadeUp_0.4s_ease_both]">

                    {/* Header */}
                    <div className="mb-7">

                        <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-orange-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse block" />
                            Workspace • Tasks • Collaboration
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
                            Create your account
                        </h1>

                        <p className="text-sm text-gray-400 leading-relaxed">
                            Start managing projects, tasks, and teams from a single collaborative workspace.
                        </p>

                    </div>

                    {/* Form */}
                    <div className="space-y-4">

                        {/* Name */}
                        <Input
                            label="Full name"
                            type="text"
                            placeholder="John Doe"
                            leftIcon={<UserIcon />}
                            value={form.full_name}
                            onChange={(e: any) => handleChange("full_name", e.target.value)}
                            state={errors.full_name ? "error" : ""}
                            helperText={errors.full_name}
                            required
                        />

                        {/* Email */}
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="you@company.com"
                            leftIcon={<MailIcon />}
                            value={form.email}
                            onChange={(e: any) => handleChange("email", e.target.value)}
                            state={errors.email ? "error" : ""}
                            helperText={errors.email}
                            required
                        />

                        {/* Password */}
                        <Input
                            label="Phone number"
                            type="number"
                            placeholder="+91 9876543210"
                            leftIcon={<LockIcon />}
                            value={form.phone_number}
                            onChange={(e: any) => handleChange("phone_number", e.target.value)}
                            state={errors.phone_number ? "error" : ""}
                            helperText={errors.phone_number}
                        />

                        {/* Terms */}
                        <label className="inline-flex items-start gap-2.5 cursor-pointer select-none pt-1">

                            <div className="relative mt-0.5">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                />

                                <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all duration-150 flex items-center justify-center">
                                    <span className="hidden peer-checked:flex text-white">
                                        <CheckIcon className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                I agree to the{" "}
                                <button
                                    type="button"
                                    className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                                >
                                    Terms of Use
                                </button>{" "}
                                and{" "}
                                <button
                                    type="button"
                                    className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                                >
                                    Privacy Policy
                                </button>
                            </p>

                        </label>

                        {/* Buttons */}
                        <div className="pt-2 space-y-3">

                            <Button
                                fullWidth
                                size="lg"
                                loading={loading}
                                onClick={handleSignup}
                                rightIcon={<ArrowRightIcon />}
                                className="font-bold tracking-wide text-base"
                            >
                                Create account
                            </Button>

                            {/* <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-gray-100" />

                                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                                    or
                                </span>

                                <div className="flex-1 h-px bg-gray-100" />
                            </div> */}

                            {/* <Button
                                fullWidth
                                variant="secondary"
                                size="lg"
                                loading={gLoading}
                                onClick={handleGoogleSignup}
                                leftIcon={<GoogleIcon />}
                                className="text-sm"
                            >
                                Continue with Google
                            </Button> */}

                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-center text-gray-400 mt-7">

                        Already have an account?{" "}

                        <button
                            onClick={handleNavigateToLoginPage}
                            type="button"
                            className="cursor-pointer text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                        >
                            Sign in
                        </button>

                    </p>

                    {/* Bottom Links */}
                    <div className="flex items-center justify-center gap-5 mt-10 pt-6 border-t border-gray-100">

                        {["Privacy Policy", "Terms of Use", "Support"].map((item) => (
                            <button
                                key={item}
                                type="button"
                                className="text-xs text-gray-300 hover:text-orange-500 font-medium transition-colors"
                            >
                                {item}
                            </button>
                        ))}

                    </div>

                </div>
            </div>
        </>
    );
}