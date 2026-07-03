
export default function PersonalNotesCard() {
    return (
        <div className="mt-4">   
            <div className="flex flex-col gap-4">
                <div className="border-l-[3px] border-tan pl-3 py-1">
                    <p className="text-coffee text-body">“Ornare pharetra fringilla ac enim mattis nec. Quis molestie amet donec et nunc viverra.”</p>
                    <div className="flex gap-2 mt-1">
                        <p className="text-taupe text-body-xs">p. 4</p>
                        <p className="text-taupe text-body-xs">June 7, 26</p>
                    </div>
                </div>

                <div className="border-l-[3px] border-tan pl-3 py-1">
                    <p className="text-coffee text-body">“Lorem ipsum dolor sit amet consectetur.”</p>
                    <div className="flex gap-2 mt-1">
                        <p className="text-taupe text-body-xs">p. 4</p>
                        <p className="text-taupe text-body-xs">June 7, 26</p>
                    </div>
                </div>
            </div>

            <button className="cursor-pointer w-full h-13 px-6 rounded-[26px] text-taupe text-body mt-4 border border-tan border-dashed">Add notes</button>
        </div>
    )
} 