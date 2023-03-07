# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

leah = User.create(username: "Leah200", password: "testtest")
bob = User.create(username: "Bob404", password: "testtest")
jo = User.create(username: "Jo500", password: "testtest")

leah_blog_1 = leah.blogs.create(title: "Leah Blog 1", content: "Some awesome lorem text")
leah_blog_2 = leah.blogs.create(title: "Leah Blog 2", content: "Some awesome lorem text")
leah_blog_3 = leah.blogs.create(title: "Leah Blog 3", content: "Some awesome lorem text")
bob_blog_1 = bob.blogs.create(title: "Bob Blog 1", content: "Some awesome lorem text")
bob_blog_2 = bob.blogs.create(title: "Bob Blog 2", content: "Some awesome lorem text")
bob_blog_3 = bob.blogs.create(title: "Bob Blog 3", content: "Some awesome lorem text")
jo_blog_1 = jo.blogs.create(title: "Jo Blog 1", content: "Some awesome lorem text")
jo_blog_2 = jo.blogs.create(title: "Jo Blog 2", content: "Some awesome lorem text")
jo_blog_3 = jo.blogs.create(title: "Jo Blog 3", content: "Some awesome lorem text")

leah.comments.create(blog: bob_blog_1, content: "This was a great blog!")
leah.comments.create(blog: jo_blog_1, content: "This was a great blog!")
leah.comments.create(blog: bob_blog_2, content: "This was a great blog!")
bob.comments.create(blog: leah_blog_1, content: "This was a great blog!")
bob.comments.create(blog: leah_blog_2, content: "This was a great blog!")
bob.comments.create(blog: jo_blog_2, content: "This was a great blog!")
jo.comments.create(blog: jo_blog_3, content: "This was a great blog!")
jo.comments.create(blog: leah_blog_3, content: "This was a great blog!")
jo.comments.create(blog: bob_blog_3, content: "This was a great blog!")
jo.comments.create(blog: bob_blog_1, content: "This was a great blog!")
jo.comments.create(blog: bob_blog_1, content: "This was a great blog!")