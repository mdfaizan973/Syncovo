import Logo from "../../components/widgets/Logo";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { GoogleIcon } from "../../components/ui/icons";
import { UserIcon, MailIcon, LockIcon, CheckIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

type SignupPayload = {
    name: string;
    email: string;
    password: string;
    avatar_url: string;
    bio: string;
    auth_provider: "local" | "google";
    plan: "free" | "pro" | "enterprise";
  };

export default function SignUpForm() {

    const [loading, setLoading] = useState(false);
    const [gLoading, setGLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
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
            name: "",
            email: "",
            password: "",
        };

        if (!form.name.trim()) {
            nextErrors.name = "Please enter your full name.";
        }

        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (form.password.length < 6) {
            nextErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(nextErrors);

        return !nextErrors.name &&
            !nextErrors.email &&
            !nextErrors.password;
    };

    /* ─────────────────────────────
        Submit
    ───────────────────────────── */
    const handleSignup = async () => {
        const isValid = validate();

        if (!isValid) return;

        setLoading(true);

        const payload: SignupPayload = {
            name: form.name,
            email: form.email,
            password: form.password,

            avatar_url: "",
            bio: "",

            auth_provider: "local",
            plan: "free",
        };

        console.log(payload);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    /* ─────────────────────────────
        Google Auth
    ───────────────────────────── */
    const handleGoogleSignup = () => {
        setGLoading(true);

        setTimeout(() => {
            setGLoading(false);
        }, 1500);
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
                            value={form.name}
                            onChange={(e: any) => handleChange("name", e.target.value)}
                            state={errors.name ? "error" : ""}
                            helperText={errors.name}
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
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            leftIcon={<LockIcon />}
                            value={form.password}
                            onChange={(e: any) => handleChange("password", e.target.value)}
                            state={errors.password ? "error" : ""}
                            helperText={errors.password}
                            required
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

                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-gray-100" />

                                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                                    or
                                </span>

                                <div className="flex-1 h-px bg-gray-100" />
                            </div>

                            <Button
                                fullWidth
                                variant="secondary"
                                size="lg"
                                loading={gLoading}
                                onClick={handleGoogleSignup}
                                leftIcon={<GoogleIcon />}
                                className="text-sm"
                            >
                                Continue with Google
                            </Button>

                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-center text-gray-400 mt-7">

                        Already have an account?{" "}

                        <button
                            type="button"
                            className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
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