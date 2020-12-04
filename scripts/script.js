let headers = document.getElementsByClassName("header");
for (let i = 0; i < headers.length; i++) {
    headers[i].innerHTML = String.raw`<div class="logo-with-text-container">
                    <img src="images/logo.svg" alt="Mercedes logo" class="logo">
                    <img src="images/mercedes-benz-text.svg" alt="Mercedes-Benz" class="mercedes-benz-text">
                </div>
                <nav class="navbar">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="index.html" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="vehicles.html" class="nav-link">Vehicles</a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">Design</a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">History</a>
                        </li>
                    </ul>
                </nav>`;
}

let links = document.getElementsByClassName("nav-link");
console.log(links);
for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if(window.location.pathname === "/" + link.getAttribute("href")) {
        link.classList.add("active");
    }
}