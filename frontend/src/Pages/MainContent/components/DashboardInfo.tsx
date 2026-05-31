import {
  FileText,
  Bell,
  Clock3,
  CheckCircle2,
  Book,
  StickyNote,
  LayoutPanelTop,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { getGreetings } from "../../../utils/commonUtils";
import { getUserInfoByKey } from "../../../utils/storage";
import useNotes from "../../../hooks/useNotes";
import { useTables } from "../../../hooks/useTables";
import { useEffect } from "react";
import { useUserInfo } from "../../../hooks/userInfo";

export default function DashboardInfo() {
  const navigate = useNavigate();

  const { notes } = useNotes(true);

  const userId = getUserInfoByKey("id");
  const { userInfo } = useUserInfo(userId);
  console.log(userInfo);

  const myNotes = notes?.length ?? 0;

  // make the stats dynamic based on the data from the backend and should be simmiler to my project dashboard
  const stats = [
    {
      label: "My Active Tasks",
      value: "18",
      info: "",
      color: "text-orange-500",
      bg: "bg-orange-50",
      icon: Clock3,
    },
    {
      label: "My Notes",
      value: myNotes,
      info: "",
      color: "text-red-500",
      bg: "bg-red-50",
      icon: Book,
    },
    {
      label: "My Forms/Tables",
      value: 10,
      info: "",
      color: "text-green-500",
      bg: "bg-green-50",
      icon: LayoutPanelTop,
    },
    {
      label: "Unread Notifications",
      value: "9",
      info: "3 mentions pending",
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      icon: Bell,
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

  const databases = [
    {
      name: "Finalyca Tech",
      tasks: "24 Tasks",
      members: "8 Members",
    },
    {
      name: "Finalyca Sales",
      tasks: "12 Tasks",
      members: "5 Members",
    },
    {
      name: "Finalyca Marketing",
      tasks: "9 Tasks",
      members: "4 Members",
    },
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
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

          {stats.map((item) => (

            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
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
                  My Tasks
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  Assigned tasks across workspaces
                </p>
              </div>

              <button className="h-7 px-3 cursor-pointer text-xs font-medium rounded-lg border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                View All
              </button>

            </div>

            <div className="divide-y divide-gray-100">

              {tasks.map((task, index) => (

                <div
                  key={index}
                  className="px-4 py-3 hover:bg-orange-50/30 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center gap-2"
                >

                  <div className="flex-1 min-w-0">

                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {task.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {task.workspace} · Due {task.due}
                    </p>

                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">

                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${task.priority === "Critical"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : task.priority === "High"
                            ? "bg-orange-50 text-orange-600 border-orange-100"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${task.status === "In Progress"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : task.status === "Review"
                            ? "bg-purple-50 text-purple-600 border-purple-100"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                    >
                      {task.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">

            {/* Databases */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">

                <h2 className="text-sm font-bold tracking-tight text-gray-800">
                  Databases
                </h2>

                <button className="h-7 px-3 cursor-pointer text-xs font-medium rounded-lg border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                  View All
                </button>

              </div>

              <div className="p-3 flex flex-col gap-2">

                {databases.map((database, index) => (

                  <div
                    key={index}
                    className="border border-gray-100 rounded-xl px-3 py-2.5 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 cursor-pointer"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-2.5 min-w-0">

                        <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                          <span className="text-xs">🗄️</span>
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-sm font-medium text-gray-800 truncate">
                            {database.name}
                          </h3>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {database.tasks} · {database.members}
                          </p>

                        </div>

                      </div>

                      <button className="h-7 px-2.5 text-xs font-medium rounded-lg border border-orange-100 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors shrink-0">
                        Open
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