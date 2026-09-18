export default function ErrorMessage({ message }) {
    if (!message) return null

    return (
        <p className="text-red text-body-sm mt-1">
            {message}
        </p>
    )
}