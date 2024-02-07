const howlsWrapper = document.querySelector("#howls-wrapper");
const headerHandle = document.querySelector("#header-handle");
const content = document.querySelector("#howl-content");
const createHowlButton = document.querySelector("#create-howl-btn");

const backButton = document.querySelector("#back-button");

const currentUser = JSON.parse(sessionStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", async () => {
  headerHandle.innerHTML = "@" + currentUser.username;
  const img = document.createElement("img");
  img.src = currentUser.avatar;
  headerHandle.appendChild(img);

  let url = "/api/user/" + currentUser.id + "/follows/howls";
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      fillHowlsHtml(body);
    });
});

backButton.addEventListener("click", async () => {
  document.location = "/";
});

createHowlButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let newHowl = {};
  newHowl["text"] = content.value;
  newHowl["userId"] = currentUser.id;
  newHowl["datetime"] = new Date();

  newHowl = JSON.stringify(newHowl);
  let url = "/api/user/" + currentUser.id + "/howls";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: newHowl,
  })
    .then((res) => {
      if (!res.ok) {
        alert("Failed to create howl");
      } else {
        return res.json();
      }
    })
    .then((howl) => {
      addHowlToHtml(howl);
    });
});

function addHowlToHtml(howl) {
  const item = document.createElement("li");
  item.classList.add("howl");

  const itemHeader = document.createElement("div");
  itemHeader.classList.add("container");
  itemHeader.classList.add("howl-header");
  const headerImg = document.createElement("img");
  headerImg.src = currentUser.avatar;

  const headerName = document.createElement("span");
  headerName.addEventListener("click", async () => {
    let url = "/api/user/" + currentUser.username;
    await fetch(url)
      .then((res) => {
        if (!res.ok) {
          alert("Invalid login credentials");
          return res;
        } else {
          return res.json();
        }
      })
      .then((user) => {
        sessionStorage.setItem("profileUser", JSON.stringify(user));
        document.location = "/profile";
      });
  });

  const headerDate = document.createElement("span");

  headerDate.classList.add("howl-date");
  headerName.innerHTML =
    "" +
    currentUser.first_name +
    " " +
    currentUser.last_name +
    " @" +
    currentUser.username;

  let date = new Date(howl.datetime);
  let year = date.getFullYear();
  let month = date.toLocaleString("default", { month: "short" });

  let day = date.getDate();

  let time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let dateString = "" + month + " " + day + " " + year + ", " + time;
  headerDate.innerHTML = dateString;
  itemHeader.appendChild(headerImg);
  itemHeader.appendChild(headerName);
  itemHeader.appendChild(headerDate);

  const howlText = document.createElement("p");
  howlText.classList.add("howl-content");
  howlText.innerHTML = howl.text;

  item.appendChild(itemHeader);
  item.appendChild(howlText);

  howlsWrapper.prepend(item);
  content.value = "";
}
function fillHowlsHtml(body) {
  const howls = body.howls;
  const users = body.users;
  howls.forEach((howl) => {
    const item = document.createElement("li");
    item.classList.add("howl");

    const user = users.find((user) => user.id == howl.userId);
    const itemHeader = document.createElement("div");
    itemHeader.classList.add("container");
    itemHeader.classList.add("howl-header");
    const headerImg = document.createElement("img");
    headerImg.src = user.avatar;
    const headerName = document.createElement("span");
    headerName.addEventListener("click", async () => {
      let url = "/api/user/" + user.username;
      await fetch(url)
        .then((res) => {
          if (!res.ok) {
            alert("Invalid login credentials");
            return res;
          } else {
            return res.json();
          }
        })
        .then((user) => {
          sessionStorage.setItem("profileUser", JSON.stringify(user));
          document.location = "/profile";
        });
    });

    const headerDate = document.createElement("span");

    headerDate.classList.add("howl-date");
    headerName.innerHTML =
      "" + user.first_name + " " + user.last_name + " @" + user.username;

    let date = new Date(howl.datetime);
    let year = date.getFullYear();
    let month = date.toLocaleString("default", { month: "short" });

    let day = date.getDate();

    let time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let dateString = "" + month + " " + day + " " + year + ", " + time;
    headerDate.innerHTML = dateString;
    itemHeader.appendChild(headerImg);
    itemHeader.appendChild(headerName);
    itemHeader.appendChild(headerDate);

    const howlText = document.createElement("p");
    howlText.classList.add("howl-content");
    howlText.innerHTML = howl.text;

    item.appendChild(itemHeader);
    item.appendChild(howlText);

    howlsWrapper.appendChild(item);
  });
}
