const inputName = document.querySelector(".input-name")
const inputNumber = document.querySelector(".input-data")
const card = document.querySelector(".cards");
const saveBtn = document.querySelector(".save-btn")
const deleteAllCards = document.querySelector(".delete-all-btn");
const loading = document.querySelector(".loadingLogo");


function addCard() {
    if (inputNumber.value === "" || inputName.value === "") {
        alert("Error! Complete inputs");
    } else if (inputNumber.value.length < 16) {
        alert("Number is less than 16");
    } else if (isNaN(inputNumber.value)) {
        alert("Please write a number!")
    } else {
        loading.style.display = "block"
        let res = JSON.parse(localStorage.getItem("card")) || [];

        setTimeout(() => {
            let newCard = {
                id: res.length + 1,
                number: inputNumber.value,
                name: inputName.value,
                data: new Date().toLocaleDateString()
            }

            res = [...res, newCard];
            localStorage.setItem("card", JSON.stringify(res))

            inputNumber.value = "";
            inputName.value = "";
            loading.style.display = "none"
            viewCardData()
        }, 1000)
    }
}


function viewCardData() {
    card.innerHTML = '';
    let res = JSON.parse(localStorage.getItem("card")) || [];
    res.map((item) => {
        const userName = document.querySelectorAll(".user-name");

        userName.forEach((el) => {
            el.style.textTransform = "uppercase";
        })

        card.innerHTML += `
        <div class="card-data">
        <div class="img-delBtn">   
        ${item.number[0] === "1"
                ? ' <img src="./images/masterLogo.webp" alt="" />'
                : item.number[0] === "2"
                    ? ' <img src="./images/visaLogo.png" alt="" />'
                    : item.number[0] === "3"
                        ? " <img src='./images/optimaLogo.png' alt='' />"
                        : item.number[0] === "4"
                            ? " <img src='./images/mbankLogo.png' alt='' />"
                            : item.number[0] === "5"
                                ? " <img src='./images/aziaLogo.png' alt='' />"
                                : item.number[0] === "6"
                                    ? " <img src='./images/ailLogo.png' alt='' />"
                                    : item.number[0] === "7"
                                        ? " <img src='./images/kaspiLogo.png' alt='' />"
                                        : item.number[0] === "8"
                                            ? " <img src='./images/bakaiLogo.png' alt='' />"
                                            : item.number[0] === "9"
                                                ? " <img src='./images/rskLogo.png' alt='' />"
                                                : " <img src='./images/baiLogo.png' alt='' />"
            }
            <button class="deleteBtn">X</button>
        </div>
        <p class="numberData user-card-number">
        ${item.number.slice(0, 4) + "-" + item.number.slice(4, 8) + "-" + item.number.slice(8, 12) + "-" + item.number.slice(12, 16)}
        </p>
        
        <div class="name-data-contant">
        <div class="name-contant">
        <p class="name-text">Name</p>
        <h4 class="user-name">${item.name.slice(0, 5) + "..."


            }</h4 >
        </div >

        <div class="data-contant">
            <p class="data-text">Valid Til</p>
            <h4 class="user-data">${item.data.replaceAll(":", "/")}</h4>
        </div>
        </div >
        `
    })
    deleteFn()
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addCard()
    }
})

saveBtn.addEventListener("click", () => {
    addCard()
})


function deleteFn() {
    const deleteBtn = document.querySelectorAll(".img-delBtn button");
    let data = JSON.parse(localStorage.getItem("card")) || []
    deleteBtn.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            data = data.filter((el, id) => {
                return id !== idx
            })
            localStorage.setItem("card", JSON.stringify(data));
            viewCardData()
        })
    })
}


deleteAllCards.addEventListener("click", () => {
    let res = JSON.parse(localStorage.getItem("card")) || [];

    res = [];
    localStorage.setItem("card", JSON.stringify(res))
    viewCardData()
})

viewCardData();