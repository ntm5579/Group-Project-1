const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

function buttonBuilder(targetList, id, name) {
    targetList = document.getElementById(targetList);
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerHTML = name;
    if (targetList.id === "characterList") {
        a.href = `/character.html?id=${id}`;
    }
    else {
        a.href = `/film.html?id=${id}`;
    }
    li.appendChild(a);
    targetList.appendChild(li);

}

function updateHTML(fetched, append) {
    if (append === "") {
        let planet = fetched;
        console.log(planet);
        document.getElementById("title").innerHTML = planet["name"];
        document.getElementById("name").innerHTML = planet["name"];
        //document.getElementById("title").innerHTML = planet["name"];
    }
    else {
        if (append === "/characters") {
            let characters = fetched;
            for (key in Object.keys(characters)) {
                let character = characters[key];
                buttonBuilder("characterList", character["id"], character["name"]);
            }
        }
        else {
            if (append === "/films") {
                let films = fetched;
                for (key in Object.keys(films)) {
                    let film = films[key];
                    buttonBuilder("filmList", film["id"], film["title"]);
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
