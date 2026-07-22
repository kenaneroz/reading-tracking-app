const filters = ['All', 'Reading', 'Finished', 'Wishlist']

export default function StatusFilter({ activeStatusFilter, onStatusFilterChange }) {
    return (
        <div 
            role="tablist"
            className="flex gap-2 overflow-x-hidden pt-4"    
        >
            {
                filters.map(filter => (
                    <button
                        key={filter}
                        type="button"
                        role="tab"
                        aria-selected={activeStatusFilter === filter}
                        onClick={() => onStatusFilterChange(filter)}
                        className={`${activeStatusFilter === filter ? 'bg-espresso text-cream' : 'bg-beige text-taupe'} cursor-pointer h-9 px-4 rounded-full text-body-sm font-medium`}
                    >
                        {filter}
                    </button>
                ))
            }
        </div>
    )
}