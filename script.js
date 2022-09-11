const fetcheddata = fetch("http://localhost:3000/api/books").then((response) =>
  response.json()
)
const fetchedAuthors = fetch(
  "http://localhost:3000/api/authors"
).then((response) => response.json())

const userresponse = fetch("http://localhost:3000/api/users").then((response) =>
  response.json()
)

const none = "none"
const block = "block"
const loginmenu = document.getElementById("login-menu")
const maincontainer = document.querySelector(".main-container")
const carousel = document.querySelector(".container")
const booksbox = document.querySelector(".main-body-container")
const mainauthor = document.querySelector(".images-leaning")
const loader = document.querySelector(".loader")
const signbtn = document.getElementById("signin-btn")
const signinbtnsbmt = document.getElementById("signbtn-sbmt")
const loginbtnsbmt = document.getElementById("login-sbmt-btn")
const signoutbtn = document.getElementById("sign-out-btn")
const dashboard = document.getElementById("dashboard")
const bookInfoModal = document.querySelector(".book-modal-container")
const bookModalCloseBtn = document.getElementById("book-modal-closebtn")
const enteredusers = []
const userinfo = JSON.parse(localStorage.getItem("User"))






signinbtnsbmt.addEventListener("click", (e) => {
  e.preventDefault();

  const newUser = {
    name: document.getElementById("nameinput").value,
    surname: document.getElementById("surnameinput").value,
    mail: document.getElementById("emailinput").value,
    password: document.getElementById("passwordinput").value
  }

  if (!document.getElementById("nameinput").value && !document.getElementById("surnameinput").value
    && !document.getElementById("emailinput").value && !document.getElementById("passwordinput").value) {

    signupBtn.innerHTML = "PLEASE FILL THE DATA!!!"

  }
  else {

    axios.post("http://localhost:3000/api/books/signup", newUser)
      .then((response) => console.log(response))
      .catch((err) => console.log(err)),

      (signinbtnsbmt.innerHTML = "Signing in...")

  }





})


function bookModalInfo(id) {
  axios.get(`http://localhost:3000/api/books/${id}`)
    .then(book => {
      bookInfoModal.innerHTML = ""
      const infoBook = `
      <img id="book-modal-img" src="${book.data.imageUrl}" alt="">
    <div>
        <p>
        by ${book.data.author}
       </p>
       <p>
       ${book.data.publishDay}
       </p>
       <p>
       ${book.data.synopsis}
        </p>
     </div>
  `
      bookInfoModal.insertAdjacentHTML("beforeend", infoBook)
      document.querySelector(".book-modal").style.top = "50%"

    })
}


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



loginmenu.style.display = none
fetchedAuthors.then((data) => {
  data.map((author, index) => {

    if (index < 4) {
      const authorList = `
      <div  id="${author.id}">
      <img id="auth-img" src="${author.imgUrl}" alt="authorimg" />
      </div>
      `
      mainauthor.insertAdjacentHTML("beforeend", authorList)
    }
  })
})




fetcheddata.then((data) =>
  data.map((book, index) => {
    setTimeout(() => {
      if (index < 4) {
        loader.style.display = none
        const bookList = `
        <div onclick=" bookModalInfo(${book.id})" id="${book.id}" class="card">
            <div><a class="title"><img class="head-book-img" src="${book.imageUrl}" alt=""></a>
            </div>
          </div>
          `
        carousel.insertAdjacentHTML("beforeend", bookList)
      }
    }, 2000)
  })
)

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
logCheck()


function logCheck() {
  if (localStorage.length) {
    const dashmenu = `<li class="nav__items" id="dashboard" > <a href="./dashboard.html">Dashboard </a></li >`
    dashmenucreater.insertAdjacentHTML("beforeend", dashmenu)
    signbtn.style.display = none
    signoutbtn.style.display = block
    // signoutbtn.innerHTML = `<a style="font-size: 15px; margin-bottom:5px;">${check.mail}</a>`
    console.log("Logged in")
  }
}

const arr = []

axios.get("http://localhost:3000/api/books")
  .then(book => {
    const sortedBooks =
      book.data.sort((book1, book2) =>
        book2.sold - book1.sold).slice(0, 4)

    sortedBooks.map(book => {

      const newbooklist = `
  <div onclick= "bookModalInfo(${book.id})" >
  <a class="books-container" target="_blank" rel="noreferrer noopener">
            <div class="books">
              <img alt="The Outstanding Developer by Sebastien Castiel"
                src="${book.imageUrl}" />
            </div>
          </a>
  </div>
  </div>
  
    `
      booksbox.insertAdjacentHTML("beforeend", newbooklist)
    })
  })


bookModalCloseBtn.addEventListener("click", () => {
  document.querySelector(".book-modal").style.top = "-50%"
})
