let links = {
    "Home": "/",
    "Bucket List": {
        "Q1": "/bucketlist/q1",
        "Q2": "/bucketlist/q2",
        "Q3": "/bucketlist/q3",
        "Q4": "/bucketlist/q4"
    },
    "Community Service": "/service",
    "Awards": "/awards",
    "Projects": "/projects",
    "Work History": "/work",
    "FRC Vendordeps": {
        "TurboLogger": "/deps/turbologger"
    },
    "Minecraft Plugins": {
        "ClearLag": "/plugins/clearlag",
        "ItemLocker": "/plugins/itemlocker",
        "WorkstationCommands": "/plugins/workstationcommands"
    },
    "CTFs": {
        "TribeCTF 2025": "/ctfs/tribectf_2025"
    },
    "Resume": "/resume.pdf"
}

let navbar = document.getElementById("navbar");

// Parses the json object to load links
// Defined as a function so it can recursively call itself to handle submenus
function parseMenu(json) {
    let menu = document.createElement("ul");

    // Iterating over the keys in the json
    for (key in json) {
        // Creating the list entry
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerText = key;

        menu.appendChild(li);
        li.appendChild(a);

        // Handling links
        if (typeof json[key] === "string") {
            a.href = json[key];
            continue;
        }

        // Handling submenus
        let span = document.createElement("span", );
        span.innerHTML = "&blacktriangleright;";
        span.classList.add("arrow");

        li.classList.add("has-submenu");

        a.href = "#";
        a.classList.add("submenu-toggle");
        a.appendChild(span);

        // Creating the submenu
        let submenu = parseMenu(json[key]);
        submenu.classList.add("submenu");

        li.appendChild(submenu);
    }

    return menu;
}

// Starting the menu parsing!
navbar.appendChild(parseMenu(links));

// Opens the submenu when clicked
let submenuBtns = document.getElementsByClassName("submenu-toggle");

for (let btn of submenuBtns) {
    console.log(btn);
    btn.addEventListener("click", evt => {
        evt.preventDefault();
        btn.parentElement.classList.toggle("open");

        // let elem = Array.from(btn.parentElement.children).filter(child => child.tagName.toLowerCase() === "ul")[0];
        // elem.style.maxHeight = "300px";
        // elem.style.transition = "max-height 0.3s ease-in";

        // btn.children[0].style.transform = "rotate(90deg)";
    });
}

// Closing the submenus if something else on the page is clicked
document.addEventListener("click", evt => {
    for (let btn of submenuBtns) {
        let parent = btn.parentElement;
        if (!parent.contains(evt.target)) parent.classList.remove("open");
    }
});
