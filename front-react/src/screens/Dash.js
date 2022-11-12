import React,{useEffect} from "react";
const url = "http://localhost:8500";



function Dash() {

    useEffect(() => {
        
        const myInterval = window.setInterval(function(){
            console.log('Puxar pedidos')
            getPedido()
          }, 20000);
        return () => clearInterval(myInterval);
      }, []);
    
    // clearInterval(myInterval)
    // const myInterval = window.setInterval(function(){
    //     console.log('This will run after 43 second!')
    //   }, 5000);
    
      
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       console.log('This will run after 1 second!')
    //     }, 1000);
    //     return () => clearTimeout(timer);
    //   }, []);

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