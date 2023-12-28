function fetchAllPosts() {
  // Fetching the posts from the api route posts
  fetch("/api/posts")
    .then((status) => {
      if (status.ok) {
        return status.json();
      }
    })
    .then((data) => {
      const mainContainer = document.getElementById("testing");

      //   For Each OBject print the title
      data.forEach((element) => {
        mainContainer.innerHTML += `
        <div class="gruvbox-blog-box">
        <div class="gruvbox-blog-image">
            <img src="/api/uploads/${element.image}" alt="blog">
        </div>
        <div class="gruvbox-blog-body">
            <h4 class="gruvbox-blog-title">${element.title}</h4>
            <a class="gruvbox-readmore-blog" href="/post/${element._id}">Read More</a>
            <div class="gruvbox-blog-author">
                <div class="gruvbox-blog-author-image">
                    <img src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600nw-1029506242.jpg" alt="author">
                </div>
                <div class="gruvbox-blog-author-text">
                    <p class="gruvbox-author-name">${element.author}</p>
                    <span class="gruvbox-author-publish-date">${element.date}</span>
                </div>
            </div>
        </div>
    </div>    
        `;
      });
    });
}

fetchAllPosts();
