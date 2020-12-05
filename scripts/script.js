(function () {
    //this function adds property with value in cookie and sets expiration time as given parameter days
    let setCookie = function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // values in cookies are stored as string in format varName=someValue; expireStr
    // this function helps us parse it, and comfortably get needed values
    let getCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    let alerted = getCookie("alerted");
    // if there is no alerted value cookie, or it is false, then we need to alert
    if (alerted === null || !alerted) {
        alert("Please, note, this is not an original Mercedes-Benz Website, this is just a task for university CW");
        setCookie("alerted", "true", 0.1);
    }
})();



// This piece of code pastes header into each element with class header
// I did this to remove duplication, because navbar(header) is same on each page
let headers = document.getElementsByClassName("header");
for (let i = 0; i < headers.length; i++) {
    headers[i].innerHTML = String.raw`<div class="logo-with-text-container">
                    <img src="images/logo.svg" alt="Mercedes logo" class="logo">
                    <img src="images/mercedes-benz-text.svg" alt="Mercedes-Benz" class="mercedes-benz-text">
                </div>
                <nav class="navbar">
                    <ul class="nav-list">
                        <li class="nav-item"">
                            <a href="index.html" class="nav-link" id="home-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="vehicles.html" class="nav-link">Vehicles</a>
                        </li>
                        <li class="nav-item">
                            <a href="design.html" class="nav-link">Design</a>
                        </li>
                        <li class="nav-item">
                            <a href="history.html" class="nav-link">History</a>
                        </li>
                    </ul>
                </nav>`;
}

//This piece of code will be executed if we are in main path, which is "/"
// We need to put active class on home link
if (window.location.pathname === "/") {
    document.getElementById("home-link").classList.add("active");
}

// This part of code addes "active" class to nav link on which we are currently located
// it gets it by window.location.pathname property
let links = document.getElementsByClassName("nav-link");
for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (window.location.pathname === "/" + link.getAttribute("href")) {
        link.classList.add("active");
    }
}


(function () {

    let doc = document.documentElement;
    let w = window;

    let prevScroll = w.scrollY || doc.scrollTop;
    let curScroll;

    //direction is like enum with 3 states of scrolling
    //0 - initial, 1 - up, 2 - down
    let direction = 0;
    let prevDirection = 0;

    let header = document.getElementsByClassName('header')[0];

    let checkScroll = function () {

        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
            direction = 2;
        }
        else if (curScroll < prevScroll) {
            direction = 1;
        }

        //if direction changed, we need to update header
        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
    };

    var toggleHeader = function (direction, curScroll) {
        // if going down for more than the height of the header, add class hide, which will hide the header
        if (direction === 2 && curScroll > window.getComputedStyle(header).height.replace("px", "")) {
            header.classList.add('hide');
            prevDirection = direction;
        }
        //else it is going up, and we need to show header, so just remove hide class
        else if (direction === 1) {
            header.classList.remove('hide');
            prevDirection = direction;
        }
    };

    // add event for 15 times per second
    window.addEventListener('scroll', () => setTimeout(checkScroll, 1000/15));
})();

// this function needed to play articles animations at correct time 
// when 200px or more of invisible first article are in viewport we add animate class and make all articles visible 
// we make it one time animation by removing event listener at the end
(function () {
    let elements = document.querySelectorAll('.article');   

    document.addEventListener('scroll', animate);

    function shouldAnimate(el) {
        const rect = el.getBoundingClientRect();
        return (
            window.innerHeight - rect.top >= 200
        );
    }

    function animate() {
        if (shouldAnimate(elements[0])) {
            elements.forEach(element => {
                element.classList.add("animate");
                element.style.visibility = "visible";
                document.removeEventListener('scroll', animate);
            });
        }
    }

})();
