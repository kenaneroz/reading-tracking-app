import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "./Modal"
import Button from "./Button"

export default function ConfirmDeletePopup({ cancel, delete_, message }) {
    return (
        <Modal>
                <p className="text-espresso h4">Are you sure?</p>
                <p className="text-coffee text-body-sm mt-1">{message}</p>

                <div className="flex gap-3 mt-6">
                    <Button
                        variant="text"
                        onClick={cancel}
                    >
                        <span>Cancel</span>
                    </Button>

                    <Button
                        variant="danger"
                        onClick={delete_}
                    >
                        <span>Delete</span>
                    </Button>
                </div>
        </Modal>
    )
}