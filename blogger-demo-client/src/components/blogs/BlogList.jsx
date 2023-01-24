import BlogCard from "./BlogCard"


const BlogList = ({ blogs }) => {
  const blogCards = blogs.map((blog, idx) => <BlogCard key={ idx } blog={ blog } />)
  return (
    <div>
      <h3>Blogs</h3>
      { blogCards }
    </div>
  )
}

export default BlogList