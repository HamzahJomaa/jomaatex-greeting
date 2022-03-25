const jimp = require('jimp');

async function main() {
    const image = await jimp.read('./ecard.png');
    const font = await jimp.loadFont(jimp.FONT_SANS_128_WHITE);

    image.print(font, 10, 1500, 'Hello World!').write("in01.png");
}

main().then(data=>{
    console.log(data)
}).catch(err=>{
    console.error(err)
})