const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

function buttonBuilder(targetspan, id, name, append = "") {
    let span = document.getElementById(targetspan);
    let a = document.createElement("a");
    let button = document.createElement("button");
    a.innerHTML = name;
    if (targetspan === "characterSpan") {
        a.href = `http://localhost:3000/character.html?id=${id}`
    }
    else {
        a.href = `http://localhost:3000/film.html?id=${id}`
    }
    button.appendChild(a);
    span.appendChild(button);

}

function updateHTML(fetched, append) {
    if (append === "") {
        let planet = fetched;
        document.getElementById("title").innerHTML = planet["name"];
    }
    else {
        if (append === "/characters") {
            let characters = fetched;
            for (key in Object.keys(characters)) {
                let character = characters[key];
                buttonBuilder("characterSpan", character["id"], character["name"]);
            }
        }
        else {
            if (append === "/films") {
                let films = fetched;
                for (key in Object.keys(films)) {
                    let film = films[key];
                    buttonBuilder("filmSpan", film["id"], film["title"]);
                }
            }
            else {
                throw Error("Not a valid append");
            }
        }
    }
    //console.log(fetched);
}


async function getData(id, append = "") {
    const fetched = await fetch(`http://localhost:9001/api/planets/${id}${append}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                throw new Error('No more data to fetch!');
            }
            return data;
        })
        .catch(error => {
            console.error('Error 1:', error);
            alert('No more data to fetch! Starting over from the beginning.');
            page = 1;
            getData();
        });
    try {
        updateHTML(fetched, append);  // Update HTML after data is fetched
    } catch (error) {
        console.error('Error 2:', error);
    }

}


const planets = getData(id);
const characters = getData(id, "/characters");
const films = getData(id, "/films");
