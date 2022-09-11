const fetchedAuthors = fetch(
  "http://localhost:3000/api/authors"
).then((response) => response.json())
const userresponse = fetch("http://localhost:3000/api/users").then((response) =>
  response.json()
)
const loaderauthor = document.querySelector(".loader-author")
const mainauthor = document.querySelector(".card__collection")
const modalescbtn = document.getElementById("close-btn")
const modalauthor = document.getElementById("auth-modal")




fetchedAuthors.then((data) => {
  setTimeout(() => {
    loaderauthor.style.display = "none"

  }, 2000);
  data.map((author) => {
    console.log(author)
    const authorList = `
   <div id="${author.id}" onclick="myFunction(id)" class="cards cards--two">
   <img
    src="${author.imgUrl}"
    class="img-responsive" alt="Cards Image">
  <span class="cards--two__rect"></span>
  <span class="cards--two__tri"></span>
  <p>${author.name}</p>
  </div>
`
    mainauthor.insertAdjacentHTML("beforeend", authorList)

  })
})
function myFunction(id) {
  fetchedAuthors.then((data) => {
    data.map((auth) => {
      if (auth.id == id) {
        modalauthor.innerHTML = ""
        const aboutauthor = `
        <i onclick="closeModal()" class="gg-close"></i>
        <div>
        <img id="auth-modal-img" src="${auth.imgUrl}">
        <p id="name">Name:${auth.name}</p>
     
        <p id="bio">Bio:${auth.biography}</p>
       </div>
     

        `

        mainauthor.style.filter = "blur(2px)"
        modalauthor.style.display = "block"
        modalauthor.insertAdjacentHTML("beforeend", aboutauthor)
        modalauthor.style.left = "50%"
      }
    })
  })
}
function closeModal() {
  mainauthor.style.filter = "blur(0)"
  modalauthor.style.display = "none"

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
const enteredusers = []
const userinfo = JSON.parse(localStorage.getItem("User"))

console.log(userinfo)

signinbtnsbmt.addEventListener("click", () => {
  setTimeout(() => {
    signinbtnsbmt.innerHTML = "Signing in..."
  }, 1000)
})

loginbtnsbmt.addEventListener("click", (e) => {
  setTimeout(() => {
    loginBtn.innerHTML = "Logining..."
  }, 3000);
  e.preventDefault()
  userresponse.then((userlogin) =>
    userlogin.filter((users) => {
      const loginemail = document.getElementById("mail").value
      const loginpassword = document.getElementById("pass").value

      if (users.mail == loginemail && users.password == loginpassword) {
        {
          setTimeout(() => {
            loginBtn.innerHTML = "Successfull..."
          }, 2000)
        }
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


})

loginmenu.style.display = none

const loginBtn = document.getElementById("login")
const signupBtn = document.getElementById("signup")

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

signoutbtn.addEventListener("click", () => {
  location.reload()
  localStorage.removeItem("User")
})

loginbtnsbmt.addEventListener("click", (e) => {
  loginBtn.innerHTML = "Logining..."
  e.preventDefault()
  const loginemail = document.getElementById("mail").value
  const loginpassword = document.getElementById("pass").value
  enteredusers.push({
    mail: `${loginemail}`,
    password: `${loginpassword}`
  })

  const loggedUser = {
    mail: loginemail,
    password: loginpassword
  }

  axios.post("http://localhost:3000/api/books/login", loggedUser)
    .then(() => {

      loginBtn.innerHTML = `Logged Successfully`
      setTimeout(() => {
        localStorage.setItem("User", JSON.stringify(enteredusers))
        loginmenu.style.display = none
        signbtn.style.display = none
        signoutbtn.style.display = block
        location.reload()
      }, 3000);

    }
    )
    .catch(() => loginBtn.innerHTML = `Login Error`)
})



function logOutCheck(userinfo) {
  if (userinfo === null) {
    location.href = "index.html"
  }
}
// logOutCheck(userinfo)
signoutbtn.addEventListener("click", () => {
  location.reload()
  localStorage.removeItem("User")
})


logCheck()

const dashmenucreater = document.getElementById("dashafter")
function logCheck() {
  if (localStorage.length) {
    const dashmenucreater = document.getElementById("dashafter")

    const dashmenu = `<li class="nav__items" id="dashboard" > <a href="./dashboard.html">Dashboard </a></li >`
    dashmenucreater.insertAdjacentHTML("beforeend", dashmenu)
    signbtn.style.display = none
    signoutbtn.style.display = block
    // signoutbtn.innerHTML = `<a style="font-size: 15px; margin-bottom:5px;">${check.mail}</a>`
    console.log("Logged in")
  }
}