export default function DetailsHero({ title, author, cover, status }) {
    return (
        <div>
            <div className="w-full h-48 relative">
                <div className="h-full w-full bg-linear-to-b from-transparent to-cream absolute inset-0 z-10"></div>
                <img src="/background.jpg" className="h-full w-full object-cover absolute inset-0 z-0" />
            </div>
            <div className="w-full flex flex-col items-center px-6">
                <img src={cover} alt="" className="w-[165px] aspect-5/8 rounded-[14px]" />
                <h1 className="h3 text-espresso mt-5 text-center">{title}</h1>
                <p className="text-coffee mt-1 text-body">{author}</p>
                <span className="bg-espresso mt-4 text-body-xs px-4 h-8 rounded-2xl text-cream flex justify-center items-center">{status}</span>
            </div>
        </div>
    )
}