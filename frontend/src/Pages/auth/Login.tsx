import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";

export default function Login() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
        
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-orange-50 to-gray-50">
          <div className="space-y-4">
            
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
              <Mail className="text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to Your SaaS
            </h1>

            <p className="text-gray-500 text-base leading-relaxed">
              A modern, scalable, and beautifully designed platform built for
              high performance and seamless user experience.
            </p>

            <div className="pt-4 flex gap-2 flex-wrap">
              <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-600">
                Fast
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600">
                Secure
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
                Scalable
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 md:p-10 bg-white">
          
          <Card className="w-full max-w-md shadow-none border-0 md:border md:shadow-lg rounded-2xl">
            
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-gray-500">
                Use your Google account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Google Button */}
              <Button className="w-full flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-all">
                {/* <Google className="w-5 h-5" /> */}
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Email Button */}
              <Button
                variant="outline"
                className="w-full flex items-center gap-3 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
              >
                <Mail className="w-5 h-5" />
                Continue with Email
              </Button>

              <p className="text-center text-xs text-gray-400 pt-4">
                By continuing, you agree to our Terms & Privacy Policy
              </p>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}