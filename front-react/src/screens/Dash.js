const url = "http://localhost:8500";


function Dash() {

    async function getPedido() {  
        const responseGet = await fetch(`${url}/pedidos`);
        const orders = await responseGet.json();
        console.log(orders)
    }

    return(
        <div className="Dashboard" >
            orders
            <button // clean input fields
                onClick={getPedido}
                >Get
            </button>
        </div>
    )
};

export default Dash;