function SidebarSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="sidebar-scrollbar-hidden mt-5 min-h-0 flex-1 space-y-1 overflow-y-auto overflow-x-hidden pb-20"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="flex animate-pulse items-center gap-3 rounded-xl p-3 sm:p-4"
        >
          <div className="size-10 shrink-0 rounded-full bg-gray-300/70" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-2/5 rounded bg-gray-300/70" />
            <div
              className={`h-3 rounded bg-gray-300/70 ${
                i % 2 === 0 ? "w-3/4" : "w-1/2"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SidebarSkeleton;
