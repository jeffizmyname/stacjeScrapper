const getStation = document.getElementById("getStation");

getStation.addEventListener("click", function () {
    fetch("/getImageLink")
        .then((response) => response.json())
        .then((data) => {
            console.log(data.imageLinks);

            data.imageLinks.forEach(link => {
                document.getElementById("galery").innerHTML += `<img src="${link}">`
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
