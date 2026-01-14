import { Filter, Grid3x3, List } from "lucide-react";

export default function FilterBar({
  onFilterClick,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-end">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                    : "text-gray-400 dark:text-white hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                    : "text-gray-400 dark:text-white hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={onFilterClick}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all bg-white dark:bg-gray-800"
            >
              <Filter className="w-5 h-5 text-gray-600 dark:text-white" />
              <span className="font-medium text-gray-700 dark:text-white">Filter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
