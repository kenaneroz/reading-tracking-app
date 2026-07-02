const controls = ['Recently added', 'Title A-Z', 'Progress']

export default function SortFilter({ activeSortControl, onSortControlChange }) {
    return (
        <div 
            role="tablist"
            className="flex flex-col gap-3 absolute top-8 right-0 bg-beige rounded-2xl p-4 border border-tan"
        >
            {
                controls.map(control => (
                    <button
                        key={control}
                        type="button"
                        role="tab"
                        aria-selected={activeSortControl === control}
                        onClick={() => onSortControlChange(control)}
                        className={`${activeSortControl === control ? 'text-espresso font-medium' : 'text-taupe'} cursor-pointer rounded-full text-body-sm text-left hover:text-espresso transition-all duration-300`}
                    >
                        {control}
                    </button>
                ))
            }
        </div>
    )
}