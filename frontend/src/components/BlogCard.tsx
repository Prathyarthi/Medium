interface BlogCardProps {
    authorName: string
    title: string
    content: string
    publishedDate: string
}

export function BlogCard({ authorName, title, content, publishedDate }: BlogCardProps) {
    return (
        <div className="flex justify-center max-w-screen-2xl">
            <div className="w-1/2 m-5">
                <div className="font-bold p-2">
                    <Avatar name={authorName} /> {authorName} . <span className="font-thin p-2">
                        {publishedDate}
                    </span>
                </div>
                <div className="text-3xl font-semibold p-2">
                    {title}
                </div>
                <div className="font-extralight p-2">
                    {(content.length > 100) ?
                        content.slice(0, 400) + "..."
                        : content
                    }
                </div>
                <div className="font-thin font-serif p-2">
                    {Math.ceil(content.length / 100) + " minute(s   ) read"}
                </div>
                <div className="bg-slate-300 h-1 w-full mt-2">

                </div>
            </div>
        </div>
    )
}

export function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
    )
}