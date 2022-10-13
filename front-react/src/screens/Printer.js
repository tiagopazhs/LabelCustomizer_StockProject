import printer from "../assets/computer-printer.png";
import settings from "../assets/gear.png";
import signIn from "../assets/signIn.png";
import sino from "../assets/sino.png";
import logoIs from "../assets/LogoIS.png";
import setaBaixo from "../assets/seta-para-baixo.png";
import search from "../assets/search.png";
import option from "../assets/option.png";
import landscape from "../assets/landscape.png";
import stagePrinter from "../assets/computerPrinter.png";
import setaLeft from "../assets/seta-esquerda.png";
import barCodeHistory from "../assets/barcodeWhite.png";
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

            <div className="body">
                <div className="mainPrinter">

                    <div className="navBarPrinter">
                        <div className="storeOptions">
                            <div className="logoCompany">
                                <img id="isIcon" src={logoIs} alt="icone da empresa pesquisada" />
                            </div>
                            <p className="companyName">INTER STORE</p>
                            <img id="setaBaixoIcon" src={setaBaixo} alt="icone lista suspensa" />
                        </div>
                        <div className="navBarActions" >
                            <input id="searchLabels" value={'Buscar no histórico de impressões'}></input>
                            <div className="divSearchIcon">
                                <img id="searchIcon" src={search} alt="icone pesquisar" style={{backgroundColor: 'white'}} />
                            </div>
                            <button id="btnNewPrinter" >Nova impressão</button>
                            <img id="optionIcon" src={option} alt="icone de opções" />
                        </div>
                    </div>

                    <div className="midLane"> 
                        <div className="stageInput">
                            <div className="stageInputLeft">
                                <div id="box1">
                                    <p>Código do produto</p>
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
                                    <p>Descrição superior</p>
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
                                    <p>Descrição inferior</p>
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
                            <div className="stageInputRight">
                                <p>Pré-visualização</p>
                                <img className="navBarIcons" id="landscapeIcon" src={landscape} alt="visualização de paisagem simbolizando campo vazio." />
                                <p>Quantidade</p>
                                <button>-</button>
                                <input></input>
                                <button>+</button>
                                <button
                                    id="btnInsert"
                                    onClick={() => {
                                        stageOfValidation()
                                    }}
                                    >inserir
                                </button>
                            </div>
                        </div>                           
                        <div className="stagePrinter">
                            <img id="stagePrinterIcon" src={stagePrinter} alt="imagem de impressora." />
                        </div>
                    </div>

                    <div className="footerBarPrinter" style={{boxShadow: '0px 0px 6px rgba(73, 87, 105, .24'}}>
                        <button // clean input fields
                            id="btnReset" 
                            onClick={() => cleanFields()}
                            >Reiniciar
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
                        <p>Total</p>
                        <p>0,00</p>
                    </div>
                </div>
                <div className="labelDash">
                    <div className="navBarPrinter">
                        <div className="navBarDash" >
                            <img id="setaLeftIcon" src={setaLeft} alt="icone de seta." />
                        </div>
                    </div>
                    <div className="midLane"> 
                        <div className="labelHistory">
                            <p>Produto</p>
                            <p>100068</p>
                            <img className="navBarIcons" id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                        </div>
                        <div className="labelHistory">
                            <p>Produto</p>
                            <p>100068</p>
                        <img className="navBarIcons" id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                        </div>
                        <div className="labelHistory">
                            <p>Produto</p>
                            <p>100068</p>
                        <img className="navBarIcons" id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                        </div>
                        <div className="labelHistory">
                            <p>Produto</p>
                            <p>10002</p>
                        <img className="navBarIcons" id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                        </div>
                        <div className="labelHistory">
                            <p>Produto</p>
                            <p>10002</p>
                        <img className="navBarIcons" id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                        </div>
                        <div className="labelHistory">
                            <p>Produto</p>
                            <p>10002</p>
                        <img className="navBarIcons" id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                        </div>
                    </div>
                    <div className="footerBarPrinter" style={{boxShadow: '0px 0px 6px rgba(73, 87, 105, .24'}}>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Printer;