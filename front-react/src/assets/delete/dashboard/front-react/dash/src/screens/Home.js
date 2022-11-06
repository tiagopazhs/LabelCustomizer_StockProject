const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const url = "https://bling.com.br/b"
const apiKey = "31504fef3824785bc4c7baabbf332d8d146b533eb7a517632ec18573ae351d3964353a70"


function Home() {

    async function getPedido() {  
        const responseGet = await fetch(`${url}/Api/v2/pedidos/page=1/json?apikey=${apiKey}`);
        const orders = await responseGet.json();

        // console.log(orders)

        return orders    
    }

    return(
        <div>
            orders
            <button // clean input fields
                onClick={() => getPedido()}
                >Get
            </button>
        </div>
    )
};

export default Home;