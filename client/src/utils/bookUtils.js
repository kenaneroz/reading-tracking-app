export function getBookStatus(currentPage, totalPages) {
    if (currentPage === 0) return "Wishlist"
    if (currentPage === totalPages) return "Finished"

    return "Reading"
}