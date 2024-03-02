const puppeteer = require("puppeteer");
const https = require("https");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        "https://www.bazakolejowa.pl/index.php?dzial=stacje&id=13&ed=0&okno=galeria&str=-1"
    );

    await page.waitForSelector("h2#obiektNazwa");

    const textContent = await page.evaluate(() => {
        const element = document.querySelector("h2#obiektNazwa");
        return element.textContent.trim();
    });

    console.log(textContent);

    await page.waitForSelector("div#galeriaObrazow");

    const textContent2 = await page.evaluate(() => {
        const divs = document.querySelectorAll("div#galeriaObrazow div a img")
        const contents = [];
        divs.forEach((div) => {
            contents.push(div.src.replace("addons/tempbases/thumbs", "foto"));
        });
        return contents;
    });

    console.log(textContent2);

    textContent2.forEach((link, i) => {
        const imageName = `img/${i+1}.jpg` 
        const file = fs.createWriteStream(imageName)
        https
            .get(link, (response) => {
                response.pipe(file)

                file.on("finish", () => {
                    file.close()
                    console.log(`Image downloaded as ${imageName}`)
                });
            })
            .on("error", (err) => {
                fs.unlink(imageName)
                console.error(`Error downloading image: ${err.message}`)
            });
    });

    await browser.close();
})();

//addons/tempbases/thumbs/1036/1286388805-1731.jpg
//foto/1036/1286388805-1731.jpg
