export default function CardShell({ children, customClasses = "" }) {
    return (
        <div className={`bg-beige border border-tan p-5 rounded-[20px] ${customClasses}`}>
            {children}
        </div>
    )
}