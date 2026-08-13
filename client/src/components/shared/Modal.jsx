export default function Modal({ children, customClasses }) {
    return (
        <div className={`fixed bg-espresso/40 inset-0 z-50 ${customClasses}`}>
            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-1/2 -translate-y-1/2 md:max-w-[392px]">
                {children}
            </div>
        </div>
    )
}