import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import BlogCard from "./BlogCard";

const Blog = () => {
    const axiosPublic = useAxiosPublic();
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        axiosPublic.get("/blogs")
        .then(res => {
            setBlogs(res.data)
        })
    },[axiosPublic])
    return (
        <section>
            <SectionTitle heading='Our latest Blogs'></SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {
                    blogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                }
            </div>
        </section>
    );
};

export default Blog;