import { FileSearch, Plus } from "lucide-react";
import { Button } from "../components/ui/button";

interface DataNotFoundProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function DataNotFound({
  title = "No Data Found",
  description = "We couldn’t find anything here. Try creating a new entry or adjusting your filters.",
  actionLabel = "Create New",
  onAction,
}: DataNotFoundProps) {
  return (
    <div className="w-full flex items-center justify-center py-10">
      
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl p-8 text-center transition-all duration-200">

        {/* Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center">
          <FileSearch className="w-6 h-6 text-orange-500" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#1F2937] mt-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {description}
        </p>

        {/* Action */}
        {onAction && (
          <div className="mt-5">
            <Button
              onClick={onAction}
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              {actionLabel}
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}