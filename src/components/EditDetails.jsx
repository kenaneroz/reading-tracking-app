import TextInput from "./form/TextInput"
import NumberInput from "./form/NumberInput"
import FileInput from "./form/FileInput"
import Select from "./form/Select"
import PrimaryButton from "./PrimaryButton"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

export default function EditDetails({ id, title, author, genre, cover, status, currentPage, totalPages, setBooks, setIsEditPopupOpen }) {
    const genreOptions = ["Romance", "Science Fiction", "Fantasy", "Mystery", "Thriller", "Non-Fiction", "Biography", "Self-Help", "History", "Poetry"]

    const [formData, setFormData] = useState({
        id: id,
        title: title,
        author: author,
        genre: genre,
        cover: cover,
        status: status,
        currentPage: currentPage,
        totalPages: totalPages,
    })

    function hideEditMenuPopup() {
        setIsEditPopupOpen(false)
    }

    let [errorMessages, setErrorMessages] = useState({
        cover: "",
        title: "",
        author: "",
        totalPages: "",
        currentPage: "",
        genre: ""
    })

    function validate() {
        const newErrorMessages = {
            cover: "",
            title: "",
            author: "",
            totalPages: "",
            currentPage: "",
            genre: ""
        }

        if (!formData.title.trim()) newErrorMessages.title = "Title is required"
        if (!formData.author.trim()) newErrorMessages.author = "Author is required"
        if (!formData.totalPages || formData.totalPages < 1) newErrorMessages.totalPages = "Enter a valid page count"
        if(formData.currentPage < 0 || formData.currentPage > formData.totalPages) newErrorMessages.currentPage = "Enter a valid current page"
        if (!formData.genre) newErrorMessages.genre = "Please select a genre"
        if (!formData.cover) newErrorMessages.cover = "Please upload a cover image"

        setErrorMessages(newErrorMessages)

        return Object.values(newErrorMessages).every(error => error === "")
    }

    function handleEdit() {
        if(!validate()) return

        const newBook = {
            id: id,
            cover: formData.cover,
            title: formData.title,
            author: formData.author,
            totalPages: Number(formData.totalPages),
            currentPage: formData.currentPage === "" ? 0 : Number(formData.currentPage),
            genre: formData.genre,
            status: Number(formData.currentPage) === 0 ? "Wishlist" : Number(formData.currentPage) === Number(formData.totalPages) ? "Finished" : "Reading",
            dateAdded: formData.dateAdded,
            updatedAt: Date.now()
        }
        setBooks(prev => prev.map(book => book.id === id ? newBook : book))
        hideEditMenuPopup()
    }

    return (
        <div className="fixed bg-espresso/40 inset-0 z-50">
            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-6 bottom-6 md:max-w-[392px] md:max-h-[908px] overflow-y-auto">

                <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={24} 
                    strokeWidth={1.5}
                    className="text-espresso cursor-pointer"
                    onClick={hideEditMenuPopup}
                />
            
                <p className="h2 text-espresso mt-8">Edit book</p>

                <div className="mt-8">
                    <FileInput
                        id="cover"
                        label="Cover Image"
                        placeholder="Tap to change the cover"
                        errorMessage={errorMessages.cover}
                        onChange={(file) => setFormData(prev => ({...prev, cover: URL.createObjectURL(file)}))}
                    />

                    <div className="flex flex-col gap-5 mt-6">
                        <TextInput
                            id="title"
                            label="Title"
                            placeholder="Title"
                            errorMessage={errorMessages.title}
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                        />

                        <TextInput 
                            id="author"
                            label="Author"
                            placeholder="Enter author's name"
                            errorMessage={errorMessages.author}
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
                                    errorMessage={errorMessages.currentPage}
                                    value={formData.currentPage}
                                    onChange={(e) => setFormData(prev => ({...prev, currentPage: e.target.value}))}
                                />
                            </div>

                            <div className="flex-1">
                                <NumberInput
                                    id="totalPages"
                                    label="Total pages"
                                    placeholder="1"
                                    min={1}
                                    errorMessage={errorMessages.totalPages}
                                    value={formData.totalPages}
                                    onChange={(e) => setFormData(prev => ({...prev, totalPages: e.target.value}))}
                                />
                            </div>
                        </div>

                        <Select 
                            id="genre"
                            label="Genre"
                            options={genreOptions}
                            errorMessage={errorMessages.genre}
                            onChange={(e) => setFormData(prev => ({...prev, genre: e.target.value}))}
                        />
                    </div>

                    <div className="mt-8">
                        <PrimaryButton
                            label="Update"
                            onClick={handleEdit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}