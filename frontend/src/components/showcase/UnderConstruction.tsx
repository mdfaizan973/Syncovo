import { Construction, Hammer, Sparkles } from "lucide-react";

export default function UnderConstruction() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 px-4">
      
        <div className="text-center max-w-xl space-y-6">
          
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg animate-pulse">
              <Construction className="text-white w-10 h-10" />
            </div>
          </div>
  
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            Under Construction
          </h1>
  
          {/* Subtext */}
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            We’re building something modern, fast, and powerful.  
            Our team is crafting a next-generation SaaS experience for you.
          </p>
  
          {/* Badge Row */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            
            <span className="px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm flex items-center gap-2">
              <Hammer className="w-4 h-4" />
              In Development
            </span>
  
            <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Coming Soon
            </span>
  
          </div>
  
          {/* Footer Note */}
          <p className="text-xs text-gray-400 pt-4">
            Thank you for your patience 🚀
          </p>
        </div>
  
      </div>
    )
}