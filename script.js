const addEventOnElements = function(elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function() {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    navbar.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function() {
    if (window.scrollY >= 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

    const sliderContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    let currentSlidePos = 0;

    const moveSliderItem = function() {
        sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    }

    const slideNext = function() {
        const slideEnd = currentSlidePos >= totalSlidableItems;

        if (slideEnd) {
            currentSlidePos = 0;
        } else {
            currentSlidePos++;
        }

        moveSliderItem();
    }

    sliderNextBtn.addEventListener("click", slideNext);
    const slidePrev = function() {
        if (currentSlidePos <= 0) {
            currentSlidePos = totalSlidableItems;
        } else {
            currentSlidePos--;
        }

        moveSliderItem();
    }

    sliderPrevBtn.addEventListener("click", slidePrev);

    const dontHaveExtraItem = totalSlidableItems <= 0;
    if (dontHaveExtraItem) {
        sliderNextBtn.style.display = 'none';
        sliderPrevBtn.style.display = 'none';
    }

    currentSlider.addEventListener("wheel", function(event) {
        if (event.shiftKey && event.deltaY > 0) slideNext();
        if (event.shiftKey && event.deltaY < 0) slidePrev();
    });

    window.addEventListener("resize", function() {
        totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
        totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

        moveSliderItem();
    });

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }


// La recuperation des elements 
const form = document.querySelector("#form");
const username = document.querySelector('#username');
const username2 = document.querySelector('#username2');
const email = document.querySelector('#email');
const adress = document.querySelector('#adress');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// Evenements
form.addEventListener('submit', e => {
    e.preventDefault();

    form_verify();
})

// Fonstions
function form_verify() {
    // Obtenir toutes les valeurs des inputs
    const userValue = username.value.trim();
    const user2Value = username2.value.trim();
    const emailValue = email.value.trim();
    const pwdValue = password.value.trim();
    const pwd2Value = password2.value.trim();


    // Username verify
    if (userValue === "") {
        let message = "First Name ne peut pas être vide";
        setError(username, message);
    } else if (!userValue.match(/^[a-zA-Z]/)) {
        let message = "First Name doit commencer par une lettre";
        setError(username, message)
    } else {
        let letterNum = userValue.length;
        if (letterNum < 3) {
            let message = "First Name doit avoir au moins 3 caractères";
            setError(username, message)
        } else {
            setSuccess(username);
        }
    }

    // Username2 verify
    if (user2Value === "") {
        let message = "Last Name ne peut pas être vide";
        setError(username2, message);
    } else if (!user2Value.match(/^[a-zA-Z]/)) {
        let message = "Last Name doit commencer par une lettre";
        setError(username2, message)
    } else {
        let letterNum = user2Value.length;
        if (letterNum < 3) {
            let message = "Last Name doit avoir au moins 3 caractères";
            setError(username2, message)
        } else {
            setSuccess(username2);
        }
    }

    // email verify
    if (emailValue === "") {
        let message = "Email ne peut pas être vide";
        setError(email, message);
    } else if (!email_verify(emailValue)) {
        let message = "Email non valide";
        setError(email, message);
    } else {
        setSuccess(email)
    }

    // password verify
    if (pwdValue === "") {
        let message = "Le password ne peut pas être vide";
        setError(password, message)
    } else if (!password_verify(pwdValue)) {
        let message = "Le mot de passe est trop faible (8 à 12 caractères)";
        setError(password, message)
    } else {
        setSuccess(password);
    }
    // pwd confirm
    if (pwd2Value === "") {
        let message = "Le password confirm ne peut pas être vide";
        setError(password2, message)
    } else if (pwdValue !== pwd2Value) {
        let message = "Les mot de passes ne correspondent pas";
        setError(password2, message)
    } else {
        setSuccess(password2)
    }
}

function setError(elem, message) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');

    // Ajout du message d'erreur
    small.innerText = message

    // Ajout de la classe error
    formControl.className = "form-control error";
}

function setSuccess(elem) {
    const formControl = elem.parentElement;
    formControl.className = 'form-control success'
}

function email_verify(email) {
    /*
    * r_rona.22-t@gmail.com
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    */
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}

function password_verify(passeword) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(passeword);
}

/*date*/
$(function() {
    $("#datepicker").datepicker();
});
$(document).ready(function() {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function() {
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });
});


/* PP */
$(document).ready(function() {


    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function() {
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });

});