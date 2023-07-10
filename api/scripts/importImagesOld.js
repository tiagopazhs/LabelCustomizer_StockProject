const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parseString, parseStringPromise } = require('xml2js');
const parse = require('csv-parser');

const apiKey = process.env.API_KEY

async function processCSV() {
    const csvFilePath = '../template/product_images.csv'

    const fileData = fs.readFileSync(csvFilePath, 'utf8');
    const parsedData = fileData.split("\r\n")

    for (let index = 0; index < parsedData.length; index++) {
       
        const values = (parsedData[index])?.split(';');
        if(!values){
            break;
        }
        const item = {
            codigo: values[0],
            image: values[1],
        };

        try {
            const response = await axios.get(`https://bling.com.br/b/Api/v2/produto/${item.codigo}?apikey=${apiKey}&imagem=S`);
            const xml = response.data;

            parseString(xml, async (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
let product = result.retorno.produtos[0].produto[0]
delete product.imagem


                const dataToSend = {
                    name: row.name,
                    email: row.email,
                    // Extrair dados relevantes do objeto result
                    // e adicioná-los ao objeto dataToSend
                };

                const formData = new FormData();
                formData.append('name', dataToSend.name);
                formData.append('email', dataToSend.email);

                const postResponse = await axios.post(`https://bling.com.br/b/Api/v2/produto/PH325`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(postResponse.data);
                // Faça algo com a resposta do POST
            });
        } catch (error) {
            console.error(error?.message || error);
        }

    }
}

processCSV()