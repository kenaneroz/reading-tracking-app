export default function EmptyState({ customClasses }) {
    return (
        <div className={`w-full h-full flex justify-center items-center text-center ${customClasses}`}>
            <p className="text-body-sm text-coffee font-medium">
                No data available
            </p>
        </div>
    )
}