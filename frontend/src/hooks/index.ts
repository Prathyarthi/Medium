import { useEffect, useState } from "react"
import { axiosInstance } from "../axiosInstance"

interface Blog {
    id: number
    authorName: string
    title: string
    content: string
    publishedDate: string
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog>()

    useEffect(() => {
        axiosInstance.get(`/api/v1/blog/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setBlogs(res.data.blogs)
                setLoading(false)
            })
    }, [])
    return {
        loading,
        blogs
    }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axiosInstance.get('/api/v1/blog/blogs', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setBlogs(res.data.blogs)
                setLoading(false)
            })
    }, [])
    return {
        loading,
        blogs
    }
}