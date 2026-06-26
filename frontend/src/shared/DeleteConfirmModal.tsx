import { Trash, Loader2  } from "lucide-react";

interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    loading?: boolean;
}

export default function DeleteConfirmModal({
    open,
    onClose,
    onConfirm,
    title = "Delete Record",
    description = "This action cannot be undone. The record will be permanently removed.",
    loading = false,
}: DeleteConfirmModalProps) {

    if (!open) return null;

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
        >
            <div className="w-full max-w-sm bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden">

                {/* Icon + Text */}
                <div className="flex flex-col items-center text-center gap-3 px-6 pt-6 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                        <Trash className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-800">{title}</p>
                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">{description}</p>
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Buttons */}
                <div className="flex items-center gap-2.5 px-6 py-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-9 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 h-9 text-sm font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
                    >
                        {loading ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Deleting...
                                </>
                        ) : (
                            <>
                                <Trash className="w-3.5 h-3.5" />
                                Yes, Delete
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
