const getStation = document.getElementById("getStation");

getStation.addEventListener("click", function () {
    fetch("/getImageLink")
        .then((response) => response.json())
        .then((data) => {
            console.log(data.data.imageLinks);
            document.getElementById("galery").innerHTML = ""
            document.getElementById("stationName").innerHTML = data.data.name
            if(data.data.imageLinks == []){
                document.getElementById("galery").innerHTML += "<p>No images found.</p>"
            } else {
                data.data.imageLinks.forEach(link => {
                    document.getElementById("galery").innerHTML += `<img src="${link}">`
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
