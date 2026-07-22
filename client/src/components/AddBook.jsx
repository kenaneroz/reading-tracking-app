import TextInput from "./form/TextInput"
import NumberInput from "./form/NumberInput"
import FileInput from "./form/FileInput"
import Select from "./form/Select"
import PrimaryButton from "./PrimaryButton"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

export default function AddBook({ setIsAddBookPopupActive, books, setBooks, addBook }) {
    const genreOptions = ["Romance", "Science Fiction", "Fantasy", "Mystery", "Thriller", "Non-Fiction", "Biography", "Self-Help", "History", "Poetry"]

    const [formData, setFormData] = useState({
        cover: null,
        title: "",
        author: "",
        totalPages: "",
        currentPage: "",
        genre: ""
    })

    function hideAddBookPopup() {
        setIsAddBookPopupActive(false)
    }

    async function handleAddBook() {
        const newBook = await addBook(
            {
                title: formData.title,
                author: formData.author,
                cover: formData.cover,
                genre: formData.genre,
                currentPage: formData.currentPage,
                totalPages: formData.totalPages
            }
        )

        setBooks(prev => [...prev, newBook])
        hideAddBookPopup()
    }
    console.log(formData)
    return (
        <div className="fixed bg-espresso/40 inset-0 z-50">
            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-6 bottom-6 md:max-w-[392px] md:max-h-[908px] overflow-y-auto">

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
                        errorMessage=""
                        onChange={(file) => setFormData(prev => ({...prev, cover: URL.createObjectURL(file)}))}
                    />

                    <div className="flex flex-col gap-5 mt-6">
                        <TextInput
                            id="title"
                            label="Title"
                            placeholder="e.g. The Quiet Mind"
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
                                    placeholder="0"
                                    min={0}
                                    max={Number(formData.totalPages)}
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
                                    max={Number(formData.totalPages)}
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
                            options={genreOptions}
                            errorMessage=""
                            onChange={(e) => setFormData(prev => ({...prev, genre: e.target.value}))}
                        />
                    </div>

                    <div className="mt-8">
                        <PrimaryButton
                            label="Add Book"
                            onClick={handleAddBook}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}