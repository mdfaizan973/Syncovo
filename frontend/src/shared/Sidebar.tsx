import { useState } from "react";
import { Icons } from "../Pages/MainContent/components/DashboardIcons";
import { getUserInfoStorage } from "../utils/storage";
import { getUserInitials, logOutUser } from "../utils/commonUtils";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Book, LayoutPanelTop, Table } from "lucide-react";
import { WORKSPACES_RESPONSE } from "../Pages/workspaces/mock";
import useNotes from "../hooks/useNotes";
import { useWorkspaces } from "../hooks/useWorkspaces";
import { Button } from "../components/ui/button";

type NavItem = {
  id: string; label: string; icon: () => React.ReactNode;
  badge?: string | number; badgeType?: "count" | "status" | "new";
  navigateTo?: string;
  children?: SubItem[];
};
type SubItem = { id: string; label: string; badge?: string; badgeType?: "count" | "draft" | "live"; navigateTo?: string };
type Section = { title: string; items: NavItem[]; onClick?: () => void };



const SITES = [
  { id: "main", name: "Syncovo Main", status: "live", url: "syncovo.io" },
  { id: "docs", name: "Docs Site", status: "live", url: "docs.syncovo.io" },
  { id: "blog", name: "Blog", status: "draft", url: "blog.syncovo.io" },
];

const getActiveNavId = (pathname: string) => {

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return "dashboard";
  }

  if (pathname.startsWith("/dashboard/quicknote")) {
    return "quicknote";
  }

  if (pathname.startsWith("/dashboard/create-note")) {
    return "createNote";
  }

  if (pathname.startsWith("/dashboard/workspaces")) {
    return "workspaces";
  }

  if (pathname.startsWith("/dashboard/workspace-view/")) {
    return "workspaces";
  }

  if (pathname.startsWith("/dashboard/table-view/")) {
    return "workspaces";
  }

  if (pathname.startsWith("/dashboard/form-builder")) {
    return "formBuilder";
  }
  if (pathname.startsWith("/dashboard/forms")) {
    return "forms";
  }
  if (pathname.startsWith("/dashboard/tables")) {
    return "tables";
  }

  return "dashboard";
};

const getPageTitle = (pathname: string) => {

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return "Dashboard";
  }

  if (pathname.startsWith("/dashboard/quicknote")) {
    return "Quick Note";
  }

  if (pathname.startsWith("/dashboard/create-note")) {
    return "Create Note";
  }

  if (pathname.startsWith("/dashboard/workspaces")) {
    return "Workspaces";
  }

  if (pathname.startsWith("/dashboard/workspace-view/")) {
    return "Workspace View";
  }

  if (pathname.startsWith("/dashboard/table-view/")) {
    return "Table View";
  }

  if (pathname.startsWith("/dashboard/form-builder")) {
    return "Form Builder";
  }
  if (pathname.startsWith("/dashboard/forms")) {
    return "Forms";
  }
  if (pathname.startsWith("/dashboard/tables")) {
    return "Tables";
  }

  return "Dashboard";
};

/* ── Badge ── */
function Badge({ value, type }: { value?: string | number; type?: string }) {
  if (!value) return null;
  if (type === "status" || value === "New")
    return <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-black tracking-widest uppercase bg-orange-100 text-orange-600 border border-orange-200">{value}</span>;
  if (type === "draft")
    return <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200">{value}</span>;
  if (type === "live")
    return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-green-50 text-green-600 border border-green-200"><span className="w-1 h-1 rounded-full bg-green-500 inline-block" />{value}</span>;
  return <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md text-[10px] font-bold bg-orange-50 text-orange-400 border border-orange-100">{value}</span>;
}

/* ── SubNavItem ── */
function SubNavItem({ item, onSelect }: { item: SubItem; onSelect: () => void }) {
  return (
    <button onClick={onSelect}
      className="cursor-pointer w-full flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left transition-all duration-150 text-gray-400 hover:text-gray-600 hover:bg-gray-50">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-1 h-1 rounded-full flex-shrink-0 bg-gray-300" />
        <span className="text-xs font-medium truncate text-gray-500">{item.label}</span>
      </div>
      <Badge value={item.badge} type={item.badgeType} />
    </button>
  );
}

/* ── NavItem ── */
function NavItem({ item, active, expanded, onSelect, onToggle, collapsed }: {
  item: NavItem; active: boolean; expanded: boolean;
  onSelect: (id: string, navigateTo: string) => void; onToggle: (id: string) => void; collapsed: boolean;
}) {
  const hasChildren = !!item.children?.length;

  return (
    <div>
      <button
        onClick={() => hasChildren ? onToggle(item.id) : onSelect(item.id, item.navigateTo)}
        title={collapsed ? item.label : undefined}
        className={[
          "w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all duration-150 relative group border",
          active && !hasChildren
            ? "bg-orange-50 border-orange-200 text-orange-600"
            : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700",
        ].join(" ")}
      >
        {active && !hasChildren && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-orange-500" />
        )}
        <span className={`w-5 h-5 flex-shrink-0 transition-colors duration-150 ${active ? "text-orange-500" : "text-gray-400 group-hover:text-gray-600"}`}>
          <item.icon />
        </span>
        {!collapsed && (
          <>
            <span className={`flex-1 cursor-pointer text-sm font-semibold truncate min-w-0 ${active ? "text-orange-600" : "text-gray-600 group-hover:text-gray-800"}`}>
              {item.label}
            </span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {item.badge !== undefined && <Badge value={item.badge} type={item.badgeType} />}
              {hasChildren && (
                <span className="w-3 h-3 flex-shrink-0 text-gray-300 transition-transform duration-200"
                  style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}>
                  <Icons.chevronRight />
                </span>
              )}
            </div>
          </>
        )}
      </button>
      {hasChildren && expanded && !collapsed && (
        <div className="mt-0.5 ml-4 pl-3 flex flex-col gap-0.5 border-l border-gray-100">
          {item.children!.map(child => (
            <SubNavItem key={child.id} item={child} onSelect={() => onSelect(child.id, child.navigateTo)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── SiteSwitcher ── */
function SiteSwitcher({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(SITES[0]);
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2.5 rounded-xl p-2.5 transition-all duration-150 bg-orange-50 border border-orange-100 hover:border-orange-200 hover:bg-orange-100">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-orange-500">
          <span className="text-white font-black text-[10px]">SY</span>
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-gray-900 truncate leading-none">{selected.name}</p>
              <p className="text-[10px] mt-0.5 truncate text-gray-400">{selected.url}</p>
            </div>
            <span className="w-3.5 h-3.5 flex-shrink-0 text-gray-400 transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
              <Icons.chevronDown />
            </span>
          </>
        )}
      </button>
      {open && !collapsed && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden z-50 bg-white border border-gray-100 shadow-lg shadow-gray-100">
          {SITES.map(site => (
            <button key={site.id} onClick={() => { setSelected(site); setOpen(false); }}
              className={["w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors duration-100 hover:bg-orange-50",
                selected.id === site.id ? "bg-orange-50" : ""].join(" ")}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-orange-500 text-white font-black text-[9px]">
                {site.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate leading-none">{site.name}</p>
                <p className="text-[10px] mt-0.5 truncate text-gray-400">{site.url}</p>
              </div>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${site.status === "live" ? "bg-green-400" : "bg-amber-400"}`} />
            </button>
          ))}
          <div className="border-t border-gray-100">
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors">
              <span className="w-4 h-4"><Icons.plus /></span>
              <span className="text-xs font-semibold">Add new site</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── UserCard ── */
function UserCard({ collapsed, userInfo }: any) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-2.5 rounded-xl p-2">
      <div className="flex items-center gap-2.5 rounded-xl p-2 cursor-pointer group hover:bg-gray-50 transition-colors duration-150">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-orange-500 font-black text-white text-[11px]">
          {userInfo ? getUserInitials(userInfo?.full_name ?? "") : "-"}
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate leading-none">{userInfo?.full_name ?? "-"}</p>
              <p className="text-[10px] mt-0.5 truncate text-gray-400">{userInfo?.role_type ?? "-"}</p>
            </div>
          </>
        )}
      </div>
      <span
        onClick={() => {
          logOutUser();
          navigate("/");
        }}
        className="w-4 h-4 cursor-pointer hover:text-red-500 flex-shrink-0 text-gray-300 group-hover:text-gray-400 transition-colors">
        <Icons.logout />
      </span>
    </div>
  );
}

/* ── SidebarContent (reused for desktop + mobile drawer) ── */
function SidebarContent({ collapsed, setCollapsed, activeId, setActiveId, expandedIds, toggleExpand, onNavSelect, userInfo, notes }: {
  collapsed: boolean; setCollapsed: (v: boolean) => void;
  activeId: string; setActiveId: (id: string) => void;
  expandedIds: Set<string>; toggleExpand: (id: string) => void;
  onNavSelect?: (id: string) => void;
  userInfo: any;
  notes: any[];
}) {

  const navigate = useNavigate();

  const { workspaces } = useWorkspaces();

  const noteCount = notes?.length ?? 0;

  const NAV_SECTIONS: Section[] = [
    {
      title: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Icons.dashboard, navigateTo: "/dashboard" },
        { id: "workspaces", label: "Workspaces", icon: Icons.analytics, navigateTo: "/dashboard/workspaces" },
        { id: "quicknote", label: "Notes", icon: () => <Book className="w-4 h-4" />, badge: noteCount, badgeType: "count", navigateTo: "/dashboard/quicknote" },
      ],
    },
    {
      title: "Workspaces",
      onClick: () => navigate("/dashboard/workspaces"),
      items: workspaces?.map((workspace) => ({
        id: workspace.id,
        label: workspace.name,
        icon: Icons.content,
        navigateTo: `/dashboard/workspace-view/${workspace.id}`,
      })),
    },
    {
      title: "Notes",
      onClick: () => { navigate("/dashboard/quicknote") },
      items: notes?.slice(0, 5)?.map((note) => ({
        id: note.id,
        label: note.title,
        icon: Icons.content,
        navigateTo: `/dashboard/view-note/${note.id}`,
      })),
    }
  ];


  const handleSelect = (id: string, navigateTo: string) => {
    setActiveId(id);
    navigate(navigateTo);

    onNavSelect?.(id);
  };

  console.log(NAV_SECTIONS);

  return (
    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>

      {/* Logo + Collapse */}
      <div className="flex items-center justify-between px-3 pt-4 pb-3 flex-shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-500 shadow-sm shadow-orange-200">
            <span className="text-white font-black text-[11px]">SY</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-gray-900 font-extrabold text-sm leading-none tracking-tight">Syncovo</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 bg-gray-100 hover:bg-orange-50 text-gray-400 hover:text-orange-500 border border-gray-200 hover:border-orange-200"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="w-3.5 h-3.5">{collapsed ? <Icons.expand /> : <Icons.collapse />}</span>
        </button>
      </div>

      {/* Site Switcher */}
      {/* <div className="px-2.5 py-3 flex-shrink-0">
        <SiteSwitcher collapsed={collapsed} />
      </div> */}


      {/* Nav sections */}
      <nav className="flex-1 px-2 pb-2 flex flex-col mt-4 gap-4">
        {NAV_SECTIONS?.map(section => (
          <div key={section.title}>
            {!collapsed ? (
              <div className="flex items-center justify-between">
                <p className="px-2 mb-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-gray-300">
                  {section.title}
                  <span className="text-gray-400 ml-2 text-[10px]">({section?.items?.length ?? 0})</span>
                </p>
                {section?.onClick && section?.items?.length > 4 && (
                  <Button
                    type="button"
                    onClick={section.onClick}
                    variant="link"
                    size="sm"
                    className="text-[10px]"
                  >
                    View All
                  </Button>
                )}
              </div>
            ) : (
              <div className="my-1 mx-2 h-px bg-gray-100" />
            )}
            <div className="flex flex-col gap-0.5">
              {section.items?.slice(0, 4)?.map(item => (
                <NavItem
                  key={item.id}
                  item={item}
                  active={activeId === item.id}
                  expanded={expandedIds.has(item.id)}
                  onSelect={(id, navigateTo) => handleSelect(id, navigateTo)}
                  onToggle={toggleExpand}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2.5 py-3 flex-shrink-0 flex flex-col gap-2 border-t border-gray-100">
        {/* <button className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 w-full text-left transition-all duration-150 text-gray-400 hover:bg-gray-50 hover:text-gray-600" title="Notifications">
          <div className="relative w-5 h-5 flex-shrink-0">
            <Icons.bell />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 border-2 border-white" />
          </div>
          {!collapsed && (
            <>
              <span className="text-sm font-semibold text-gray-500">Notifications</span>
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-500 border border-orange-100">3</span>
            </>
          )}
        </button> */}
        <UserCard collapsed={collapsed} userInfo={userInfo} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function Sidebar() {

  const navigate = useNavigate();
  const userInfo = getUserInfoStorage();
  const location = useLocation();
  const activeId = getActiveNavId(location.pathname);

  const { notes } = useNotes(true);

  const [collapsed, setCollapsed] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["content"]));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={[
          "fixed top-0 left-0 h-full z-50 bg-white border-r border-gray-100 shadow-xl shadow-gray-200 transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        style={{ width: "260px" }}
      >
        <SidebarContent
          collapsed={false}
          setCollapsed={() => { }}
          activeId={activeId}
          setActiveId={() => { }}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          onNavSelect={() => setMobileOpen(false)}
          userInfo={userInfo}
          notes={notes}
        />
      </div>

      {/* Desktop sidebar */}
      <div
        className="hidden lg:flex flex-col flex-shrink-0 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out"
        style={{ width: collapsed ? "72px" : "240px", minHeight: "100vh" }}
      >
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeId={activeId}
          setActiveId={() => { }}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          userInfo={userInfo}
          notes={notes}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3.5 bg-white flex-shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-3">

            <button
              className="lg:hidden cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-colors border border-gray-200 hover:border-orange-200"
              onClick={() => setMobileOpen(true)}
            >
              <span className="w-5 h-5"><Icons.menu /></span>
            </button>

            <button
              className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-colors border border-gray-200 hover:border-orange-200"
              onClick={() => navigate(-1)}
            >
              <span className="w-5 h-5"><Icons.back /></span>
            </button>

            <div>
              <h1 className="text-base font-extrabold text-gray-900 tracking-tight leading-none capitalize">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs bg-orange-500">
              {userInfo ? getUserInitials(userInfo?.full_name ?? "") : "-"}
            </div>
          </div>
        </div>

        {/* Page body */}
        <Outlet />
      </div>
    </div>
  );
}
