export default function Modal({ children, customClasses }) {
    return (
        <div className={`z-50 absolute inset-0 bg-espresso/20 h-full ${customClasses}`}>
            <div className="h-full bg-beige m-5 p-5 rounded-[20px] border border-tan">
                {children}
            </div>
        </div>
    )
}