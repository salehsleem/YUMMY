let data = document.getElementById("data");
let search = document.getElementById("search");
let submit;
let spaceBox = $(".asideLeft").outerWidth();
let spaceFromLeft = $(".asideNavBar").css("left");

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loadingScreen").fadeOut(500);
        $("body").css("overflow", "visible");
    })
})

function closeNavBar() {
    $(".open-close-icon").addClass("fa-bars").removeClass("fa-xmark");
    $(".asideNavBar").animate({ left: -spaceBox }, 1000);
    for (let i = 4; i >= 0; i--) {
        $(".asideNavBar ul p").eq(i).animate({ top: "300px" }, 700 - i * 100);
    }
}

function openNavBar() {
    $(".open-close-icon").addClass("fa-xmark").removeClass("fa-bars");
    $(".asideNavBar").animate({ left: 0 }, 700);
    for (let i = 0; i < 5; i++) {
        $(".asideNavBar ul p").eq(i).animate({ top: 0 }, i * 100 + 400);
    }
}

closeNavBar();

$(".open-close-icon").click(() => {
    let spaceFromLeft = $(".asideNavBar").css("left");
    if (spaceFromLeft == "0px") {
        closeNavBar();
    }
    else {
        openNavBar();
    }
})



function displayMeal(arr) {
    let meals = "";
    for (let i = 0; i < arr.length; i++) {
        meals +=
            `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div onclick="mealDetails('${arr[i].idMeal}')" class="meal position-relative  overflow-hidden">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="logo">
                    <div class="mealLayer text-black position-absolute d-flex align-items-center">
                        <h2 class="ps-2">${arr[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        `
    }
    data.innerHTML = meals;
}

async function getCategories() {
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    search.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayCategories(response.categories);
    $(".innerLoadingScreen").fadeOut(300);
}
function displayCategories(arr) {
    let categories = "";
    for (let i = 0; i < arr.length; i++) {
        categories +=
            `   <div class="col-lg-3 col-md-6 col-sm-12">
                <div onclick="categoryMeal('${arr[i].strCategory}')" class="meal catecory  position-relative  overflow-hidden">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="logo">
                    <div class="mealLayer text-black position-absolute p-2 text-center">
                        <h2 class="ps-2">${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div> 
        `
    }
    data.innerHTML = categories;
}

async function getArea() {
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    search.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals);
    $(".innerLoadingScreen").fadeOut(300);
}
function displayArea(arr) {
    let area = "";
    for (let i = 0; i < arr.length; i++) {
        area +=
            `   <div class="col-lg-3 col-md-6 col-sm-12">
                <div onclick="areaMeal('${arr[i].strArea}')" class="meal text-white  text-center ">
                    <i class="fa-solid fa-house-laptop fa-5x"></i>
                    <h2>${arr[i].strArea}</h2>
                </div>
            </div> 
        `
    }
    data.innerHTML = area;
}

async function getIngredients() {
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    search.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    displayIngredients(response.meals.slice(0, 20));
    $(".innerLoadingScreen").fadeOut(300);
}
function displayIngredients(arr) {
    let ingredients = "";
    for (let i = 0; i < arr.length; i++) {
        ingredients +=
            `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div onclick="ingredientsMeal('${arr[i].strIngredient}')" class="meal text-center text-white">
                    <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                    <h2 class="ps-2">${arr[i].strIngredient}</h2>
                    <p>${arr[i].strDescription.split(" ").slice(0, 30).join(" ")}</p>
                </div>
            </div>
        `
    }
    data.innerHTML = ingredients;
}

async function categoryMeal(category) {
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeal(response.meals);
    $(".innerLoadingScreen").fadeOut(300);
}

async function areaMeal(area) {
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    displayMeal(response.meals);
    $(".innerLoadingScreen").fadeOut(300);
}

async function ingredientsMeal(ingredient) {
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    response = await response.json();
    displayMeal(response.meals);
    $(".innerLoadingScreen").fadeOut(300);
}

async function mealDetails(mealId) {
    closeNavBar();
    data.innerHTML = "";
    search.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    response = await response.json();
    displayMealDetails(response.meals[0])
    $(".innerLoadingScreen").fadeOut(300);
}

function displayMealDetails(meal) {
    search.innerHTML = "";
    let ingredient = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredient += `<li class="alert alert-info  p-1 rounded-5 me-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];
    let tagStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagStr += `<li class="alert alert-danger  p-1 rounded-5 me-2">${tags[i]}</li>`
    }

    let meals = ` <div class="col-md-4 col-sm-12">
                <div class="nameMeal text-white">
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="img">
                    <h2 class="p-2">${meal.strMeal}</h2>
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="infoMeal text-white">
                    <h2>Instructions.</h2>
                    <p>${meal.strInstructions}</p>
                    <h3>area : <span>${meal.strArea}</span></h3>
                    <h3>Category : <span>${meal.strCategory}</span></h3>
                    <h3>Recipes :</h3>
                    <ul class="d-flex list-unstyled flex-wrap">
                        ${ingredient}
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="d-flex list-unstyled flex-wrap">
                        ${tagStr}
                    </ul>
                    <a href="${meal.strSource}"  target="_blank"  class="btn btn-success " >Source</a>
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger ">Youtube</a>
                </div>
            </div>`

    data.innerHTML = meals;
}


function displaySearchInputs() {
    $(".innerLoadingScreen").fadeIn(300);

    search.innerHTML = `
            
                <div class="row py-5">
                    <div class="col-md-6 col-sm-12">
                        <input onkeyup="searchByName(this.value)" type="text" class="form-control w-100 bg-black text-white" placeholder="Search By Name">
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <input onkeyup="searchByFLetter(this.value)" maxlength="1" type="text" class="form-control w-100 bg-black text-white" placeholder="Search By First Letter">
                    </div>
                </div>
            
        `
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeOut(300);

}

async function searchByName(searchedMeal) {
    closeNavBar();
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    if (searchedMeal == "") {
        searchedMeal = "beef"
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`);
    response = await response.json();
    if (response.meals) {
        displayMeal(response.meals)
    }
    else {
        displayMeal([])
    }
    $(".innerLoadingScreen").fadeOut(300);

}

async function searchByFLetter(fl) {
    closeNavBar();
    data.innerHTML = "";
    $(".innerLoadingScreen").fadeIn(300);
    if (fl == "") {
        fl = "a"
    }

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fl}`);
    response = await response.json();
    if (response.meals) {
        displayMeal(response.meals);
    }
    else {
        displayMeal([])
    }
    $(".innerLoadingScreen").fadeOut(300);
}

function getContact() {
    $(".innerLoadingScreen").fadeIn(300);
    search.innerHTML = "";
    data.innerHTML = ` <div class="container d-flex justify-content-center align-items-center vh-100" >
                <div class="row g-4 ">
                    <div class="col-md-6 col-sm-12">
                        <div>
                            <input id="nameInput" onkeyup="inputsValidation()" class="form-control  bg-black text-white" type="text" placeholder="Enter Your Name">
                            <div id="nameAlert" class="text-center text-black bg-danger rounded-3 p-3 mt-2 mb-3 d-none ">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div>
                            <input id="emailInput" onkeyup="inputsValidation()" class="form-control bg-black text-white" type="email" placeholder="Enter Your Email">
                            <div id="emailAlert" class="text-center text-black bg-danger rounded-3 p-3 mt-2 mb-3 d-none ">
                                Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div>
                            <input id="phoneInput" onkeyup="inputsValidation()" class="form-control bg-black text-white" type="text" placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="text-center text-black bg-danger rounded-3 p-3 mt-2 mb-3 d-none ">
                                Enter valid Phone Number
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div>
                            <input id="ageInput" onkeyup="inputsValidation()" class="form-control bg-black text-white" type="number" placeholder="Enter Your Age">
                            <div id="ageAlert" class="text-center text-black bg-danger rounded-3 p-3 mt-2 mb-3 d-none ">
                                Enter valid age
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div>
                            <input id="passwordInput" onkeyup="inputsValidation()" class="form-control bg-black text-white" type="password" placeholder="Enter Your Password">
                            <div id="passwordAlert" class="text-center text-black bg-danger rounded-3 p-3 mt-2 mb-3 d-none ">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div>
                            <input id="repasswordInput" onkeyup="inputsValidation()" class="form-control bg-black text-white" type="password" placeholder="Repassword">
                            <div id="repasswordAlert" class="text-center text-black bg-danger rounded-3 p-3 mt-2 mb-3 d-none ">
                                Enter valid repassword
                            </div>
                        </div>
                    </div>
                    <button id="submit" disabled class="btn btn-outline-danger w-auto m-auto mt-4">submit</button>
                </div>
            </div>`

    submit = document.getElementById("submit");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouch = true
    })
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouch = true
    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouch = true
    })
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouch = true
    })
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouch = true
    })
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouch = true
    })

    $(".innerLoadingScreen").fadeOut(300);
}

let nameInputTouch = false;
let emailInputTouch = false;
let phoneInputTouch = false;
let ageInputTouch = false;
let passwordInputTouch = false;
let repasswordInputTouch = false;





function inputsValidation() {
    if (nameInputTouch) {
        if (nameValid()) {
            document.getElementById("nameAlert").classList.add("d-none");
        }
        else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
        }
    }
    if (emailInputTouch) {
        if (emailValid()) {
            document.getElementById("emailAlert").classList.add("d-none");
        }
        else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        }
    }
    if (phoneInputTouch) {
        if (phoneValid()) {
            document.getElementById("phoneAlert").classList.add("d-none");
        }
        else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        }
    }
    if (ageInputTouch) {
        if (ageValid()) {
            document.getElementById("ageAlert").classList.add("d-none");
        }
        else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
        }
    }
    if (passwordInputTouch) {
        if (passwordValid()) {
            document.getElementById("passwordAlert").classList.add("d-none");
        }
        else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
        }
    }
    if (repasswordInputTouch) {
        if (repasswordValid()) {
            document.getElementById("repasswordAlert").classList.add("d-none");
        }
        else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
        }
    }

    if (nameValid() && emailValid() && phoneValid() && ageValid() && passwordValid() && repasswordValid()) {
        submit.removeAttribute("disabled");
    }
    else {
        submit.setAttribute("disabled", true);
    }
}

function nameValid() {
    let regex = /^[a-zA-Z\s'-.]+$/;
    let nameRegex = document.getElementById("nameInput").value;
    return regex.test(nameRegex);
}

function emailValid() {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailRegex = document.getElementById("emailInput").value;
    return regex.test(emailRegex);
}
function phoneValid() {
    let regex = /^\+?(\d{1,3})?[-. ]?\(?\d{1,4}?\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/;
    let phoneRegex = document.getElementById("phoneInput").value;
    return regex.test(phoneRegex)
}

function ageValid() {
    let regex = /^(200|1[0-9]{1,2}|[1-9]?[0-9](\.\d+)?|0(\.\d+)?)$/;
    let emailRegax = document.getElementById("ageInput").value;
    return regex.test(emailRegax);
}
function passwordValid() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let passwordRegex = document.getElementById("passwordInput").value;
    return regex.test(passwordRegex)
}

function repasswordValid() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}