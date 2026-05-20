export default function Logo() {
    return (
        <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-[#f97316] flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm tracking-tight">
                SY
            </span>
        </div>

        <div>
            <h2 className="text-lg font-extrabold tracking-tight text-[#0f172a]">
                Syncovo
            </h2>

            <p className="text-xs text-slate-500 font-medium">
                Collaborative Workspace Platform
            </p>
        </div>
    </div>
    );
}