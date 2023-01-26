import BlogCard from "./BlogCard"


const BlogList = ({ blogs, deleteBlog }) => {
  const blogCards = blogs.map((blog, idx) => <BlogCard key={ idx } blog={ blog } deleteBlog={ deleteBlog } />)
  return (
    <div>
      <h3>Blogs</h3>
      { blogCards }
    </div>
  )
}

export default BlogList