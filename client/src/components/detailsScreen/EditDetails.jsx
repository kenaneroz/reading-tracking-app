import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal.jsx"
import Input from "../shared/form/Input"
import FileInput from "../shared/form/FileInput"
import Select from "../shared/form/Select"
import Button from "../shared/Button.jsx"

import { GENRE_OPTIONS } from "../../../../shared/constants/genreOptions.js"
import { RATING_OPTIONS } from "../../../../shared/constants/ratingOptions.js"
import { FORMAT_OPTIONS } from "../../../../shared/constants/formatOptions.js"

import { useBooks } from "../../context/BookContext"
import validateUpdateBook from "../../utils/validators/validateUpdateBook.js"

export default function EditDetails({ book, setIsEditPopupOpen }) {
    const { updateBook } = useBooks()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

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

    const changedFields = {}
    Object.keys(formData).forEach(field => {
        if (formData[field] !== book[field]) {
            changedFields[field] = formData[field]
        }
    })
    const hasChanges = Object.keys(changedFields).length > 0

    const validationErrors = validateUpdateBook(formData, book)
    const hasErrors = Object.keys(validationErrors).length > 0

    async function handleUpdate() {
        if (!hasChanges || isLoading) return

        if (hasErrors) {
            setErrors(validationErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            await updateBook(book._id, changedFields)
            setIsEditPopupOpen(false)
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal>
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
                    errorMessage={errors.cover}
                    onChange={(file) => setFormData(prev => ({ ...prev, cover: URL.createObjectURL(file) }))}
                />

                <div className="flex flex-col gap-5 mt-6">
                    <Input
                        id="title"
                        label="Title"
                        placeholder="Title"
                        errorMessage={errors.title}
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />

                    <Input
                        id="author"
                        label="Author"
                        placeholder="Enter author's name"
                        errorMessage={errors.author}
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    />

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input
                                type="number"
                                id="currentPage"
                                label="Current page"
                                placeholder="0"
                                min={0}
                                max={formData.totalPages ? Number(formData.totalPages) : undefined}
                                errorMessage={errors.currentPage}
                                value={formData.currentPage ?? ""}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev, 
                                    currentPage: e.target.value === "" ? null : Number(e.target.value)
                                }))}
                            />
                        </div>

                        <div className="flex-1">
                            <Input
                                type="number"
                                id="totalPages"
                                label="Total pages"
                                placeholder="1"
                                min={1}
                                errorMessage={errors.totalPages}
                                value={formData.totalPages ?? ""}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev, 
                                    totalPages: e.target.value === "" ? null : Number(e.target.value)
                                }))}
                            />
                        </div>
                    </div>

                    <Select 
                        id="genre"
                        label="Genre"
                        value={formData.genre}
                        options={GENRE_OPTIONS}
                        errorMessage={errors.genre}
                        onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                    />

                    <Select 
                        id="rating"
                        label="Rating"
                        value={formData.rating ?? ""}
                        options={RATING_OPTIONS}
                        errorMessage={errors.rating}
                        onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    />

                    <Select 
                        id="format"
                        label="Format"
                        value={formData.format}
                        options={FORMAT_OPTIONS}
                        errorMessage={errors.format}
                        onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                    />
                </div>

                <div className="mt-8">
                    <Button
                        onClick={handleUpdate}
                        disabled={!hasChanges || isLoading}
                    >
                        <span>{isLoading ? "Updating..." : "Update"}</span>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}