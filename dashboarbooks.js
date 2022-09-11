

const fetchedAuthors = fetch(
    "http://localhost:3000/api/authors"
).then((response) => response.json())
const userresponse = fetch("http://localhost:3000/api/users").then((response) =>
    response.json()
)

const mainauthor = document.getElementById("author-container")
const modalescbtn = document.getElementById("close-btn")
const modalauthor = document.getElementById("auth-modal")
const dashtablebooks = document.getElementById("dash-books-table-body")
const addAuthorBtn = document.getElementById("dashtable-add-btn")
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
const loaderDashMenu = document.querySelector(".loader-dashboard")
const enteredusers = []
const userinfo = JSON.parse(localStorage.getItem("User"))



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

                    signbtn.style.display = none
                    signoutbtn.style.display = block
                    console.log("Logged in")
                }
            })
        })
    )
}



function logOutCheck() {
    if (!localStorage.length) {
        location.href = "index.html"
    }
}
logOutCheck()
signoutbtn.addEventListener("click", () => {
    location.reload()
    localStorage.removeItem("User")
})

renderDashBooksList();


function renderDashBooksList() {
    setTimeout(() => {
        loaderDashMenu.style.display = "none"
    }, 2000);
    dashtablebooks.innerHTML = ""

    axios.get("http://localhost:3000/api/books/")
        .then(author => author.data.map(info => {

            const authorRow = `     
      <tr>
      <td>${info.id}</td>
      <td> <img style="width: 120px; height:120px" src="${info.imageUrl}" alt=""> </td>
      <td>${info.title}</td>
      <td>${info.author}</td>
      <td>${info.publishDay}</td>
      <td>${info.genre}</td>
      <td>${info.bookCover}</td>
      <td>${info.publisher}</td>
      <td>${info.price}</td>
      <td>${info.sold}</td>
      <td>
      <i onclick="deleteBook(${info.id})" style="color:black ; font-size: 25px;" class="fa fa-trash-o" aria-hidden="true"
          id="delete"></i>
      <i onclick="editBook(${info.id})" style="color:black  ;font-size: 25px;" class=" fa fa-pencil-square-o"
          aria-hidden="true" id="edit-book"></i>
      </td>
      </tr>
            `

            dashtablebooks.insertAdjacentHTML("beforeend", authorRow)

        }))
}


function deleteBook(id) {
    axios.delete(`http://localhost:3000/api/books/${id}`)
        .then(response => console.log(response))
        .then(err => console.log(err))
}

const addBookBtn = document.getElementById("dashtable-add-book-btn")
const bookContainer = document.getElementById("book-container")
const bookFormCloser = document.getElementById("book-form-closer")

addBookBtn.addEventListener("click", (e) => {
    e.preventDefault()
    bookContainer.style.left = "50%"
    const submitEditBook = document.getElementById("submit-new-book")
    submitEditBook.addEventListener("click", publishBook)

})
bookFormCloser.addEventListener("click", () => {
    document.forms['book-add-form'].reset();
    bookContainer.style.left = "-50%"
})




const addBookTitle = document.getElementById("add-book-title")
const addBookPrice = document.getElementById("add-book-price")
const addBookSold = document.getElementById("add-book-sold")
const addBookAuthorName = document.getElementById("add-book-author-name")
const addBookPhotoLink = document.getElementById("add-book-photo-link")
const addBookPublsiher = document.getElementById("add-book-publisher")
const addBookPublishDate = document.getElementById("add-book-publish-date")
const addBookCoverHard = document.getElementById("book-cover-type-hard")
const addBookCoverSoft = document.getElementById("book-cover-type-soft")
const addBookSynopsis = document.getElementById("book-synopsis")






function publishBook() {
    let coverResult = ""
    const checkCover = document.querySelectorAll('input[name="covertype"]:checked');
    Array.from(checkCover).forEach(function (cover) {
        coverResult += cover.id
    })
    const genreList = []
    const checkbox = document.querySelectorAll('input[name="genre"]:checked');
    Array.from(checkbox).forEach(function (element) {
        genreList.push(element.id)
    })

    const newBook = {

        title: addBookTitle.value,
        author: addBookAuthorName.value,
        publisher: addBookPublsiher.value,
        publishDay: addBookPublishDate.value,
        sold: addBookSold.value,
        price: addBookPrice.value,
        imageUrl: addBookPhotoLink.value,
        synopsis: addBookSynopsis.value,
        genre: genreList,
        bookCover: coverResult
    }
    axios.post(`http://localhost:3000/api/books`, newBook)

}


function editBook(id) {
    const submitEditBook = document.getElementById("submit-new-book")
    document.getElementById("title").innerHTML = "Book Edit Form"
    bookContainer.style.left = "50%"
    axios.get(`http://localhost:3000/api/books/${id}`)
        .then(books => {
            addBookTitle.value = books.data.title,
                addBookPrice.value = books.data.price,
                addBookSold.value = books.data.sold,
                addBookAuthorName.value = books.data.author,
                addBookPhotoLink.value = books.data.imageUrl,
                addBookPublsiher.value = books.data.publisher,
                addBookPublishDate.defaultValue = books.data.publishDay,
                addBookSynopsis.value = books.data.synopsis
            books.data.bookCover === "soft"
                ? (document.getElementById("soft").checked = true)
                : (document.getElementById("hard").checked = true),

                books.data.genre.map(genre => (document.getElementById(`${genre}`).checked = true))
        })

    submitEditBook.addEventListener("click", (e) => {
        e.preventDefault()
        publishBook()
        deleteBook(id)
    })
}









