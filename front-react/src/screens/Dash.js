const url = "http://localhost:8500";


function Dash() {

    async function getPedido() {  
        const responseGet = await fetch(`${url}/teste`);
        const labelData = await responseGet.json();
        console.log(labelData)
    }

    return(
        <div>
            orders
            <button // clean input fields
                onClick={getPedido}
                >Get
            </button>
        </div>
    )
};

export default Dash;