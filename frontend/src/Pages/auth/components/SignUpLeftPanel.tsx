

import {
    Layers3Icon,
    Users2Icon,
    SparklesIcon,
  } from "lucide-react";
  
  import { Card, CardContent } from "../../components/ui/card";
  import Logo from "../../components/widgets/Logo";
  
  const highlights = [
    {
      icon: <Layers3Icon className="w-4 h-4" />,
      title: "Build Your Workflow",
      desc: "Design tables, and task systems that match your team structure.",
    },
    {
      icon: <Users2Icon className="w-4 h-4" />,
      title: "Collaborate In Real Time",
      desc: "Assign tasks, manage teams, and work together from anywhere.",
    },
  ];
  
  export default function SignUpLeftPanel() {
    return (
      <div className="relative flex flex-col  min-h-screen bg-[#f8fafc] px-6 py-4 lg:px-12 overflow-hidden">
    
        <div className="relative z-10">
  
          {/* Logo */}
          <Logo />
  
          {/* Hero Section */}
          <div className="max-w-md mt-8 mb-10">
  
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-5">
              <SparklesIcon className="w-3.5 h-3.5" />
              Start your workspace
            </div>
  
            <h1 className="text-[32px] leading-[1.1] tracking-tight font-black text-slate-900">
              Bring your team
              <br />
              together in one place.
            </h1>
  
            <p className="text-sm leading-7 text-slate-500 mt-5 max-w-md">
              Create collaborative workspaces, manage tasks visually,
              and build flexible systems tailored to your workflow.
            </p>
  
          </div>
  
          {/* Highlight Cards */}
          <div className="space-y-3 max-w-lg">
  
            {highlights.map((item) => (
              <Card
                key={item.title}
                hoverable
                variant="outlined"
                className="bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="flex items-start gap-4">
  
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
  
                  <div>
  
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
  
                    <p className="text-sm text-slate-500 leading-6 mt-1">
                      {item.desc}
                    </p>
  
                  </div>
  
                </CardContent>
              </Card>
            ))}
  
          </div>
        </div>
  
        {/* Bottom CTA Card */}
        <div className="relative z-10 mt-8 max-w-lg">
  
          <Card
            variant="filled"
            className="border border-orange-100 bg-orange-50/80"
          >
            <CardContent>
  
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 mb-3">
                Designed for productivity
              </p>
  
              <h3 className="text-base font-semibold text-slate-900 leading-7">
                From startups to growing organisations,
                Syncovo helps teams stay aligned,
                organised, and productive every day.
              </h3>
  
              <div className="flex items-center gap-3 mt-4">
  
                <div className="flex -space-x-2">
                  {["A", "R", "K"].map((item) => (
                    <div
                      key={item}
                      className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold"
                    >
                      {item}
                    </div>
                  ))}
                </div>
  
                <p className="text-sm text-slate-600">
                  Built for fast-moving collaborative teams.
                </p>
  
              </div>
  
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }