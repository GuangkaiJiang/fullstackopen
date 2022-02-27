const dummy = (blogs) => {
  // ...
}

const totalLikes = (blogs) => {
  var total=0
  for(let b of blogs)
  {
    total+=b.likes
  }
  return total
}

const favoriteBlog = (blogs) => {
  var arr=blogs.map(b=>b.likes)
  var idx=arr.indexOf(Math.max(...arr));
  return blogs[idx]
}

const mostBlogs = (blogs) => {
  var arr=blogs.map(b=>b.author)
  const m = {};
  var who=''
  var max=0
  for (const a of arr) {
    m[a] = m[a] ? m[a] + 1 : 1
    if(m[a]>max)
    {
      who=a
      max=m[a]
    }
  }
  return {
    author: who,
    blogs: max
  }
}

const mostLikes = (blogs) => {
  const m = {};
  var who=''
  var max=0
  for (const a of blogs) {
    m[a.author] = m[a.author] ? m[a.author] + a.likes : a.likes
    if(m[a.author]>max)
    {
      who=a.author
      max=m[a.author]
    }
  }
  return {
    author: who,
    likes: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
