import {
    MailIcon,
    GlobeIcon,
    HeartIcon,
  } from "lucide-react";
  
import {
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
  } from "react-icons/fa6";
  
  import Logo from "./Logo";
import { useTranslation } from "../hooks/useTranslation";
  

  const socialLinks = [
    {
      icon: <FaXTwitter className="w-4 h-4" />,
      href: "#",
    },
    {
      icon: <FaGithub className="w-4 h-4" />,
      href: "#",
    },
    {
      icon: <FaLinkedinIn className="w-4 h-4" />,
      href: "#",
    },
    {
      icon: <MailIcon className="w-4 h-4" />,
      href: "#",
    },
  ];
  
  export default function Footer() {
    const { t } = useTranslation();

    const footerLinks = {
        product: [
          "Features",
          "Workspaces",
          "Tasks",
          "Teams",
        ],
      
        resources: [
          "Documentation",
          "API",
          "Support",
          "Guides",
        ],
      
        company: [
          "About",
          "Privacy Policy",
          "Terms of Use",
          "Contact",
        ],
      };
      
    return (
      <footer className="border-t border-gray-100 bg-white">
  
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
  
          {/* Top */}
          <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
  
            {/* Brand */}
            <div className="lg:col-span-2">
  
              <Logo />
  
              <p className="text-sm leading-7 text-slate-500 mt-5 max-w-sm">
                {t.footer.description || "Syncovo is a collaborative workspace platform built for modern teams to manage projects, tasks, workflows, and dynamic data — all from a single flexible workspace."}
              </p>
  
              {/* Social */}
              <div className="flex items-center gap-3 mt-6">
  
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="w-10 h-10 cursor-not-allowed rounded-2xl border border-gray-100 bg-white hover:bg-orange-50 hover:border-orange-100 transition-all duration-200 flex items-center justify-center text-slate-500 hover:text-orange-500"
                  >
                    {item.icon}
                  </a>
                ))}
  
              </div>
  
            </div>
  
            {/* Links */}
            <div>
  
              <h3 className="text-sm font-bold text-[#0f172a] mb-5">
                {t.footer.sections.product || "Product"}
              </h3>
  
              <div className="space-y-3">
  
                {footerLinks.product.map((item) => (
                  <button
                    key={item}
                    className="block text-sm text-slate-500 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </button>
                ))}
  
              </div>
  
            </div>
  
            <div>
  
              <h3 className="text-sm font-bold text-[#0f172a] mb-5">
                {t.footer.sections.resources || "Resources"}
              </h3>
  
              <div className="space-y-3">
  
                {footerLinks.resources.map((item) => (
                  <button
                    key={item}
                    className="block text-sm text-slate-500 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </button>
                ))}
  
              </div>
  
            </div>
  
            <div>
  
              <h3 className="text-sm font-bold text-[#0f172a] mb-5">
                {t.footer.sections.company || "Company"}
              </h3>
  
              <div className="space-y-3">
  
                {footerLinks.company.map((item) => (
                  <button
                    key={item}
                    className="block text-sm text-slate-500 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </button>
                ))}
  
              </div>
  
            </div>
  
          </div>
  
          {/* Bottom */}
          <div className="border-t border-gray-100 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
  
            <div className="flex items-center gap-2 text-sm text-slate-400 text-center md:text-left">
  
              <span>© 2026 Syncovo.</span>
  
              <span className="hidden sm:block">{t.footer.bottom.copyright || "All rights reserved."}</span>
  
            </div>
  
            <div className="flex items-center gap-2 text-sm text-slate-400">
  
              <span>{t.footer.bottom.built || "Built for modern teams"}</span>
  
              <HeartIcon className="w-4 h-4 text-orange-500 fill-orange-500" />
  
              <GlobeIcon className="w-4 h-4 text-slate-400" />
  
            </div>
  
          </div>
  
        </div>
      </footer>
    );
  }