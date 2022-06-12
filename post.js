// const url=new URL(location.href);

// if(url.searchParams.has('postId')) {

// }else {
//     alert('post id yoxdu')
// }
const containerWrapper = document.getElementById("container-wrapper");

function postFetch() {
  const url = new URL(location.href);

  if (url.searchParams.has("postId")) {
    let postId = url.searchParams.get("postId");

    fetch(`https://dummyjson.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        containerWrapper.insertAdjacentHTML("afterbegin", postHtml(data));
      });
  } else {
    location.href = "index.html";
  }
}

postFetch();

function postHtml(data) {
  let tagsHtml = data.tags.map((tag) => `<span class="tag">${tag}</span>`);
  return `   
  <a href="index.html"> ⬅️ Back to posts </a>
  <h1>${data.title}</h1>
  <p>${data.body}</p> 
  <p class="flex-between">
    <span>
    ${tagsHtml.join("")}
    </span>
    <span>❤️ &nbsp;${data.reactions}</span>
  </p>
`;
}

commentsFetch();

const commentListWrapper = document.querySelector(".comment-list");

function commentsFetch() {
  const url = new URL(location.href);

  if (url.searchParams.has("postId")) {
    let postId = url.searchParams.get("postId");
    fetch(`https://dummyjson.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        let commentsHtml = "";

        for (let i = 0; i < data.comments.length; i++) {
          commentsHtml += comHtml(data.comments[i]);
        }
        commentListWrapper.insertAdjacentHTML("afterbegin", commentsHtml);
      });
  } else {
    location.href = "index.html";
  }
}

function comHtml(data) {
  return ` <div class="comment">
    <span class="user">${data.user.username}</span>
    <p>${data.body}</p>
  </div>`;
}
