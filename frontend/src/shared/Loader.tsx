// src/components/ui/Loader.tsx

type LoaderProps = {
    loading: boolean;
    message?: string;
};

export default function Loader({ loading, message = "Loading..." }: LoaderProps) {
    if (!loading) return null;

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center cursor-not-allowed"
            style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(2px)" }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-white rounded-xl border border-gray-100 px-8 py-6 flex flex-col items-center gap-3 min-w-[160px] shadow-none">
                <div className="w-8 h-8 rounded-full border-[2.5px] border-orange-100 border-t-orange-500 animate-spin" />
                <p className="text-sm font-medium text-gray-800">{message}</p>
                <p className="text-xs text-gray-400">Please wait</p>
            </div>
        </div>
    );
}