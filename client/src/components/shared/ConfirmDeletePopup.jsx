import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "./Modal"

export default function ConfirmDeletePopup({ cancel, delete_, message }) {
    return (
        <Modal>
                <p className="text-espresso h4">Are you sure?</p>
                <p className="text-coffee text-body-sm mt-1">{message}</p>

                <div className="flex gap-3 mt-6">
                    <button 
                        type="button" 
                        className="flex-1 text-espresso py-3 rounded-xl cursor-pointer text-body hover:bg-cream transition-all duration-300"
                        onClick={cancel}
                    >
                        Cancel
                    </button>

                    <button 
                        type="button" 
                        className="flex-1 bg-red text-cream py-3 rounded-xl cursor-pointer text-body hover:bg-red/80 transition-all duration-300"
                        onClick={delete_}
                    >
                        Delete
                    </button>
                </div>
        </Modal>
    )
}