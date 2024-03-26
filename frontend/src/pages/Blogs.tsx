import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

export function Blogs() {
    return (
        <>
            <Appbar/>
            <div>
                <div className="">
                    <BlogCard authorName="Prathyarthi"
                        title="Blog Title"
                        content="This is the content of the blog"
                        publishedDate="2nd November 2024" />
                </div>
                <div className="">
                    <BlogCard authorName="Prathyarthi"
                        title="Blog Title"
                        content="This is the content of the blog"
                        publishedDate="2nd November 2024" />
                </div>
            </div>
        </>
    )
}