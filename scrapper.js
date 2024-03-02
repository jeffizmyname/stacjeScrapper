const puppeteer = require("puppeteer");
const https = require("https");
const fs = require("fs");

async function getImageLink() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(
            "https://www.bazakolejowa.pl/index.php?dzial=stacje&id=-1"
        );

        if(page.url() === "https://www.bazakolejowa.pl/index.php") await browser.close()
        const idPattern = /id=(\d+)/;
        const match = page.url().match(idPattern);
        const id = match[0].split("=")[1]

        await page.goto(
            `https://www.bazakolejowa.pl/index.php?dzial=stacje&id=${id}&ed=0&okno=galeria`
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

        // textContent2.forEach((link, i) => {
        //     const imageName = `img/${i+1}.jpg` 
        //     const file = fs.createWriteStream(imageName)
        //     https
        //         .get(link, (response) => {
        //             response.pipe(file)

        //             file.on("finish", () => {
        //                 file.close()
        //                 console.log(`Image downloaded as ${imageName}`)
        //             });
        //         })
        //         .on("error", (err) => {
        //             fs.unlink(imageName)
        //             console.error(`Error downloading image: ${err.message}`)
        //         });
        // });
        await browser.close();
        return textContent2
        
};

module.exports = { getImageLink };
//addons/tempbases/thumbs/1036/1286388805-1731.jpg
//foto/1036/1286388805-1731.jpg
