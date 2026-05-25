import {
    FileText,
    Bell,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    StickyNote,
  } from "lucide-react";
  
  export default function DashboardInfo() {
    const stats = [
      {
        label: "My Active Tasks",
        value: "18",
        info: "+4 assigned today",
        color: "text-orange-500",
        bg: "bg-orange-50",
        icon: Clock3,
      },
      {
        label: "Tasks Due Today",
        value: "5",
        info: "2 high priority",
        color: "text-red-500",
        bg: "bg-red-50",
        icon: AlertTriangle,
      },
      {
        label: "Completed This Week",
        value: "42",
        info: "+12% productivity",
        color: "text-green-500",
        bg: "bg-green-50",
        icon: CheckCircle2,
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
          },
    //   {
    //     title: "New Table",
    //     icon: FolderKanban,
    //     color: "bg-indigo hover:bg-indigo-600",
    //   },
    //   {
    //     title: "Invite Member",
    //     icon: Users,
    //     color: "bg-orange-500 hover:bg-orange-600",
    //   },
      {
        title: "Create Form",
        icon: FileText,
        color: "bg-indigo-500 hover:bg-indigo-600",
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
      <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4 lg:p-5">
        <div className="flex flex-col gap-4">
  
          {/* Header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 lg:p-6 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
  
              <div className="min-w-0">
                <p className="text-xs font-bold text-orange-500 mb-2">
                  Welcome Back 👋
                </p>
  
                <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-[#1F2937]">
                  Good Morning, Faizan
                </h1>
  
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Alpha Software Pvt Ltd • Product Q3 Workspace
                </p>
  
                <p className="text-sm text-gray-400 mt-1">
                  You have 18 active tasks and 5 pending deadlines today.
                </p>
              </div>
  
              {/* Quick Actions */}
              {/* put the contet at te  */}
              <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    className={`${action.color} cursor-pointer rounded-xl px-4 py-3 min-w-[100px]  text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm flex flex-col items-center justify-center gap-1.5`}
                  >
                    <action.icon className="w-5 h-5" />
  
                    <span className="text-xs font-bold leading-none">
                      {action.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
  
                <p className="text-xs font-semibold text-gray-400">
                  {item.label}
                </p>
  
                <h2 className="text-2xl font-black tracking-tight text-[#1F2937] mt-1">
                  {item.value}
                </h2>
  
                <p className={`text-xs font-semibold mt-1.5 ${item.color}`}>
                  {item.info}
                </p>
              </div>
            ))}
          </div>
  
          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_0.95fr] gap-4">
  
            {/* Tasks */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-black tracking-tight text-[#1F2937]">
                    My Tasks
                  </h2>
  
                  <p className="text-xs text-gray-400 mt-1">
                    Assigned tasks across workspaces
                  </p>
                </div>
  
                <button className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">
                  View All
                </button>
              </div>
  
              <div className="divide-y divide-gray-100">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="px-5 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer flex flex-col lg:flex-row lg:items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-[#1F2937] truncate">
                        {task.title}
                      </h3>
  
                      <p className="text-xs text-gray-400 mt-1">
                        {task.workspace} • Due {task.due}
                      </p>
                    </div>
  
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
                          task.priority === "Critical"
                            ? "bg-red-50 text-red-500 border-red-100"
                            : task.priority === "High"
                            ? "bg-orange-50 text-orange-500 border-orange-100"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {task.priority}
                      </span>
  
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
                          task.status === "In Progress"
                            ? "bg-blue-50 text-blue-500 border-blue-100"
                            : task.status === "Review"
                            ? "bg-purple-50 text-purple-500 border-purple-100"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Right Side */}
            <div className="flex flex-col gap-4">
  
                {/* Database */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-black tracking-tight text-[#1F2937]">
                    Databases
                  </h2>
                </div>
  
                <div className="p-4 flex flex-col gap-3">
                  {databases.map((database, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-xl px-4 py-3 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm text-[#1F2937] truncate">
                            {database.name}
                          </h3>
  
                          <p className="text-xs text-gray-400 mt-1">
                            {database.tasks} • {database.members}
                          </p>
                        </div>
  
                        <button className="bg-orange-50 text-orange-500 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors">
                          Open
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-black tracking-tight text-[#1F2937]">
                    Notifications
                  </h2>
                </div>
  
                <div className="divide-y divide-gray-100">
                  {notifications.map((note, index) => (
                    <div
                      key={index}
                      className="px-5 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm text-gray-600 leading-relaxed">
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