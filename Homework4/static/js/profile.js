const howlsWrapper = document.querySelector("#howls-wrapper");
const headerHandle = document.querySelector("#header-handle");
const nameSection = document.querySelector("#name-section");
const followsSection = document.querySelector("#follows");
const profileAvatar = document.querySelector("#avatar");
const followButton = document.querySelector("#follow-button");
const backButton = document.querySelector("#back-button");

const profileUser = JSON.parse(sessionStorage.getItem("profileUser"));
const currentUser = JSON.parse(sessionStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", async () => {
  const userInfo = document.createElement("span");
  userInfo.innerHTML =
    profileUser.first_name +
    " " +
    profileUser.last_name +
    "<br />@" +
    profileUser.username;
  nameSection.appendChild(userInfo);

  profileAvatar.src = profileUser.avatar;

  headerHandle.innerHTML = "@" + currentUser.username;

  const img = document.createElement("img");
  img.src = currentUser.avatar;
  headerHandle.appendChild(img);

  let url = "/api/user/" + profileUser.id + "/follows";
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((users) => {
      fillFollowsHtml(users);
    });

  url = "/api/user/" + currentUser.id + "/follows";
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((users) => {
      if (profileUser.id != currentUser.id) {
        let u = users.find((user) => user.id == profileUser.id);
        if (u == null) {
          followButton.innerHTML = "Follow";
          followButton.value = "Follow";
        } else {
          followButton.innerHTML = "Unfollow";
          followButton.value = "Unfollow";
        }
      } else {
        followButton.classList.add("hide-follow-btn");
      }
    });

  url = "/api/user/" + profileUser.id + "/howls";
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((howls) => {
      fillHowlsHtml(howls);
    });
});

backButton.addEventListener("click", async () => {
  document.location = "/main";
});

followButton.addEventListener("click", async () => {
  let url = "";

  let val = followButton.value;
  if (val == "Unfollow") {
    url = "/api/user/" + currentUser.id + "/follows/unfollow/" + profileUser.id;
    followButton.innerHTML = "Follow";
    followButton.value = "Follow";
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    });
  } else {
    url = "/api/user/" + currentUser.id + "/follows/follow/" + profileUser.id;
    followButton.innerHTML = "Unfollow";
    followButton.value = "Unfollow";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    });
  }
});

function fillFollowsHtml(follows) {
  follows.forEach((follow) => {
    const item = document.createElement("div");
    item.classList.add("follows-item");
    item.innerHTML = follow.first_name + " " + follow.last_name;
    item.addEventListener("click", async () => {
      let url = "/api/user/" + follow.username;
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
    followsSection.appendChild(item);
  });
}
function fillHowlsHtml(howls) {
  howls.forEach((howl) => {
    const item = document.createElement("li");
    item.classList.add("howl");

    const itemHeader = document.createElement("div");
    itemHeader.classList.add("container");
    itemHeader.classList.add("howl-header");
    const headerImg = document.createElement("img");
    headerImg.src = currentUser.avatar;

    const headerName = document.createElement("span");

    const headerDate = document.createElement("span");

    headerDate.classList.add("howl-date");
    headerName.innerHTML =
      "" +
      profileUser.first_name +
      " " +
      profileUser.last_name +
      " @" +
      profileUser.username;

    let date = new Date(howl.datetime);
    let month = date.toLocaleString("default", { month: "short" });

    let day = date.getDate();

    let time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let dateString = "" + month + " " + day + ", " + time;
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
