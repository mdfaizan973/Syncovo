import {
  FileText,
  Bell,
  Clock3,
  CheckCircle2,
  Book,
  StickyNote,
  LayoutPanelTop,
  ArrowRight,
  Folder,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { formatDate, getGreetings } from "../../../utils/commonUtils";
import { getUserInfoByKey } from "../../../utils/storage";
import useNotes from "../../../hooks/useNotes";
import { useTables } from "../../../hooks/useTables";
import { useEffect } from "react";
import { useUserInfo } from "../../../hooks/userInfo";

export default function DashboardInfo() {
  const navigate = useNavigate();

  const userId = getUserInfoByKey("id");
  const { userInfo } = useUserInfo(userId);
  console.log(userInfo);

  const stats = [
    {
      label: "Workspaces",
      value: userInfo?.totalWorkspaces?.length ?? 0,
      info: "Total workspaces you are a part of",
      color: "text-blue-500",
      bg: "bg-orange-50",
      icon: Folder,
    },
    {
      label: "My Notes",
      value: userInfo?.totalNotes?.length ?? 0,
      info: "Personal notes, ideas, and documentation",
      color: "text-green-500",
      bg: "bg-red-50",
      icon: Book,
    },
    // {
    //   label: "My Active Tasks",
    //   value: 0,
    //   info: "Tasks assigned to you across workspaces",
    //   color: "text-yellow-500",
    //   bg: "bg-orange-50",
    //   icon: Clock3,
    // },
    {
      label: "Forms / Tables",
      value: userInfo?.tables?.length ?? 0,
      info: "Total forms and tables you have created",
      color: "text-purple-500",
      bg: "bg-green-50",
      icon: LayoutPanelTop,
    },
  ];

  const quickActions = [
    {
      title: "Quick Note",
      icon: StickyNote,
      color: "bg-black hover:bg-neutral-800",
      path: "/dashboard/quicknote",
      onClick: () => {
        navigate("/dashboard/quicknote");
      },
    },
    {
      title: "Create Form",
      icon: FileText,
      color: "bg-indigo-500 hover:bg-indigo-600",
      path: "/dashboard/form-builder",
      onClick: () => {
        navigate("/dashboard/form-builder");
      },
    },
  ];

  const tasks = [
    {
      title: "Payment Gateway Timeout Issue",
      workspace: "Sprint Board",
      due: "Today",
      priority: "Critical",
      status: "In Progress",
    },
    {
      title: "Design Dashboard UI Improvements",
      workspace: "Product Q3",
      due: "Tomorrow",
      priority: "High",
      status: "Review",
    },
    {
      title: "Fix Mobile Responsive Sidebar",
      workspace: "Frontend Team",
      due: "May 29",
      priority: "Medium",
      status: "To Do",
    },
    {
      title: "Fix Mobile Responsive Sidebar",
      workspace: "Frontend Team",
      due: "May 29",
      priority: "Medium",
      status: "To Do",
    },
    {
      title: "Fix Mobile Responsive Sidebar",
      workspace: "Frontend Team",
      due: "May 29",
      priority: "Medium",
      status: "To Do",
    },
    {
      title: "Fix Mobile Responsive Sidebar",
      workspace: "Frontend Team",
      due: "May 29",
      priority: "Medium",
      status: "To Do",
    },
  ];

  const notifications = [
    "Riya assigned you to Payment Gateway Timeout Issue",
    "Sneha mentioned you in Sprint Board",
    "3 tasks are due tomorrow",
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4">

      <div className="max-w-7xl mx-auto flex flex-col gap-3">

        {/* ── Header card ── */}
        <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

            <div className="min-w-0 flex items-start gap-3">

              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-base">👋</span>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-orange-500">
                  Welcome Back
                </p>

                <h1 className="text-lg font-bold tracking-tight text-gray-800 mt-0.5">
                  {getGreetings()}, {getUserInfoByKey("full_name")}
                </h1>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 xl:shrink-0">

              {quickActions.map((action) => (

                <button
                  key={action.title}
                  onClick={action.onClick}
                  className={`${action.color} cursor-pointer rounded-lg px-4 h-9 text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm flex items-center gap-2`}
                >
                  <action.icon className="w-3.5 h-3.5" />

                  <span className="text-sm font-semibold leading-none">
                    {action.title}
                  </span>
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

          {stats.map((item) => (

            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
            >

              <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>

              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                {item.label}
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-800 mt-1">
                {item.value}
              </h2>

              <p className={`text-xs font-medium mt-1.5 ${item.color}`}>
                {item.info}
              </p>

            </div>

          ))}

        </div>

        {/* ── Main content ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_0.95fr] gap-3">

          {/* Tasks */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">

              <div>
                <h2 className="text-sm font-bold tracking-tight text-gray-800">
                  Notes
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  Notes, Ideas, and Documentation
                </p>
              </div>

              <button onClick={() => navigate("/dashboard/quicknote")} className="h-7 px-3 cursor-pointer text-xs font-medium rounded-lg border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                View All
              </button>

            </div>

            <div className="divide-y divide-gray-100 p-3">

              {userInfo?.totalNotes?.slice(0, 5)?.reverse()?.map((note, index) => (

                <div
                  key={index}
                  className={`px-4 border border-gray-100 py-3 mb-2 rounded-xl hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-2`}
                  onClick={() => navigate(`/dashboard/view-note/${note.id}`)}
                >

                  <div className="flex-1 min-w-0">

                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {note.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {note.description ? note.description : "No description available"}
                    </p>

                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="text-[11px] font-medium px-2 py-0.5  text-yellow-500 border-yellow-200">
                      {note.favorite ? <Star className="w-3.5 h-3.5 text-yellow-500" /> : null}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock3 className="w-3.5 h-3.5 text-gray-400" />
                      {formatDate(note.updated_at || "")}
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">

            {/* Workspaces */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">

                <h2 className="text-sm font-bold tracking-tight text-gray-800">
                  Workspaces
                </h2>

                <button onClick={() => navigate("/dashboard/workspaces")} className="h-7 px-3 cursor-pointer text-xs font-medium rounded-lg border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                  View All
                </button>

              </div>

              <div className="p-3 flex flex-col gap-2">

                {userInfo?.totalWorkspaces?.slice(0, 3)?.map((workspace, index) => (

                  <div
                    key={index}
                    className="border border-gray-100 rounded-xl px-3 py-2.5 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 cursor-pointer"
                    onClick={() => navigate(`/dashboard/workspace-view/${workspace.id}`)}
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-2.5 min-w-0">

                        <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                          <span className="text-xs">🗄️</span>
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-sm font-medium text-gray-800 truncate">
                            {workspace.name}
                          </h3>

                          <p className="text-xs text-gray-400 mt-0.5">
                            Editors: {workspace?.editors?.length ?? 0} | Viewers: {workspace?.viewers?.length ?? 0}
                          </p>

                        </div>

                      </div>

                      <button
                        className="h-7 px-2.5 cursor-pointer text-xs font-medium text-orange-600">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">

                <h2 className="text-sm font-bold tracking-tight text-gray-800">
                  Notifications
                </h2>

                <span className="text-[10px] font-medium px-1.5 py-px rounded-full text-white bg-indigo-500">
                  {notifications.length}
                </span>

              </div>

              <div className="divide-y divide-gray-100">

                {notifications.map((note, index) => (

                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-2.5"
                  >

                    <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-3 h-3 text-indigo-500" />
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {note}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}