import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";


export function Blogs() {
    const { loading, blogs } = useBlogs()

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <Appbar />
            <div>
                <div className="">
                    {blogs.map((blog) => (
                        <BlogCard
                            id={blog.id}
                            authorName={blog.authorName || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                        />
                    ))}
                </div>
            </div >
        </>
    )
}