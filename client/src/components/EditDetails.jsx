import TextInput from "./form/TextInput"
import NumberInput from "./form/NumberInput"
import FileInput from "./form/FileInput"
import Select from "./form/Select"
import PrimaryButton from "./PrimaryButton"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useParams } from "react-router-dom"

import { GENRE_OPTIONS } from "../../../shared/constants/genreOptions.js"
import { RATING_OPTIONS } from "../../../shared/constants/ratingOptions.js"
import { FORMAT_OPTIONS } from "../../../shared/constants/formatOptions.js"

export default function EditDetails({ book, setBooks, setIsEditPopupOpen, updateBook }) {
    const [formData, setFormData] = useState({
        title: book.title,
        author: book.author,
        genre: book.genre,
        cover: book.cover,
        currentPage: book.currentPage,
        totalPages: book.totalPages,
        rating: book.rating,
        format: book.format
    })

    async function handleUpdate() {
        const changedFields = {}

        Object.keys(formData).forEach(field => {
            if (formData[field] !== book[field]) {
                changedFields[field] = formData[field]
            }
        })

        const updatedBook = await updateBook(book._id, changedFields)

        setBooks(prevBooks =>
            prevBooks.map(book =>
                book._id === updatedBook._id
                    ? {
                        ...updatedBook,
                        status: updatedBook.currentPage === 0
                        ? "Wishlist"
                        : updatedBook.currentPage === updatedBook.totalPages 
                            ? "Finished" 
                            : "Reading"
                    }
                    : book
            )
        )

        setIsEditPopupOpen(false)
    }

    return (
        <div className="fixed bg-espresso/40 inset-0 z-50">
            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-6 bottom-6 md:max-w-[392px] md:max-h-[908px] overflow-y-auto">

                <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={24} 
                    strokeWidth={1.5}
                    className="text-espresso cursor-pointer"
                    onClick={() => setIsEditPopupOpen(false)}
                />
            
                <p className="h2 text-espresso mt-8">Edit book</p>

                <div className="mt-8">
                    <FileInput
                        id="cover"
                        label="Cover Image"
                        placeholder="Tap to change the cover"
                        errorMessage=""
                        onChange={(file) => setFormData(prev => ({...prev, cover: URL.createObjectURL(file)}))}
                    />

                    <div className="flex flex-col gap-5 mt-6">
                        <TextInput
                            id="title"
                            label="Title"
                            placeholder="Title"
                            errorMessage=""
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                        />

                        <TextInput 
                            id="author"
                            label="Author"
                            placeholder="Enter author's name"
                            errorMessage=""
                            value={formData.author}
                            onChange={(e) => setFormData(prev => ({...prev, author: e.target.value}))}
                        />

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <NumberInput
                                    id="currentPage"
                                    label="Current page"
                                    placeholder="1"
                                    min={1}
                                    errorMessage=""
                                    value={formData.currentPage}
                                    onChange={(e) => setFormData(prev => ({...prev, currentPage: Number(e.target.value)}))}
                                />
                            </div>

                            <div className="flex-1">
                                <NumberInput
                                    id="totalPages"
                                    label="Total pages"
                                    placeholder="1"
                                    min={1}
                                    errorMessage=""
                                    value={formData.totalPages}
                                    onChange={(e) => setFormData(prev => ({...prev, totalPages: Number(e.target.value)}))}
                                />
                            </div>
                        </div>

                        <Select 
                            id="genre"
                            label="Genre"
                            value={formData.genre}
                            options={GENRE_OPTIONS}
                            errorMessage=""
                            onChange={(e) => setFormData(prev => ({...prev, genre: e.target.value}))}
                        />

                        <Select 
                            id="rating"
                            label="Rating"
                            value={formData.rating}
                            options={RATING_OPTIONS}
                            errorMessage=""
                            onChange={(e) => setFormData(prev => ({...prev, rating: e.target.value}))}
                        />


                        <Select 
                            id="format"
                            label="Format"
                            value={formData.format}
                            options={FORMAT_OPTIONS}
                            errorMessage=""
                            onChange={(e) => setFormData(prev => ({...prev, format: e.target.value}))}
                        />
                    </div>

                    <div className="mt-8">
                        <PrimaryButton
                            label="Update"
                            onClick={handleUpdate}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}