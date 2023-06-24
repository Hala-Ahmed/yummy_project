
let rowData = document.getElementById("rowData");
let searchData = document.getElementById("searchData");
let submitBtn;
$(document).ready(()=>{
SearchByName("").then(()=>{
   $(".loading-screen").fadeOut(500)
   // $("body").css("overflow","visiable")
   // $(".inner-loading-screen").fadeOut(500)

})
})


function openNav() {

   $(".sibe-nav-menu").animate({ left: 0 }, 500)
   $(".open-close-icon").removeClass("fa-align-justify")
   $(".open-close-icon").addClass("fa-x")


   for (i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({
         top: 0
      }, (i + 5) * 150)
   }

}




function closeNav() {
   let boxWidth = $(".sibe-nav-menu .nav-tab").outerWidth()

   $(".sibe-nav-menu").animate({ left: -boxWidth }, 500)

   $(".open-close-icon").addClass("fa-align-justify")
   $(".open-close-icon").removeClass("fa-x")


   $(".links li").animate({ top: 300 }, 500)
}

closeNav()
$(".sibe-nav-menu i.open-close-icon").click(() => {

   if ($(".sibe-nav-menu").css("left") == "0px") {
      closeNav()
   }
   else {
      openNav()
   }
})



function DisplayData(arr) {
   let cartona = "";
   for (i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col-3">
       <div  onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 pointer">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="">
        <div class="meai-layer position-absolute d-flex align-items-center text-black p-2">
          <h3> ${arr[i].strMeal}</h3>
        </div>
      </div>
    </div> 
       `
   }

   rowData.innerHTML = cartona

}

SearchByName("")

async function getCategoies() {
$(".inner-loading-screen").fadeIn(300)

   searchData.innerHTML="";
   let response = await fetch(`https://themealdb.com/api/json/v1/1/categories.php`)
   response = await response.json()
   Displaycategories(response.categories)
   $(".inner-loading-screen").fadeOut(300)

}

function Displaycategories(arr) {
   let cartona = "";
   for (i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col-3">
       <div     onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 pointer">
        <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
        <div class="meai-layer position-absolute text-center text-black p-2">
          <h3> ${arr[i].strCategory}</h3>
          <P>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</P>
        </div>
      </div>
    </div> 
       `
   }

   rowData.innerHTML = cartona

}


async function getArea() {
   rowData.innerHTML = "" ;
   $(".inner-loading-screen").fadeIn(300)
   searchData.innerHTML="";
   let response = await fetch(`https://themealdb.com/api/json/v1/1/list.php?a=list`)
   response = await response.json()


   // console.log(response.meals);
   DisplayArea(response.meals)
   $(".inner-loading-screen").fadeOut(300)

}

function DisplayArea(arr) {

   let cartona = "";
   for (i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col-3">
       <div  onclick="getAreaMals('${arr[i].strArea}')" class=" rounded-2 text-center pointer">
          <h3> ${arr[i].strArea}</h3>
       
      </div>
    </div> 
       `
   }

   rowData.innerHTML = cartona

}





async function getIngredients() {
   rowData.innerHTML = ""
   $(".inner-loading-screen").fadeIn(300)

   searchData.innerHTML="";
   let response = await fetch(`https://themealdb.com/api/json/v1/1/list.php?i=list`)
   response = await response.json()
   // console.log(response.meals);

   DisplayIngredients(response.meals.slice(0, 20))
   $(".inner-loading-screen").fadeOut(300)

}

function DisplayIngredients(arr) {

   let cartona = "";
   for (i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col-3">
       <div  onclick="getIngredientsMals('${arr[i].strIngredient}')" class=" rounded-2 text-center pointer">
       <i class="fa-solid fa-bowl-food  text-info fa-4x"></i>
          <h3> ${arr[i].strIngredient}</h3>
          <P>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</P>
       
      </div>
    </div> 
       `
   }

   rowData.innerHTML = cartona

}

async function getCategoryMeals(categorty) {
   rowData.innerHTML = "" ;
   $(".inner-loading-screen").fadeIn(300)

   let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${categorty}`)
   response = await response.json()
   console.log(response);
   DisplayData(response.meals.slice(0, 20))
   $(".inner-loading-screen").fadeOut(300)


}
async function getAreaMals(area) {
   rowData.innerHTML = "" ;

   $(".inner-loading-screen").fadeIn(300)

   let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${area}`)
   response = await response.json()
   // console.log(response);
   DisplayData(response.meals.slice(0, 20))
   $(".inner-loading-screen").fadeOut(300)

}


async function getIngredientsMals(ingredients) {
   rowData.innerHTML = "" ;

   $(".inner-loading-screen").fadeIn(300)

   let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
   response = await response.json()
   // console.log(response);

   DisplayData(response.meals.slice(0, 20))
   $(".inner-loading-screen").fadeOut(300)

}
async function getMealDetails(mealID) {
   closeNav()
   rowData.innerHTML = "" ;
   $(".inner-loading-screen").fadeIn(300)
   searchData.innerHTML="" ;
   let response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
   response = await response.json()
   //  console.log(response);
   DisplayMealsDetails(response.meals[0])
   $(".inner-loading-screen").fadeOut(300)

}


function DisplayMealsDetails(meal) {
   searchData.innerHTML=""
   let ingredients = ``
   for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {

         ingredients += `<li class=" alert alert-info p-1 m-2">  ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]} </li>`
      }
   }
   let tags = meal.strTags?.split(",")
   if (!tags) tags = []

   let tagsSrt = ''
   for (let i = 0; i < tags.length; i++) {
      tagsSrt += `
 <li class=" alert alert-danger p-1 m-2">${tags[i]}</li>
 
 `
   }
   let cartona = `
   <div class="col-md-4">
   <img class="w-100 rounded-3"  src="${meal.strMealThumb}" alt="">
   <h2>${meal.strMeal}</h2>
  </div>
  <div class="col-md-8">
   <h2>Instructions</h2>
  <P>${meal.strInstructions}</P>
     <h3><span class="fw-bolder">Area :</span>${meal.strArea}</h3>
     <h3><span class="fw-bolder">Category:</span>${meal.strCategory}</h3>
     <h3>Recipes :</h3>

   <ul class="list-unstyled d-flex flex-wrap g-3">
       ${ingredients}           
   </ul>
   <h3>Tags :</h3>
   <ul class="list-unstyled d-flex flex-wrap g-3">
     ${tagsSrt}    
   </ul>
<a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
<a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
  </div>
   `
   rowData.innerHTML = cartona
}

function showSearchInputs(){
   searchData.innerHTML= `
  
  <div class="row py-4">
    <div class="col-md-6">
      <input  onkeyup="SearchByName(this.value)" type="text" class="form-control bg-transparent text-center text-white border-top-0 border-start-0 border-end-0 rounded-0"  placeholder="Search by Name" name="" id="">
    </div>
    <div class="col-md-6">
      <input onkeyup="SearchByFLitter(this.value)"  maxlength="1" type="text" class="form-control  bg-transparent text-center  text-white  border-top-0 border-start-0 border-end-0  rounded-0"  placeholder="Search by First Litter" name="" id="">
    </div>
  </div>
 `
 rowData.innerHTML =""
}


async function SearchByName(term) {
   $(".inner-loading-screen").fadeIn(300)

   let response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${term}`)
   response = await response.json();
   response.meals? DisplayData(response.meals):DisplayData([])
   $(".inner-loading-screen").fadeOut(300)

}

async function SearchByFLitter(term) {
   $(".inner-loading-screen").fadeIn(300)

   term == "" ? term= "a" : "" ;
   let response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${term}`)
   response = await response.json();
   response.meals? DisplayData(response.meals):DisplayData([])
   $(".inner-loading-screen").fadeOut(300)

}



function showContacts(){
   rowData.innerHTML=  `
   <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
   <div class="container w-75 py-5 text-center">
     <div class="row g-4">
       <div class="col-md-6">
         <input id="nameInput"  onkeyup="inputsValidation()" type="text" class="form-control"  placeholder="Enter Your Name" id="">
        <div id="nameAlert" class="alert alert-danger    w-100  mt-2 d-none">  
           special characters and numbers not allowed
        </div>
        </div>
       <div class="col-md-6">
          <input id="emailInput"  onkeyup="inputsValidation()" type="email" class="form-control"  placeholder="Enter Your Email" id="">
          <div id="emailAlert" class="alert alert-danger  w-100  mt-2 d-none">  
              email not valid *example @yyy.zzz
         </div>
         </div>
       <div class="col-md-6">
         <input id="phoneInput"  onkeyup="inputsValidation()" type="number" class="form-control"  placeholder="Enter Your Phone" id="">
        
         <div id="phoneAlert" class="alert alert-danger   w-100  mt-2 d-none">  
             Enter valid phone number
        </div>
       
    </div>
       <div class="col-md-6">
         <input id="ageInput"  onkeyup="inputsValidation()" type="number" class="form-control"  placeholder="Enter Your Age" id="">
       
         <div id="ageAlert" class="alert alert-danger   w-100  mt-2 d-none">  
           Enter valid age
        </div>
       </div>
       <div class="col-md-6">
         <input id="PasswordInput"   onkeyup="inputsValidation()"  type="password" class="form-control"  placeholder="Enter Your Password" >
         <div id="passwordAlert" class="alert alert-danger  w-100  mt-2 d-none">  
           Enter valid password*minimum  eight charactrs ,at least one letter and one number.
         </div>
       
       </div>
       <!-- <div class="col-md-6">
         <input id="repasswordInput"  onkeyup="inputsValidation()" type="password" class="form-control"  placeholder="Repassword" id="">
       <div id="repasswordAlert" class="alert alert-danger d-none w-100  mt-2">  
           Enter valid repassword.
         </div>
       </div> -->
     </div>
     <button disabled  id="submitBtn" class="btn btn-outline-danger mt-3 px-2">Submit</button>
   </div>
 </div> `
 
 submitBtn = document.getElementById("submitBtn")


 document.getElementById("nameInput").addEventListener("focus",()=>{
   nameInputTouched=true;
 })
 document.getElementById("emailInput").addEventListener("focus",()=>{
   emailInputTouched=true;
 })
  document.getElementById("phoneInput").addEventListener("focus",()=>{
   phoneInputTouched=true;
 })
  document.getElementById("ageInput").addEventListener("focus",()=>{
   ageInputTouched=true;
 })
document.getElementById("PasswordInput").addEventListener("focus",()=>{
   passwordInputTouched=true ;
})
 }

 let nameInputTouched =false;   
 let emailInputTouched =false;   
 let phoneInputTouched =false;   
 let ageInputTouched =false;   
 let passwordInputTouched =false;   




function inputsValidation(){
 if(nameInputTouched){
   if(namevalidation()){ 
   document.getElementById("nameAlert").classList.replace("d-block","d-none")
}else{
   document.getElementById("nameAlert").classList.replace("d-none" ,"d-block")
}}
  


if(emailInputTouched){
if(emailvalidation()){ 
   document.getElementById("emailAlert").classList.replace("d-block","d-none")
}else{
   document.getElementById("emailAlert").classList.replace("d-none" ,"d-block")
}}

if(phoneInputTouched){
if(phonevalidation()){ 
   document.getElementById("phoneAlert").classList.replace("d-block","d-none")
}else{
   document.getElementById("phoneAlert").classList.replace("d-none" ,"d-block")
}}
if(ageInputTouched){
if(agevalidation()){ 
   document.getElementById("ageAlert").classList.replace("d-block","d-none")
}else{
   document.getElementById("ageAlert").classList.replace("d-none" ,"d-block")
}}

if(passwordInputTouched){
if(Passwordvalidation()){ 
   document.getElementById("passwordAlert").classList.replace("d-block","d-none")
}else{
   document.getElementById("passwordAlert").classList.replace("d-none" ,"d-block")
}}

if(namevalidation()&&
   emailvalidation()&&
   phonevalidation()&&
   agevalidation()&&
   Passwordvalidation()
){

   submitBtn.removeAttribute("disabled")

   }
else{
  submitBtn.setAttribute("disabled",true)
} 

}

function namevalidation(){
 return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
} 
function emailvalidation(){
   return ( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))

  
} 
 function phonevalidation(){
   return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
 } 

function agevalidation(){
   return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
  } 


  function Passwordvalidation(){
   return (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/.test(document.getElementById("PasswordInput").value))
  } 

//   function rePasswordvalidation(){
//    return document.getElementById("rePasswordInput").value == document.getElementById("PasswordInput").value
//   } 


 
