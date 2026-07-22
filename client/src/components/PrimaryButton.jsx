export default function PrimaryButton({ onClick, label }) {
    return (
        <button
            type="button"
            className="w-full bg-espresso text-cream px-6 h-14 rounded-[28px] text-body font-semibold cursor-pointer"
            onClick={onClick}
        >
            {label}
        </button>
    )
}