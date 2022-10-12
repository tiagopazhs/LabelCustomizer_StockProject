import printer from "../assets/computer-printer.png";
import settings from "../assets/gear.png";
import signIn from "../assets/signIn.png";
import sino from "../assets/sino.png";
import React,{useState, useRef} from 'react';
import '../styles.css';
const url = "http://localhost:8500";

function Printer() {

    // Set variables that will be used in input fields
    const [codePrinter, setCodePrinter] = useState('');
    const [descOnePrinter, setDescOnePrinter] = useState('');
    const [descTwoPrinter, setDescTwoPrinter] = useState('');

    // Set variables that will be used in ref to move in fields
    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const thirdInput = useRef(null);
    
    // Move from input one to input two
    const moveToSecondInput = (event) => {
        if (event.key === 'Enter') {
            secondInput.current.focus();
        }
    }

    // Move from input two to input three
    const moveToThirdInput = (event) => {
        if (event.key === 'Enter') {
            thirdInput.current.focus();
        }
    }

    // Call the stage of user data same in the button insert
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            stageOfValidation()
        }
    }

    // Stage of user data validation in screen
    async function stageOfValidation() {
        console.log('it is working')
        console.log(codePrinter, descOnePrinter, descTwoPrinter)
    }

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
    
    // clean the input field's to reset the validation of data
    async function cleanFields(){
        setCodePrinter('');
        setDescOnePrinter('');
        setDescTwoPrinter('');
        firstInput.current.focus();
    }

    return(
        <div className="printerPage">
            <div className="navBar" style={{boxShadow: '1px 1px 9px #CCCDCD'}}>
                <span className="divPrinterIcon">
                    <img id="printerIcon" src={printer} alt="icone de impressora" />
                </span>
                <span className="divMidNavBar">
                    <a title="home">Home</a>
                    <a title="servicos">Serviços</a>
                    <a title="relatorios">Relatórios</a>
                    <a title="github">Github</a>
                </span>
                <span className="divRigthNavBar">
                    <img className="navBarIcons" id="sinoIcon" src={sino} alt="desc" />
                    <img className="navBarIcons" id="settingsIcon" src={settings} alt="botão de configurações" />
                    <img className="navBarIcons" id="signInIcon" src={signIn} alt="desc" />
                </span>
            </div>
            <div className="mainPrinter">
                {/* <p id="loading">carregando...</p> */}
                <div className="midLane">                            
                    <div id="box1">
                        <p>Codigo de barras</p>
                        <input
                            id="input1"
                            ref={firstInput} //referenciate a fiels for focus use
                            value={codePrinter}
                            onChange={e => setCodePrinter(e.target.value)} //save the type data in a variable
                            size="40"
                            maxLength="14"
                            onKeyDown={moveToSecondInput} //event executed when press enter
                        />
                    </div>
                    <div id="box2">
                        <p>descrição 1</p>
                        <input
                            id="input2"
                            ref={secondInput} //referenciate a fiels for focus use
                            value={descOnePrinter}
                            onChange={e => setDescOnePrinter(e.target.value)} //save the type data in a variable
                            type="text"
                            size="40" 
                            onKeyDown={moveToThirdInput} //event executed when press enter
                        />
                    </div>
                    <div id="box3">
                        <p>descrição 2</p>
                        <input
                            id="input3"
                            ref={thirdInput} //referenciate a fiels for focus use
                            value={descTwoPrinter}
                            onChange={e => setDescTwoPrinter(e.target.value)} //save the type data in a variable
                            type="text"
                            size="40"
                            onKeyDown={handleKeyDown} //event executed when press enter
                        />
                    </div>
                </div>
                <div className="bottomLane" >
                     <button // clean input fields
                        id="btnReset" 
                        onClick={() => cleanFields()}
                        >Reiniciar
                    </button>
                    <button
                        id="btnInsert"
                        onClick={() => {
                            stageOfValidation()
                        }}
                        >inserir
                    </button>
                    <button // Call the post function. parameters: url that server is running, requisition type, data to post & clean input fields
                        id="btnEnter" 
                        onClick={() => {
                        postTrigger(`${url}/procces`, "POST", {
                            "campoCod": codePrinter,
                            "campoDesc1": descOnePrinter,
                            "campoDesc2": descTwoPrinter});
                        cleanFields()}}
                        >Imprimir
                    </button>
                </div>
            </div>
            <div className="labelDash">
                Aqui está o label dash
            </div>
        </div>
    )
};

export default Printer;