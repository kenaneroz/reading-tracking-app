import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "./Modal.jsx"
import Input from "./form/Input"
import FileInput from "./form/FileInput"
import Select from "./form/Select"
import Button from "./Button.jsx"

import { GENRE_OPTIONS } from "../../../../shared/constants/genreOptions.js"
import { RATING_OPTIONS } from "../../../../shared/constants/ratingOptions.js"
import { FORMAT_OPTIONS } from "../../../../shared/constants/formatOptions.js"

import { addBook } from "../../services/bookService.js"

export default function AddBook({ setIsAddBookPopupActive, books, setBooks }) {
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        cover: "",
        title: "",
        author: "",
        totalPages: null,
        currentPage: null,
        genre: "",
        rating: "",
        format: ""
    })

    function hideAddBookPopup() {
        setIsAddBookPopupActive(false)
    }

    async function handleAddBook() {
        try {
            const newBook = await addBook(
                {
                    title: formData.title,
                    author: formData.author,
                    cover: formData.cover,
                    genre: formData.genre,
                    currentPage: formData.currentPage,
                    totalPages: formData.totalPages,
                    format: formData.format
                }
            )
            setBooks(prev => [...prev, newBook])
            hideAddBookPopup()
        } catch (error) {
           setErrors(error.errors || {})
           console.log(error)
        }
    }
    
    return (
        <Modal>
            <HugeiconsIcon
                icon={Cancel01Icon}
                size={24} 
                strokeWidth={1.5}
                className="text-espresso cursor-pointer"
                onClick={hideAddBookPopup}
            />
        
            <div className="mt-8">
                <p className="h2 text-espresso">Add a new book</p>
                <p className="text-body text-coffee mt-2">Begin your next journey by cataloging a new title to your personal collection.</p>
            </div>

            <div className="mt-8">
                <FileInput
                    id="cover"
                    label="Cover Image"
                    placeholder="Tap to upload"
                    errorMessage={errors.cover}
                    onChange={(file) => setFormData(prev => ({...prev, cover: URL.createObjectURL(file)}))}
                />

                <div className="flex flex-col gap-5 mt-6">
                    <Input
                        id="title"
                        label="Title"
                        placeholder="e.g. The Quiet Mind"
                        errorMessage={errors.title}
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                    />

                    <Input
                        id="author"
                        label="Author"
                        placeholder="Enter author's name"
                        errorMessage={errors.author}
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({...prev, author: e.target.value}))}
                    />

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input
                                type="number"
                                id="currentPage"
                                label="Current page"
                                placeholder="0"
                                min={0}
                                max={Number(formData.totalPages)}
                                errorMessage={errors.currentPage}
                                value={formData.currentPage}
                                onChange={(e) => setFormData(prev => ({...prev, currentPage: Number(e.target.value)}))}
                            />
                        </div>
                        <div className="flex-1">
                            <Input
                                type="number"
                                id="totalPages"
                                label="Total pages"
                                placeholder="1"
                                min={1}
                                max={Number(formData.totalPages)}
                                errorMessage={errors.totalPages}
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
                        errorMessage={errors.genre}
                        onChange={(e) => setFormData(prev => ({...prev, genre: e.target.value}))}
                    />

                    <Select 
                        id="rating"
                        label="Rating"
                        value={formData.rating}
                        options={RATING_OPTIONS}
                        errorMessage={errors.rating}
                        onChange={(e) => setFormData(prev => ({...prev, rating: Number(e.target.value)}))}
                    />

                    <Select 
                        id="format"
                        label="Format"
                        value={formData.format}
                        options={FORMAT_OPTIONS}
                        errorMessage={errors.format}
                        onChange={(e) => setFormData(prev => ({...prev, format: e.target.value}))}
                    />
                </div>

                <div className="mt-8">
                    <Button
                        onClick={handleAddBook}
                    >
                        <span>Add Book</span>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}