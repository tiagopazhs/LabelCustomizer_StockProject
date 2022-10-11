import React,{useState} from 'react';
import '../styles.css';
const url = "http://localhost:8500"

function Printer() {

    // Post requisition and call execute the printer procces in the backEnd
    async function postTrigger(url, type, data) {

        if (type === "POST" | type === "PUT") {
            return fetch(url, {
            method: type,
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
            })
            .then(res => {
                if (res.ok) { console.log("HTTP request successful", data) }
                else { console.log("HTTP request unsuccessful") }
                return res
            })
            .then(res => res.json())
            .then(data => data)
            .catch(error => error)
        }
    }

    // Set variables that will be used in input fields
    const [codePrinter, setCodePrinter] = useState('');
    const [descOnePrinter, setDescOnePrinter] = useState('');
    const [descTwoPrinter, setDescTwoPrinter] = useState('');
       

    // clean the input field's to make a
    async function cleanFields(){
        setCodePrinter('');
        setDescOnePrinter('');
        setDescTwoPrinter('');
    }

    // The enter key functio: Same in button printer
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            
                postTrigger(`${url}/procces`, "POST", {
                    "campoCod": codePrinter,
                    "campoDesc1": descOnePrinter,
                    "campoDesc2": descTwoPrinter});
                cleanFields()
        }
      }

    return(
        <div>
            <title>Customizador de etiquetas</title>
            <div id="mainPrinter">
                {/* <p id="loading">carregando...</p> */}
                <div className="topLane"></div>
                <div className="midLane">                            
                    <div id="box1">
                        <p>Codigo de barras</p>
                        <input id="input1" value={codePrinter} onChange={e => setCodePrinter(e.target.value)} size="40" maxLength="14"/>
                    </div>
                    <div id="box2">
                        <p>descrição 1</p>
                        <input id="input2" value={descOnePrinter} onChange={e => setDescOnePrinter(e.target.value)} type="text" size="40" />
                    </div>
                    <div id="box3">
                        <p>descrição 2</p>
                        <input id="input3" value={descTwoPrinter} onChange={e => setDescTwoPrinter(e.target.value)} onKeyDown={handleKeyDown} type="text" size="40" />
                    </div>
                </div>
                <div className="bottomLane" >
                    {/* <button onClick={()=>getPut(`${url}/procces`, "POST", { "campoCod": valueOfCode, "campoDesc1": "Interpig", "campoDesc2": "Jo"})} >send</button> */}
                    <button id="btnEnter" onClick={() => cleanFields()}
                        >Reiniciar
                    </button>
                    <button id="btnEnter" onClick={() => {
                        //Call the post function. parameters: url that server is running, requisition type, data to post
                        postTrigger(`${url}/procces`, "POST", {
                            "campoCod": codePrinter,
                            "campoDesc1": descOnePrinter,
                            "campoDesc2": descTwoPrinter});
                        //clean input fields
                        cleanFields()}}
                        >Imprimir
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Printer;


