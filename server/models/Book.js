import mongoose from "mongoose"

import { GENRE_OPTIONS } from "../../shared/constants/genreOptions.js"
import { RATING_OPTIONS } from "../../shared/constants/ratingOptions.js"
import { FORMAT_OPTIONS } from "../../shared/constants/formatOptions.js"

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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
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
            enum: GENRE_OPTIONS
        },
        cover: {
            type: String,
            default: "https://res.cloudinary.com/hribndmg/image/upload/v1788348964/default-cover.jpg",
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
        rating: {
            type: String,
            default: null,
            enum: RATING_OPTIONS
        },
        format: {
            type: String,
            required: true,
            trim: true,
            enum: FORMAT_OPTIONS
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

bookSchema.index(
    { userId: 1, title: 1 }, 
    { 
        unique: true,
        collation: { locale: "en", strength: 2 }
    }
)

const Book = mongoose.model("Book", bookSchema)

export default Book