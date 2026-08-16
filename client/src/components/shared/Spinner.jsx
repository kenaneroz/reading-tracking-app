export default function Spinner({ size = 18, color = "#F6F2EB" }) {
    return (
        <div
            className="animate-spin rounded-full border-2 border-t-transparent"
            style={{
                width: size,
                height: size,
                borderColor: color,
                borderTopColor: "transparent",
            }}
        />
    )
}