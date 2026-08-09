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
        rating: {
            type: Number,
            default: null,
            min: 1,
            max: 5,
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

const Book = mongoose.model("Book", bookSchema)

export default Book