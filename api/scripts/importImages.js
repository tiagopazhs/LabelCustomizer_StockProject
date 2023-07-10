
const fs = require('fs');
const { Bling } = require('bling-erp-api')
const apiKey = process.env.API_KEY

async function processCSV() {
    const csvFilePath = '../template/product_images.csv'

    const fileData = fs.readFileSync(csvFilePath, 'utf8');
    const parsedData = fileData.split("\r\n")

    const blingConnection = new Bling(apiKey)

    for (let index = 0; index < parsedData.length; index++) {

        const values = (parsedData[index])?.split(';');
        if (!values || !values[0]            ) {
            break;
        }
        const item = {
            codigo: values[0],
            image: values[1],
        };
        try {
            const product = await blingConnection.produtos().find(item.codigo, { params: { imagem: "S" } })
            let images = product?.imagem?.map(c=> c.link)
            images.push(item.image)
            
            await blingConnection.produtos().update(item.codigo, { ...product, imagens: { url : images }})

        } catch (error) {
            console.error(error?.message || error);
        }
    }
}

processCSV()