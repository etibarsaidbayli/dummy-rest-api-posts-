const postList = document.querySelector(".post-list");
const loadBtn = document.getElementById("loadBtn");

let limit = 5;
let skip = 0;
let currentSkip = 0;
let total = 0;

function getFetchPost() {
  disableButton();
  fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
    .then((res) => res.json())
    .then((data) => {
      let posts = data.posts;
      total = data.total;
      let html = "";
      for (let post of posts) {
        html += getPostHtml(post);
      }
      postList.insertAdjacentHTML("beforebegin", html);
    })
    .finally(enabledButton());
}

function enabledButton() {
  loadBtn.disabled = false;
  loadBtn.textContent = "LoaD more";
}

function disableButton() {
  loadBtn.disabled = true;

  loadBtn.textContent = "LOADING..";
}

getFetchPost();

function getPostHtml({ id, title, body, tags, reactions }) {
  const tagsHtml = tags.map((tag) => `<span class="tag">${tag}</span>`);
  return `  <div class="post">
    <a href="post.html?postId=${id}">
      <h4>${title}</h4>
    </a>
    <p>${body}</p>
    <p class="footer">
      <span>
      ${tagsHtml.join("")}
      </span>
      <span>${reactions}</span>
      <span>❤️ &nbsp;</span>
    </p>
  </div>`;
}

loadBtn.addEventListener("click", addMore);

function addMore() {
  currentSkip += limit;
  if (currentSkip >= total) {
    loadBtn.hidden = true;
  } else {
    getFetchPost(currentSkip);
  }
}
