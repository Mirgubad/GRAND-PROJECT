const fetchedAuthors = fetch(
  "http://localhost:3000/api/authors"
).then((response) => response.json())
const userresponse = fetch("http://localhost:3000/api/users").then((response) =>
  response.json()
)
const loaderauthor = document.querySelector(".loader-author")
const mainauthor = document.getElementById("author-container")
const modalescbtn = document.getElementById("close-btn")
const modalauthor = document.getElementById("auth-modal")


fetchedAuthors.then((data) => {
  setTimeout(() => {
    loaderauthor.style.display = "none"
  }, 2000);
  data.map((author) => {
    console.log(author)

    const authorList = `
   <div id="${author.id}" onclick="myFunction(id)" class="author-cards__item" >
<img id="booksauth" src="${author.imgUrl} ">
<p>${author.name}</p>
</div>`


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
const dashmenucreater = document.getElementById("dashafter")
function logCheck() {
  userresponse.then((data) =>
    data.map((check) => {
      userinfo.find((userinfos) => {
        if (
          userinfos.mail === check.mail &&
          userinfos.password === check.password
        ) {


          const dashmenu = `< li class="d" id="dashboard" > <a href="./dashboard.html">Dashboard </a></li >`

          dashmenucreater.insertAdjacentHTML("beforeend", dashmenu)
          signbtn.style.display = none
          signoutbtn.style.display = block
          console.log("Logged in")
        }
      })
    })
  )
}

logCheck()


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
