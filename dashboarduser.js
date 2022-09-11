


const fetchedAuthors = fetch(
  "http://localhost:3000/api/authors"
).then((response) => response.json())
const userresponse = fetch("http://localhost:3000/api/users").then((response) =>
  response.json()
)

const loaderDashMenu = document.querySelector(".loader-dashboard")
const mainauthor = document.getElementById("author-container")
const modalescbtn = document.getElementById("close-btn")
const modalauthor = document.getElementById("auth-modal")
const dashtableauthors = document.getElementById("table-body")

// fetchedAuthors.then((datas) => {
//   datas.map((auth) => console.log(auth))
// })

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
// dashboard.style.display = none
const enteredusers = []
const userinfo = JSON.parse(localStorage.getItem("User"))

console.log(userinfo)

signinbtnsbmt.addEventListener("click", () => {
  setTimeout(() => {
    fetch(
      "http://localhost:3000/api/books/signup",

      {
        method: "POST",
        body: {
          name: "string",

          surname: "string",

          mail: "string",

          password: "string",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
    signinbtnsbmt.innerHTML = "Signing in..."
  }, 1000)
})

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
          // dashboard.style.display = block
          signbtn.style.display = none
          signoutbtn.style.display = block
          console.log("Logged in")
        }
      })
    })
  )
}


// axios.delete(`http://localhost:3000/api/authors/2`)
//   .then(response=>console.log(response))
//   .then(err=>console.log(err))

function logOutCheck(userinfo) {
  if (userinfo === null) {
    location.href = "index.html"
  }
}
logOutCheck(userinfo)
signoutbtn.addEventListener("click", () => {
  location.reload()
  localStorage.removeItem("User")
})



// axios.delete(`http://localhost:3000/api/authors/6`)
// .then(response=>console.log(response))
// .then(err=>console.log(err))




renderAuthorList();





function renderAuthorList() {
  dashtableauthors.innerHTML = ""
  const deleted = document.getElementById("delete")
  setTimeout(() => {
    loaderDashMenu.style.display = "none"

  }, 2000);
  axios.get("http://localhost:3000/api/users")
    .then(author => author.data.map(info => {

      function deleteAuthor() {
        axios.delete(`http://localhost:3000/api/authors/${info.id}`)
          .then(response => console.log(response))
          .then(err => console.log(err))
      }

      const authorRow = `
    <tr>
    <td>${info.id}</td>
    <td> ${info.name}</td>
    <td>${info.surname}</td>
    <td>${info.mail}</td>
    <td onclick="myFunction(${info.id})" id="table-password-info"><i class="far fa-eye" id="togglePassword"></i>
    <input type="password" value="${info.password}" id="${info.id}">

    </td>
    </td>
    </tr>
          `
      dashtableauthors.insertAdjacentHTML("beforeend", authorRow)

    }))





}


function myFunction(id) {
  var x = document.getElementById(`${id}`);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}





