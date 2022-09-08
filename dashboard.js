const fetchedAuthors = fetch(
  "http://localhost:3000/api/authors"
).then((response) => response.json())
const userresponse = fetch("http://localhost:3000/api/users").then((response) =>
  response.json()
)

const loaderauthor = document.querySelector(".loader-author")
const loaderDashMenu = document.querySelector(".loader-dashboard")
const mainauthor = document.getElementById("author-container")
const modalescbtn = document.getElementById("close-btn")
const modalauthor = document.getElementById("auth-modal")
const dashtableauthors = document.getElementById("table-body")
const dashaddbtn = document.getElementById("dashtable-add-btn")
const dashAddCloser = document.getElementById("auth-form-closer")
const editAuthCloser = document.getElementById("edit-auth-form-closer")
const editContainer = document.getElementById("edit-container")
const editAuthName = document.getElementById("edit-auth-name")
const editAuthPhotoLink = document.getElementById("edit-auth-photo-link")
const editAuthBio = document.getElementById("edit-auth-bio")
const editAuthBtn = document.getElementById("editAuth")
const submitEditAuth = document.getElementById("submit-edit-auth")

function myFunction(id) {
  fetchedAuthors.then((data) => {
    data.map((auth) => {
      if (auth.id == id) {
        modalauthor.innerHTML = ""
        const aboutauthor = `
          <i onclick="closeModal()" class="gg-close"></i>
          <p id="name" >Name:</p>
        <div>${auth.name}</div>
        <p id="bio">Bio:</p>
        <div>${auth.biography}</div>
  
          `
        document.body.style.overflow = "hidden"
        mainauthor.style.filter = "blur(2px)"
        modalauthor.style.display = "block"
        modalauthor.insertAdjacentHTML("beforeend", aboutauthor)
      }
    })
  })
}
function closeModal() {
  mainauthor.style.filter = "blur(0)"
  modalauthor.style.display = "none"
  document.body.style.overflow = "auto"
}

const openMenu = (menu) => {
  const ExpansionMenu = document.getElementsByClassName("expansionMenu")[0]
  if (menu.classList.contains("open")) {
    ExpansionMenu.style.height = "0%"
    menu.classList.remove("open")
  } else {
    ExpansionMenu.style.height = "100%"
    menu.classList.toggle("open")
  }
}

const none = "none"
const block = "block"
const loginmenu = document.getElementById("login-menu")
const maincontainer = document.querySelector(".main-container")
const signbtn = document.getElementById("signin-btn")
const signinbtnsbmt = document.getElementById("signbtn-sbmt")
const loginbtnsbmt = document.getElementById("login-sbmt-btn")
const signoutbtn = document.getElementById("sign-out-btn")
const dashboard = document.getElementById("dashboard")
const newAuthNameInput = document.getElementById("new-auth-name")
const newAuthPhotoLink = document.getElementById("auth-photo-link")
const newAuthBio = document.getElementById("auth-bio")
const submitNewAuth = document.getElementById("submit-new-auth")
const loginBtn = document.getElementById("login")
const signupBtn = document.getElementById("signup")

loginmenu.style.display = none
dashboard.style.display = none
const enteredusers = []
const userinfo = JSON.parse(localStorage.getItem("User"))



loginbtnsbmt.addEventListener("click", (e) => {
  e.preventDefault()
  setTimeout(() => {
    userresponse.then((userlogin) =>
      userlogin.filter((users) => {
        const loginemail = document.getElementById("mail").value
        const loginpassword = document.getElementById("pass").value

        if (users.mail === loginemail && users.password === loginpassword) {
          enteredusers.push({
            mail: `${loginemail}`,
            password: `${loginpassword}`,
          })
          localStorage.setItem("User", JSON.stringify(enteredusers))
          loginmenu.style.display = none
          signbtn.style.display = none
          signoutbtn.style.display = block

          return console.log("YOU ENTERED")
        } else {
          loginBtn.innerHTML = "Account wasn't found"
          location.reload()
          return console.log("WRONG MAIL OR PASSWORD")
        }
      })
    )
    loginBtn.innerHTML = "Logining..."
  }, 3000)
})


function closeLoginMenu() {
  loginmenu.style.display = none
  signinbtnsbmt.innerHTML = "Sign up"
  loginbtnsbmt.innerHTML = "Login"
}

loginBtn.addEventListener("click", (e) => {
  let parent = e.target.parentNode.parentNode
  Array.from(e.target.parentNode.parentNode.classList).find((element) => {
    if (element !== "slide-up") {
      parent.classList.add("slide-up")
    } else {
      signupBtn.parentNode.classList.add("slide-up")
      parent.classList.remove("slide-up")
    }
  })
})

signupBtn.addEventListener("click", (e) => {
  let parent = e.target.parentNode
  Array.from(e.target.parentNode.classList).find((element) => {
    if (element !== "slide-up") {
      parent.classList.add("slide-up")
    } else {
      loginBtn.parentNode.parentNode.classList.add("slide-up")
      parent.classList.remove("slide-up")
    }
  })
})

signbtn.addEventListener("click", () => {
  loginmenu.style.display = block
})

//Check Log in
logCheck()
signoutbtn.addEventListener("click", () => {
  location.reload()
  localStorage.removeItem("User")
})
function logCheck() {
  userresponse.then((data) =>
    data.map((check) => {
      userinfo.find((userinfos) => {
        if (
          userinfos.mail === check.mail &&
          userinfos.password === check.password
        ) {
          dashboard.style.display = block
          signbtn.style.display = none
          signoutbtn.style.display = block
          console.log("Logged in")
        }
      })
    })
  )
}


//Logout Checker
function logOutCheck(userinfo) {
  if (userinfo === null) {
    location.href = "index.html"
  }
}

//Logout Action
logOutCheck(userinfo)
signoutbtn.addEventListener("click", () => {
  location.reload()
  localStorage.removeItem("User")
})



renderAuthorList();
function renderAuthorList() {
  dashtableauthors.innerHTML = ""
  axios.get("http://localhost:3000/api/authors")
    .then(author => author.data.map(info => {
      loaderDashMenu.style.display = "none"
      const authorRow = `
    <tr>
    <td>${info.id}</td>
    <td><img style="width:100px; height:100px; object-fit: cover;" src="${info.imgUrl}" alt="">
    </td>
    <td> ${info.name}</td>
    <td>${info.biography}</td>
    <td>
    <i onclick="deleteAuthor(${info.id})" style="color:black ; font-size: 25px;" class="fa fa-trash-o" aria-hidden="true"
    id="delete"></i>
    <i  onclick="editAuthor(${info.id})"  style="color:black  ;font-size: 25px;" class=" fa fa-pencil-square-o"
    aria-hidden="true" id="editAuth"></i>
    </td>
    </tr>
          `
      dashtableauthors.insertAdjacentHTML("beforeend", authorRow)
    }))
}

function deleteAuthor(id) {
  axios.delete(`http://localhost:3000/api/authors/${id}`)
    .then(response => console.log(response))
    .then(err => console.log(err))
}

dashaddbtn.addEventListener("click", () => {
  document.getElementById("container").style.left = "50%"

})
dashAddCloser.addEventListener("click", () => {
  document.getElementById("container").style.left = "-50%"
})

submitNewAuth.addEventListener("click", () => {
  const newAuth = {
    name: newAuthNameInput.value,
    imgUrl: newAuthPhotoLink.value,
    biography: newAuthBio.value
  }
  axios.post("http://localhost:3000/api/authors", newAuth)
    .then(response => console.log(response))
    .catch(err => console.log(err))

})

function editAuthor(id) {
  authEditOpener()
  axios.get("http://localhost:3000/api/authors")
    .then(auth => auth.data.map(info => {
      if (id === info.id) {
        editAuthName.value = info.name,
          editAuthPhotoLink.value = info.imgUrl,
          editAuthBio.value = info.biography
        submitEditAuth.addEventListener("click", (e) => {
          e.preventDefault()
          const editedAuth =
          {
            name: editAuthName.value,
            imgUrl: editAuthPhotoLink.value,
            biography: editAuthBio.value
          }
          axios.post(`http://localhost:3000/api/authors`, editedAuth)
          axios.delete(`http://localhost:3000/api/authors/${id}`)
            .then(solved => console.log(solved))
            .catch(err => console.log(err))
        })
      }
    })
    )
}

function authEditOpener() {
  editContainer.style.left = "50%"

}
editAuthCloser.addEventListener("click", (e) => {
  e.preventDefault()
  editContainer.style.left = "-50%"
})

