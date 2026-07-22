import mongoose from "mongoose"

const genres = [
    "Romance",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Horror",
    "Historical Fiction",
    "Classics",
    "Biography",
    "History",
    "Philosophy",
    "Psychology",
    "Self Help",
    "Poetry",
    "Other"
]

const readingActivitySchema = new mongoose.Schema({
    previousPage: {
        type: Number,
        required: true,
        min: 0
    }, 
    currentPage: {
        type: Number,
        required: true,
        min: 0 
    },
    date: {
        type: Number,
        default: Date.now
    }
})

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    page: {
        type: Number,
        default: null,
        min: 1
    },
    date: {
        type: Number,
        default: Date.now
    }
})

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        genre: {
            type: String,
            required: true,
            trim: true,
            enum: genres
        },
        cover: {
            type: String,
            required: true,
            trim: true
        },
        currentPage: {
            type: Number,
            default: 0,
            min: 0
        },
        totalPages: {
            type: Number,
            required: true,
            min: 1
        },
        readingActivity: [readingActivitySchema],
        notes: [noteSchema],
        createdAt: Number,
        updatedAt: Number,
    },
    { 
        timestamps: {
            currentTime: () => Date.now()
        } 
    }
) 

const Book = mongoose.model("Book", bookSchema)

export default Book