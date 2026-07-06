export const books = [
    {
        id: 0,
        title: "Madonna in a Fur Coat",
        author: "Sabahattin Ali",
        genre: "Romance",
        cover: "/madonna-in-a-fur-coat.jpg",

        status: "Reading",
        currentPage: 59,
        totalPages: 160,
        isFavorite: false,

        dateAdded: 1782518400000,
        updatedAt: 1782604800000,

        readingActivity: [
            {
                id: 0,
                previousPage: 0,
                currentPage: 59,
                date: 1782604800000,
            },
        ],
        notes: [
            {
                id: 0,
                note: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
                page: "4",
                date: 1782604800000,
            }
        ]
    },
    {
        id: 1,
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        genre: "Classic",
        cover: "/crime-and-punishment.jpg",

        status: "Reading",
        currentPage: 300,
        totalPages: 430,
        isFavorite: false,

        dateAdded: 1774357200000,
        updatedAt: 1774337040000,

        readingActivity: [
            {
                id: 0,
                previousPage: 0,
                currentPage: 96,
                date: 1774337040000,
            },
            {
                id: 1,
                previousPage: 96,
                currentPage: 200,
                date: 1774454400000,
            },
            {
                id: 1,
                previousPage: 200,
                currentPage: 300,
                date: 1774530000000,
            },
        ],
        notes: [
            {
                id: 0,
                note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                page: "16",
                date: 1774337040000,
            }
        ]
    }
]