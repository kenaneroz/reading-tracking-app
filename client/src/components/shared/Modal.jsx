import { useEffect, useRef, useState } from "react"

export default function Modal({ children, customClasses }) {
    const contentRef = useRef(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
        function checkOverflow() {
            if (!contentRef.current) return

            const contentHeight = contentRef.current.scrollHeight
            const maxAllowedHeight = window.innerWidth >= 768 ? 956 : window.innerHeight

            setIsOverflowing(contentHeight > maxAllowedHeight)
        }

        checkOverflow()
        window.addEventListener("resize", checkOverflow)
        return () => window.removeEventListener("resize", checkOverflow)
    }, [children])

    return (
        <div className={`md:max-w-110 md:max-h-239 fixed bg-espresso/40 inset-0 z-50 ${customClasses}`}>
            <div
                ref={contentRef}
                className={`
                    p-5 bg-beige border border-tan rounded-[20px] md:max-w-100 w-[calc(100%-40px)] fixed left-5 right-5 overflow-y-auto
                    ${isOverflowing
                        ? "top-5 bottom-5 md:max-h-[916px]"
                        : "top-1/2 -translate-y-1/2"
                    }
                `}
            >
                {children}
            </div>
        </div>
    )
}