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
(function () {
    let headers = document.querySelectorAll(".header");
    headers.forEach(header => {
        header.innerHTML = String.raw`<div class="logo-with-text-container">
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
        header.insertAdjacentHTML('afterend', String.raw`<section class="empty-header-place"></section>`);
    });

    let footers = document.querySelectorAll(".footer");
    footers.forEach(footer => footer.innerHTML = String.raw`<p>Copyright. 2020. ID: 00010837</p>`);
})();






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
    window.addEventListener('scroll', () => setTimeout(checkScroll, 1000 / 15));
})();

// this function is needed to play articles animations at correct time 
// when 200px or more of invisible first article are in viewport we add animate class and make all articles visible 
// we make it one time animation by removing event listener at the end
(function () {
    let elements = document.querySelectorAll('.article');
    if (elements.length === 0)
        return;
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

(function () {
    class VehicleGridItem {
        constructor(name, price, description, imgUrl) {
            this.name = name;
            this.price = price;
            this.description = description;
            this.imgUrl = imgUrl;
        }
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    buildHtmlForVehicle = function (vehicle) {
        let vehicleHtml = String.raw`<div class="vehicle-container">`
        vehicleHtml += String.raw`<p class="vehicle-name">` + vehicle.name + "</p>";
        vehicleHtml += String.raw`<p class="vehicle-price">` + "Starting at $" + numberWithCommas(vehicle.price) + "</p>";
        vehicleHtml += String.raw`<p class="vehicle-short-description">` + vehicle.description + "</p>";
        vehicleHtml += String.raw`<img src="` + vehicle.imgUrl + String.raw`" alt="` + vehicle.name + "\"></div>";
        return vehicleHtml;
    };

    let vehicles = [
        new VehicleGridItem(" A-Class Sedan", 33650, "An entirely new class of Mercedes-Benz that sets a new standard for small sedans.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/a/all-vehicles/2021-A220-SEDAN-AVP-DR.png`),
        new VehicleGridItem(" GLA SUV", 36230, "A true premium compact SUV with dramatic styling", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/gla/all-vehicles/2021-GLA250-AMG-LINE-SUV-AVP-DR.png`),
        new VehicleGridItem(" CLA Coupe", 37850, "An entirely new seductive style at an even more irresistible price.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/cla/all-vehicles/2021-CLA250-COUPE-AVP-DR.png`),
        new VehicleGridItem(" GLB SUV", 38050, "An ideal blend of space, capability, technology and comfort.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/glb/all-vehicles/2021-GLB250-SUV-AVP-DR.png`),
        new VehicleGridItem(" C-Class Sedan", 41600, "A stylish performer that embodies sophistication and intelligence.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/c/sedan/all-vehicles/2021-C300-SEDAN-AVP-DR.png`),
        new VehicleGridItem(" GLC SUV", 43200, "It's more than a new name. It's the next generation of the SUV.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/glc/suv/all-vehicles/2021-GLC-SUV-AVP-DR.png`),
        new VehicleGridItem(" C-Class Coupe", 47200, "Bold styling, sporty performance and competitive spirit in two doors.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/c/coupe/all-vehicles/2021-C300-COUPE-AVP-DR.png`),
        new VehicleGridItem(" SLC Roadster", 49950, "A compact two-seater with retractable hardtop for driving enthusiasts.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/slc/all-vehicles/2020-SLC300-AMG-LINE-ROADSTER-AVP-DR.png`),
        new VehicleGridItem(" GLC Coupe", 51650, "Sporty coupe styling with SUV utility.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/glc/coupe/all-vehicles/2021-GLC300-4M-COUPE-AVP-DR.png`),
        new VehicleGridItem(" GLC SUV", 51900, "It's more than a new name. It's the next generation of the SUV.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/all-vehicles/2018-GLC-SUV-AV-LN.png`),
        new VehicleGridItem(" E-Class Sedan", 54250, "Distinctive styling, class-leading safety and trailblazing technology.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/e/sedan/all-vehicles/2021-E350-SEDAN-AVP-DR.png`),
        new VehicleGridItem(" C-Class Cabriolet", 54700, "A nimble and elegant soft-top convertible, for driving all year round.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/c/cab/all-vehicles/2021-C300-CABRIOLET-AVP-DR.png`),
        new VehicleGridItem(" GLE SUV", 54750, "The next generation of safety and style in a luxury SUV.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/gle/suv/all-vehicles/2021-GLE-SUV-AVP-DR.png`),
        new VehicleGridItem(" E-Class Coupe", 64950, "An alluring silhouette, with the performance and amenities to match.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/e/coupe/all-vehicles/2021-E-COUPE-AVP-DR.png`),
        new VehicleGridItem(" E-Class Wagon", 67600, "The quintessential luxury wagon has versatility and innovations to spare.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/e/wagon/all-vehicles/2021-E-WAGON-AVP-DR.png`),
        new VehicleGridItem(" CLS Coupe", 70300, "A powerful expression of individuality in a visionary four-door coupe.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/cls/all-vehicles/2021-CLS450-COUPE-AVP-DR.png`),
        new VehicleGridItem(" E-Class Cabriolet", 71950, "All-season softtop convertible, with classic styling and comfort for four.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/e/cab/all-vehicles/2021-E450-CABRIOLET-AVP-DR.png`),
        new VehicleGridItem(" GLS SUV", 76000, "Exceptional luxury and road manners, with seating for seven.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/gls/all-vehicles/2021-GLS450-SUV-AVP-DR.png`),
        new VehicleGridItem(" GLE Coupe", 76500, "Pure sports coupe response, in a genuine SUV.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/gle/coupe/all-vehicles/2021-AMG-GLE53-COUPE-AVP-DR.png`),
        new VehicleGridItem(" SL Roadster", 91000, "Legendary two-seater engineered for enjoying open road and air alike.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/sl/all-vehicles/2020-SL450-ROADSTER-DR.png`),
        new VehicleGridItem(" S-Class Sedan", 94250, "A leader in luxury, performance and safety - and of an entire industry.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/s/sedan/all-vehicles/2020-S450-SEDAN-AVP-DR.png`),
        new VehicleGridItem(" Mercedes-AMG GT 4-door Coupe", 99950, "Four seats on the fast track.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/gt/4-door/all-vehicles/2020-AMG-GT53-4DR-COUPE-AVP-DR.png`),
        new VehicleGridItem(" Mercedes-AMG GT", 115900, "The highest level of luxury paired with an extreme level of performance.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/gt/coupe/all-vehicles/2020-AMG-GTC-AVP-DR.png`),
        new VehicleGridItem(" Mercedes-AMG GT", 127900, "Open-air driving taken to a bold new level of performance.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/all-vehicles/2018-AMG-GT-C-ROADSTER-AV-LN.png`),
        new VehicleGridItem(" S-Class Coupe", 130150, "Intricately intimate: A handcrafted haven for four.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/s/coupe/all-vehicles/2020-S560-AMGLINE-COUPE-AVP-DR.png`),
        new VehicleGridItem(" G-Class SUV", 130900, "Extraordinary off-road ability meets handcrafted luxury and iconic style.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/g/all-vehicles/2020-G550-SUV-AVP-DR.png`),
        new VehicleGridItem(" S-Class Cabriolet", 138600, "The convertible S-Class is reborn: A grand opening for a new day.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/s/cabriolet/all-vehicles/2020-S560-CABRIOLET-AVP-DR.png`),
        new VehicleGridItem(" Mercedes-Maybach GLS SUV", 160500, "The new height of luxury.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my21/gls-maybach/all-vehicles/2021-MAYBACH-GLS-SUV-AVP-DR.png`),
        new VehicleGridItem(" Mercedes-Maybach S-Class", 173000, "Like a private jet for the road, an experience beyond first class.", String.raw`https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/s/maybach/all-vehicles/2020-S560-MAYBACH-AVP-DR.png`)
    ];


    let vehiclesContainer = document.querySelector("#vehicles-container");
    if (vehiclesContainer === null) {
        return;
    }

    vehicles.forEach(vehicle => {
        let vehicleHtml = buildHtmlForVehicle(vehicle);
        vehiclesContainer.innerHTML += vehicleHtml;
    });
})();
