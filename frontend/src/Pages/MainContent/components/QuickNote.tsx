import {
    MoreHorizontal,
    Share2,
    Star,
    Clock3,
    Search,
    SmilePlus,
    Image,
    ListTodo,
    Heading1,
    Heading2,
    Quote,
    CheckSquare,
    Code2,
    Link2,
} from "lucide-react";

export default function QuickNote() {
    return (
        <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4 lg:p-5">
            <div className="max-w-6xl mx-auto flex flex-col gap-4">

                {/* Top Header */}
                <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center">
                            <SmilePlus className="w-5 h-5 text-orange-500" />
                        </div>

                        <div>
                            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#1F2937]">
                                Quick Note
                            </h1>

                            <p className="text-sm text-gray-400 mt-1">
                                Capture thoughts, meeting notes, tasks, ideas & docs
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">

                        <button className="h-10 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <Clock3 className="w-4 h-4" />
                            History
                        </button>

                        <button className="h-10 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Favorite
                        </button>

                        <button className="h-10 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 transition-all text-sm font-bold text-white flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>

                        <button className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center">
                            <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </button>

                    </div>
                </div>

                {/* Main Editor */}
                <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-4">

                    {/* Sidebar */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 h-fit sticky top-4">

                        {/* Search */}
                        <div className="h-10 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-2 px-3 mb-4">
                            <Search className="w-4 h-4 text-gray-400" />

                            <input
                                placeholder="Search blocks..."
                                className="bg-transparent outline-none text-sm flex-1 text-gray-700 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Block Tools */}
                        <div className="flex flex-col gap-2">

                            {[
                                {
                                    icon: Heading1,
                                    title: "Heading 1",
                                },
                                {
                                    icon: Heading2,
                                    title: "Heading 2",
                                },
                                {
                                    icon: ListTodo,
                                    title: "Todo List",
                                },
                                {
                                    icon: Quote,
                                    title: "Quote",
                                },
                                {
                                    icon: CheckSquare,
                                    title: "Checklist",
                                },
                                {
                                    icon: Image,
                                    title: "Image",
                                },
                                {
                                    icon: Link2,
                                    title: "Link",
                                },
                                {
                                    icon: Code2,
                                    title: "Code Block",
                                },
                            ].map((item) => (
                                <button
                                    key={item.title}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-all text-left group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all">
                                        <item.icon className="w-4 h-4 text-gray-500 group-hover:text-orange-500" />
                                    </div>

                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-500">
                                        {item.title}
                                    </span>
                                </button>
                            ))}

                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 overflow-hidden">

                        {/* Toolbar */}
                        <div className="border-b border-gray-100 px-5 py-3 flex flex-wrap items-center gap-2 bg-white sticky top-0 z-10">

                            {[
                                "Text",
                                "H1",
                                "H2",
                                "Bold",
                                "Italic",
                                "Code",
                                "Quote",
                                "Todo",
                            ].map((tool) => (
                                <button
                                    key={tool}
                                    className="h-9 px-3 rounded-lg border border-gray-200 hover:bg-orange-50 hover:border-orange-100 hover:text-orange-500 transition-all text-sm font-semibold text-gray-600"
                                >
                                    {tool}
                                </button>
                            ))}

                        </div>

                        {/* Note Content */}
                        <div className="px-5 md:px-8 py-6">

                            {/* Title */}
                            <textarea
                                placeholder="Untitled Note"
                                rows={1}
                                className="w-full resize-none outline-none text-3xl md:text-4xl font-black tracking-tight text-[#1F2937] placeholder:text-gray-300 overflow-hidden"
                            />

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-3 mt-4 mb-6">

                                <span className="bg-orange-50 text-orange-500 border border-orange-100 px-3 py-1 rounded-xl text-xs font-bold">
                                    Productivity
                                </span>

                                <span className="text-xs text-gray-400 font-medium">
                                    Last edited 2 mins ago
                                </span>

                                <span className="text-xs text-gray-400 font-medium">
                                    Auto-saved
                                </span>

                            </div>

                            {/* Content Area */}
                            <textarea
                                placeholder="Start writing here...
  
  Type '/' for commands like Notion
  
  You can create:
  - Headings
  - Checklists
  - Tasks
  - Code blocks
  - Quotes
  - Notes
  - Images
  - Links"
                                className="w-full min-h-[500px] resize-none outline-none text-[15px] leading-8 text-gray-700 placeholder:text-gray-300"
                            />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}