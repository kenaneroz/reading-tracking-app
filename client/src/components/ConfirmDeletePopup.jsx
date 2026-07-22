import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

export default function ConfirmDeletePopup({ cancel, delete_, message }) {
    return (
        <div className="fixed inset-0 bg-espresso/40 z-50 flex items-center justify-center md:max-w-[440px] md:max-h-[956px]">
            <div className="p-6 bg-beige border border-tan rounded-[20px] mx-6 text-center">
                <p className="text-espresso h4">Are you sure?</p>
                <p className="text-coffee text-body-sm mt-1">{message}</p>
                <div className="flex gap-3 mt-6">
                    <button type="button" 
                        className="flex-1 text-espresso py-3 rounded-xl cursor-pointer text-body hover:bg-cream transition-all duration-300"
                        onClick={cancel}
                    >Cancel</button>
                    <button type="button" 
                        className="flex-1 bg-danger text-cream py-3 rounded-xl cursor-pointer text-body hover:bg-danger/80 transition-all duration-300"
                        onClick={delete_}
                    >Delete</button>
                </div>
            </div>
            </div>
    )
}