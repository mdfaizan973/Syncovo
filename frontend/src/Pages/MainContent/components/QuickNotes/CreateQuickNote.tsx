import {
    Share2,
    SmilePlus,
    Save,
    Plus,
    ArrowLeft,
    List,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateQuickNote() {
    const navigate = useNavigate();
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
                                Create Note
                            </h1>

                            <p className="text-sm text-gray-400 mt-1">
                                Capture thoughts, meeting notes, tasks, ideas & docs
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">

                        <button 
                        onClick={() => navigate("/dashboard/quicknote")} 
                        className="h-10 px-4 cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-600 transition-all text-sm font-bold text-white flex items-center gap-2">
                            <List className="w-4 h-4" />
                            All Notes
                        </button>

                        <button className="h-10 px-4 cursor-pointer rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save
                        </button>

                        {/* <button className="h-10 px-4 cursor-pointer rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button> */}


                    </div>
                </div>

                {/* Main Editor */}
                {/* <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-4"> */}
                {/* Sidebar Content */}
                {/* Editor Area */}
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 overflow-hidden">


                    {/* Note Content */}
                    <div className="px-5 md:px-8 py-6">

                        {/* Title */}
                        <textarea
                            placeholder="Untitled Note"
                            rows={1}
                            className="w-full resize-none outline-none text-3xl md:text-4xl font-black tracking-tight text-[#1F2937] placeholder:text-gray-300 overflow-hidden"
                        />


                        {/* Content Area */}
                        <textarea
                            placeholder="Start writing here..."
                            className="w-full min-h-[500px] resize-none outline-none text-[15px] leading-8 text-gray-700 placeholder:text-gray-300"
                        />

                    </div>

                </div>
                {/* </div> */}
            </div>
        </div>
    );
}