const API_URL= "https://api.github.com/users/";

const mainEl=document.querySelector("#main");
const formEl = document.querySelector("#form");
const searchEl = document.querySelector("#search")

async function getUser(username){
  try{
    const response = await fetch(API_URL + username);
    if(response.status===404){
      return;
    }

    if(response.ok){
      const data = await response.json();
      createUserCard(data);
      await getRepos(username);
    }
  }catch(err){ createErrorCard("Problem fetching user");}
}

async function getRepos(username){
  try {
    const response = await fetch(`${API_URL + username}/repos?sort=created`);
    const data = await response.json();
    
    addReposToCard(data);
  } catch (error) {
    createErrorCard("Error looking for Repos of named user")
  }
}

function createErrorCard(msj){
  const cardHTML = `
  <div class="card">
  <h1>${msj}</h1>
  </div>
  `;

  mainEl.innerHTML = cardHTML;
}

function createUserCard(user){
  const userId = user?.name || user?.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
  <div class="card">
  <section>
  <img src="${user?.avatar_url}" alt="${user?.name}" class="avatar"/>
  </section>
  <section class="user-info">
  <h2>${userId}</h2>
  ${user.bio}
  <ul>
  <li>${user?.followers} <strong>Followers</strong></li>
  <li>${user?.following} <strong>Following</strong></li>
  <li>${user?.public_repos} <strong>Repositories</strong></li>
  </ul>
  <div id="repos"></div>
  </section>
  </div>
  `;

  mainEl.innerHTML= cardHTML;
}

function addReposToCard(repos){
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) =>{
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target ="_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

formEl.addEventListener("submit", (e)=>{
  e.preventDefault();
  const user = searchEl.value;
  if(user){
    getUser(user);
    searchEl.value= "";
  }
});