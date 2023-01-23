// Check If There is Local Storage Color Option
let mainColor =localStorage.getItem("color_option"); 
if(mainColor !== null){

    // console.log('Local Storage Is Not Empty! You Can Set It On Root Now');
    document.documentElement.style.setProperty('--main-color',mainColor);

    // Remove Active Class From All All color List Item 
    document.querySelectorAll(".colors_list li").forEach(element => {
        element.classList.remove("active"); 

        // Add Active Class On Element With Data_Color === Local Storage Item

        if(element.dataset.color === mainColor){
            // Add Active Class
            element.classList.add("active");
        }
    });


}

// Random Background Option
let backgroundOption = true;

// Variable to Control Backgroud Interval
let backgroundInterval;

// Check if there is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");


// Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null){

    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    // Remove Active Span From All Class
    document.querySelectorAll(".random_background span").forEach(element =>{
        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true'){
        document.querySelector(".yes").classList.add("active");
    }else{
        document.querySelector(".no").classList.add("active");
    }
}

// Click On Toogle Setting Gear
document.querySelector(".toggle-settings .fa-cog").onclick = function(){
    // Toggle Class fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");
    
    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings_box").classList.toggle("open");
};

// Switch Color
const colorsLi = document.querySelectorAll(".colors_list li");

// Click On List Items
colorsLi.forEach(li => {

    // Click On every List Items
    li.addEventListener("click", (e) => {
        console.log(e.target.dataset.color);

        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handdleActive(e);
    });
});

// Switch Random Backgroud Option
const randomBackgroundElement = document.querySelectorAll(".random_background span");

// Loop On All Spans
randomBackgroundElement.forEach(span => {

    // Click On every Span
    span.addEventListener("click", (e) => {

        handdleActive(e);
        
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);

        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Selecting Landing Page Element
let landingPage = document.querySelector(".landing_page");

//Get Array Of Images
let imgArray = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

// Function To Randomize Imgs
function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            //Get Random Number
            let randomNomber = Math.floor(Math.random() * imgArray.length);
        
            //Change Backgroung Image URL
            landingPage.style.backgroundImage = 'url("images/' + imgArray[randomNomber] + '")';
        }, 1500);
    }
}

randomizeImgs();


// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill_box .skill-progress span");

        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        });
        
    }
};


// Create Popup with Images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Craete Overlay Element
        let overlay = document.createElement("div");

        // Add Class To Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay to the Body
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add class to the Popup box
        popupBox.className = 'popup-box';

        if(img.alt !== null){
            // Create Heading
            let imgHeading = document.createElement("h3");

            // Craete teat for Heading
            let imgText = document.createTextNode(img.alt);

            // Append the text to the Heading
            imgHeading.appendChild(imgText);

            // Append the Heading to the Popup box
            popupBox.appendChild(imgHeading);

        }

        // Create the Image
        let popupImg = document.createElement("img");

        // Set Image Source
        popupImg.src = img.src;
        
        // Add Image to Popup Box
        popupBox.appendChild(popupImg);

        // Append the Popup box to the Body
        document.body.appendChild(popupBox);

        // Craetw the Close Span
        let closeButton = document.createElement("span");

        // Create the close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text to Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class to Close Button
        closeButton.className = 'close-button';

        // Add Close Button to the Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener("click", function(e){
    if(e.target.className == 'close-button'){
        // Remove the Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements){
    elements.forEach(ele => {
        ele.addEventListener("click", (e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
        });
    });
});
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handdle Active State
function handdleActive(e){
    // Remove Active Class From All Childrens 
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active"); 
    });
    
    // Add Active Class On Self
    e.target.classList.add("active");
}

// Bullets Options
let bulletsSpan = document.querySelectorAll(".bullets_option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let localBulletsItem = localStorage.getItem("bullets-option");

if(localBulletsItem !== null){
    bulletsSpan.forEach(span =>{
        span.classList.remove("active");
    });
}

if(localBulletsItem === 'block'){
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets_option .yes").classList.add("active");
}else{
    bulletsContainer.style.display = 'none';
    document.querySelector(".bullets_option .no").classList.add("active");
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", "block");
        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", "none");
        }
    handdleActive(e);
    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function(){
    //localStorage.clear();
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");

    // Reload Window 
    window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){
    // Stop Propagation
    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" on Links
    tLinks.classList.toggle("open");
};

// Click on Anywhere outside Menu and Toggle Button
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks){

        // Check if Menu Is Open
        if(tLinks.classList.contains("open")){

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" on Links
            tLinks.classList.toggle("open");
        }
    }
});

// Stop Propagation on Menu
tLinks.onclick = function(e){
    e.stopPropagation();
}

const halve = function(n) {
    return n / 2;
    };
    let n = 10;
    console.log(halve(100));
    // → 50
    console.log(n);
    // → 10

    const hummus = function(factor) {
        const ingredient = function(amount, unit, name) {
            let ingredientAmount = amount * factor;
            if (ingredientAmount > 1) {
            unit += "s";
            }
            console.log(`${ingredientAmount} ${unit} ${name}`);
        };
        ingredient(1, "can", "chickpeas");
        ingredient(0.25, "cup", "tahini");
        ingredient(0.25, "cup", "lemon juice");
        ingredient(1, "clove", "garlic");
        ingredient(2, "tablespoon", "olive oil");
        ingredient(0.5, "teaspoon", "cumin");
    };

let launchMissiles = function() {
    missileSystem.launch("now");
    };
    if (safeMode) {
    launchMissiles = function() {/* do nothing */};
    }

function square(x) {
    return x * x;
    }

const power = (base, exponent) => { // arrow function
    let result = 1;
    for (let count = 0; count < exponent; count++) {
    result *= base;
    }
    return result;
};

const square1 = (x) => { return x * x; };
const square2 = x => x * x;

const horn = () => { // have no parameters should have ()
    console.log("Toot");
};