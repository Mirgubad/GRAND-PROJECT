const fetcheddatabookspage = fetch(
  "http://localhost:3000/api/books"
).then((response) => response.json())
const userresponse = fetch("http://localhost:3000/api/users").then((response) =>
  response.json()
)
const booksheader = document.getElementById("books-header")
const loader = document.querySelector(".loader-books-page")
const bookscontainer = document.getElementById("books-container")
const bookitemfav = document.getElementById("books-item")
const none = "none"
const block = "block"
const loginmenu = document.getElementById("login-menu")
const maincontainer = document.querySelector(".main-container")
const booksbox = document.getElementById("book-box")
const signbtn = document.getElementById("signin-btn")
const signinbtnsbmt = document.getElementById("signbtn-sbmt")
const loginbtnsbmt = document.getElementById("login-sbmt-btn")
const signoutbtn = document.getElementById("sign-out-btn")
const dashboard = document.getElementById("dashboard")
const enteredusers = []
const userinfo = JSON.parse(localStorage.getItem("User"))
booksheader.style.display = "none"
loginmenu.style.display = none

fetcheddatabookspage.then((data) => {
  data.map((book) => {
    setTimeout(() => {
      loader.style.display = "none"
    }, 2000);
    const bookspagelist =
      `
        <div class="book">
          <button onclick="changePageLeft(${book.id})" id="changebtnleft"></button>
           <button onclick="changePageRight(${book.id})" id="changebtnright"></button>
          <label for="page-1" class="book__page book__page--1">
            <img src="${book.imageUrl}" alt="img">
          </label>

          <label for="page-2" class="book__page book__page--4">
            <div class="page__content">
            <br>
            <p style="color:black; font-size:10px; font-weight:bold;">Genre</p>
            <p style="color:black; font-size:8px; font-weight:bold;">${book.genre} </p>
              <h1 class="page__content-title">Synopsis</h1>
              <div class="page__content-blockquote">
              
                <p class="page__content-blockquote-text">${book.synopsis}</p>
                <span class="page__content-blockquote-reference"></span>
              </div>
              <div class="page__content-text">

              </div>
              <div class="page__number">3</div>
            </div>
          </label>
          <label id="${book.id}" class="book__page book__page--2">
            <div class="book__page-front">

              <div class="page__content">
              <br>
                <p>$${book.price} </p>
                <h1 class="page__content-book-title">Foundation</h1>
                <h2 class="page__content-author">${book.author}</h2>
                <div class="page__content-copyright">
                  <p>The Folio Society</p>
                  <p>${book.publisher},
                    ${book.publishDay}</p>
                </div>
              </div>
            </div>
            <div class="book__page-back">
              <div class="page__content">
                <h1 class="page__content-title">Contents</h1>
                <table class="page__content-table">
                  <tr>
                    <td align="left">Part I</td>
                    <td align="left">The Psycohistorians</td>
                  </tr>
                  <tr>
                    <td align="left">Part II</td>
                    <td align="left">The Encyclopedists</td>
                  </tr>
                </table>
                <div class="page__number">2</div>
              </div>
            </div>
          </label>
        </div>

`
    booksheader.style.display = "block"

    bookscontainer.insertAdjacentHTML("beforeend", bookspagelist)

  })
})


function changePageLeft(id) {
  document.getElementById(id).style
    .transition = "transform 0.9s cubic - bezier(0.645, 0.045, 0.355, 1);"
  document.getElementById(id).style
    .transform = "rotateY(0deg)"
}

function changePageRight(id) {
  document.getElementById(id).style
    .transition = "transform 0.9s cubic - bezier(0.645, 0.045, 0.355, 1);"
  document.getElementById(id).style
    .transform = "rotateY(-180deg)"
}
signinbtnsbmt.addEventListener("click", () => {
  setTimeout(() => {
    signinbtnsbmt.innerHTML = "Signing in..."
  }, 1000)
})

loginbtnsbmt.addEventListener("click", (e) => {
  e.preventDefault()
  loginBtn.innerHTML = "Logining..."
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
          return true
        }
        else if (!loginemail || !loginpassword) {
          loginBtn.innerHTML = "Please fill the data!!!"
        } else {
          loginBtn.innerHTML = "Account wasn't found!!!"

          return false
        }
      })
    )
  }, 3000)
})

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
// function logCheck() {
//   userresponse.then((data) =>
//     data.map((check) => {
//       userinfo.find((userinfos) => {
//         if (
//           userinfos.mail === check.mail &&
//           userinfos.password === check.password
//         ) {
//           const dashmenu = `< li class="d" id="dashboard" > <a href="./dashboard.html">Dashboard </a></li >`
//           dashmenucreater.insertAdjacentHTML("beforeend", dashmenu)
//           signbtn.style.display = none
//           signoutbtn.style.display = block
//           console.log("Logged in")
//         }
//       })
//     })
//   )
// }




logCheck(enteredusers)


function logCheck(arr) {
  if (localStorage.length) {

    const dashmenu = `<li class="nav__items" id="dashboard" > <a href="./dashboard.html">Dashboard </a></li >`
    dashmenucreater.insertAdjacentHTML("beforeend", dashmenu)
    signbtn.style.display = none
    signoutbtn.style.display = block
    // signoutbtn.innerHTML = `<a style="font-size: 15px; margin-bottom:5px;">${check.mail}</a>`
    console.log("Logged in")
  }
}


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


