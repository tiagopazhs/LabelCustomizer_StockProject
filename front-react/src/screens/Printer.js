import printer from "../assets/computer-printer.png";
import settings from "../assets/gear.png";
import signIn from "../assets/signIn.png";
import sino from "../assets/sino.png";
import logoIs from "../assets/LogoIS.png";
import logoMRV from "../assets/logo-mrv.png";
import search from "../assets/search.png";
import option from "../assets/option.png";
import landscape from "../assets/landscape.png";
import barCode from "../assets/barcode.png";
import stagePrinterImg from "../assets/computerPrinter.png";
import stagePrinter from "../assets/stagePrinter.png";
import stagePencil from "../assets/stagePencil.png";
import stageTrash from "../assets/stageTrash.png";
import setaLeft from "../assets/seta-esquerda.png";
import barCodeHistory from "../assets/barcodeWhite.png";
import React,{useState, useRef} from 'react';
import '../styles.css';
import Select from 'react-select';
const url = "http://localhost:8500";

function Printer() {

    // Data that will be used in dropdown list.
    const data = [
        {
            value: 1,
            text: <p className="companyName">MRV STORE</p>,
            icon: <div className="logoCompany"><img id="isIcon" src={logoMRV} alt="icone da empresa pesquisada" /></div>,
        },
        {
            value: 2,
            text: <p className="companyName">INTER STORE</p>,
            icon: <div className="logoCompany"><img id="isIcon" src={logoIs} alt="icone da empresa pesquisada" /></div>,
        },
    ];
        
    // Set variable that will be used in dropdown list. *Default value is one of the items
    const [selectedOption, setSelectedOption] = useState(data[1]);
    
    // handle onChange event of the dropdown
    const handleChange = e => {
        setSelectedOption(e);
    };

    // Set variables that will be used in input fields
    const [codePrinter, setCodePrinter] = useState('');
    const [descOnePrinter, setDescOnePrinter] = useState('');
    const [descTwoPrinter, setDescTwoPrinter] = useState('');

    // Set variables that will be used in ref to move in fields
    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const thirdInput = useRef(null);

    //Set variable of barcode in stage
    const [inStage, setInStage] = useState(landscape);
    const [qtyLabel, setQtyLabel] = useState('0,00');
    const [firstHistoryLabel, setFirstHistoryLabel] = useState('100068');
    const [inStagePrinter, setInStagePrinter] = useState('notInStage');

    //Set variable of barcode in insert
    const [codeInInsert, setCodeInInsert] = useState('');
    const [descTopInInsert, setDescTopInInsert] = useState('');
    const [descBottomInInsert, setDescBottomInInsert] = useState('');

    // Move from input one to input two and call the preview bar
    const moveToSecondInput = (event) => {
        console.log('here is my test', 'hi')

        if (event.key === 'Enter') {
            previewBar();
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

    // Change the preview img from landscape to a real barCode
    async function previewBar() {
        if (setCodePrinter === '') {
            setInStage(landscape);
            setQtyLabel('0,00');
            setFirstHistoryLabel('100068');
        } else {
            setInStage(barCode);
            setQtyLabel('3,00');
            setFirstHistoryLabel(codePrinter);
        }
    };

    // Change the printer img from printer to a Stage of user data validation in screen.
    async function stageOfValidation() {
        if (setCodePrinter === '') {
            setInStagePrinter('notInStage');
        } else {
            setInStagePrinter('inStage');
            setCodeInInsert(codePrinter);
            setDescTopInInsert(descOnePrinter);
            setDescBottomInInsert(descTwoPrinter);
        }
    };

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
        setInStagePrinter('notInStage');
        setCodePrinter('');
        setInStage(landscape);
        setQtyLabel('0,00');
        setFirstHistoryLabel('100068');
        firstInput.current.focus();
    }

    return(
        <div className="printerPage">
            <div className="navBar" style={{boxShadow: '1px 1px 9px #CCCDCD'}}>
                <span className="divPrinterIcon">
                    <img id="printerIcon" src={printer} alt="icone de impressora" />
                </span>
                <span className="divMidNavBar">
                    <p title="home">Home</p>
                    <p title="servicos">Serviços</p>
                    <p title="relatorios">Relatórios</p>
                    <p title="github">Github</p>
                </span>
                <span className="divRigthNavBar">
                    <img className="navBarIcons" id="sinoIcon" src={sino} alt="desc"/>
                    <img className="navBarIcons" id="settingsIcon" src={settings} alt="botão de configurações" />
                    <img className="navBarIcons" id="signInIcon" src={signIn} alt="desc" />
                </span>
            </div>

            <div className="body">
                <div className="mainPrinter" style={{boxShadow: '1px 1px 9px #CCCDCD'}}>

                    <div className="navBarPrinter" >
                        <div className="storeOptions" >
                            <Select 
                                id="dropDownNavBar"
                                defaultValue={selectedOption}
                                options={data}
                                onChange={handleChange}
                                // menuIsOpen
                                getOptionLabel={e => (
                                <div id="mainDropDown"  > 
                                    {e.icon}
                                    <span id="mainDropDownText"  >{e.text}</span>
                                </div>
                                )}
                            />
                            {/* tutorial complete of icon in a dropDown here: https://www.cluemediator.com/how-to-add-an-icon-in-the-react-select-dropdown#ctlftd */}
                        </div>
                        <div className="navBarActions" >
                            <input id="searchLabels" defaultValue={'Buscar no histórico de impressões'}></input>
                            <div className="divSearchIcon">
                                <img id="searchIcon" src={search} alt="icone pesquisar" style={{backgroundColor: 'white'}} />
                            </div>
                            <button id="btnNewPrinter" onClick={() => cleanFields()} >Nova impressão</button>
                            <img id="optionIcon" src={option} alt="icone de opções" />
                        </div>
                    </div>

                    <div className="midLane"> 
                        <div className="stageInput">
                            <div className="stageInputLeft">
                                <div className="divInput" id="box1">
                                    <p>Código do produto</p>
                                    <input className="inputTyped"
                                        id="input1"
                                        ref={firstInput} //referenciate a fiels for focus use
                                        value={codePrinter}
                                        onChange={e => setCodePrinter(e.target.value)} //save the type data in a variable
                                        maxLength="14"
                                        onKeyDown={moveToSecondInput} //event executed when press enter
                                    />
                                </div>
                                <div className="divInput" id="box2">
                                    <p>Descrição superior</p>
                                    <input className="inputTyped"
                                        id="input2"
                                        ref={secondInput} //referenciate a fiels for focus use
                                        value={descOnePrinter}
                                        onChange={e => setDescOnePrinter(e.target.value)} //save the type data in a variable
                                        type="text"
                                        onKeyDown={moveToThirdInput} //event executed when press enter
                                        onFocus={previewBar}
                                    />
                                </div>
                                <div className="divInput" id="box3">
                                    <p>Descrição inferior</p>
                                    <input className="inputTyped"
                                        id="input3"
                                        ref={thirdInput} //referenciate a fiels for focus use
                                        value={descTwoPrinter}
                                        onChange={e => setDescTwoPrinter(e.target.value)} //save the type data in a variable
                                        type="text"
                                        onKeyDown={handleKeyDown} //event executed when press enter
                                    />
                                </div>
                            </div>
                            <div className="stageInputRight">
                                <div className="chooseQty" >
                                    <p  id="qtyVis"  >Pré-visualização</p>
                                    <div className="divLandsCapeIcon">
                                        {inStage === landscape &&
                                            <img id="landscapeIcon"
                                                src={inStage}
                                                alt="visualização de paisagem simbolizando campo vazio."
                                                onChange={setInStage}
                                            />
                                        }
                                        {inStage === barCode &&
                                            <img id="barcodeIcon"
                                                src={inStage}
                                                alt="visualização de paisagem simbolizando campo vazio."
                                                onChange={setInStage}
                                            />
                                        }
                                    </div>
                                    <p>Quantidade</p>
                                    <div className="qty" style={{display: 'flex'}} >
                                        <button id="btnLess" >-</button>
                                        <input  value={qtyLabel} id="inpQty" onChange={setQtyLabel}></input>
                                        <button id="btnMost">+</button>
                                    </div>
                                    <button
                                        id="btnInsert"
                                        onClick={() => {
                                            stageOfValidation()
                                        }}
                                        >inserir
                                    </button> 
                                </div>
                            </div>
                        </div>                           
                            {inStagePrinter === 'notInStage' &&
                                <div className="stagePrinter">
                                    <img id="stagePrinterIcon" src={stagePrinterImg} alt="imagem de impressora." />
                                </div>
                            }
                            {inStagePrinter === 'inStage' &&
                                <div className="screenStagePrinter" >
                                    <div className="stagePrinterHeader">
                                        <p className="stagePrinterHeaderText" id="productBlock" > Produto </p>
                                        <p className="stagePrinterHeaderText" id="qtyBlock" > Quantidade </p>
                                        <p className="stagePrinterHeaderText" id="actionsBlock" style={{marginRight: '5px'}} >Ações </p>
                                    </div>
                                    <div className="stagePrinterBody">
                                        <p className="stagePrinterBodyText" id="productBlock"  >{codeInInsert} - {descTopInInsert} - {descBottomInInsert} </p>
                                        <p className="stagePrinterBodyText" id="qtyBlock" >3,00</p>
                                        <p className="stagePrinterBodyText" id="actionsBlock"  >
                                            <img className="screenStagePrinterIcon"
                                                src={stagePrinter} alt="icone de impressora" 
                                                onClick={() => {
                                                    postTrigger(`${url}/procces`, "POST", {
                                                        "campoCod": codePrinter,
                                                        "campoDesc1": descOnePrinter,
                                                        "campoDesc2": descTwoPrinter});
                                                    cleanFields()}
                                                }
                                            />
                                            <img className="screenStagePrinterIcon" src={stagePencil} alt="icone de lápis" onClick={() => firstInput.current.focus()} />
                                            <img className="screenStagePrinterIcon" src={stageTrash} alt="icone de lixeira" onClick={() => cleanFields()} />
                                        </p>
                                    </div>
                                </div>
                            }
                    </div>

                    <div className="footerBarPrinter" style={{boxShadow: '0px 0px 6px rgba(73, 87, 105, .24'}}>
                        <div className="sliceFooterPrinter" >
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
                        </div>
                        <div className="sliceFooterPrinter" id="sliceFooterRigth" >
                            <p id="font1Footer" >Total</p>
                            <p id="font2Footer">{qtyLabel} {setQtyLabel}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="labelDash" style={{boxShadow: '1px 1px 9px #CCCDCD'}}>
                    <div className="navBarPrinter">
                        <div className="navBarDash" >
                            <img id="setaLeftIcon" src={setaLeft} alt="icone de seta." />
                        </div>
                    </div>
                    <div className="midLane" id="midLaneDash"> 
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >{firstHistoryLabel} {setFirstHistoryLabel} </p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >60001</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >20036</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >80007</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >80008</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >80009</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >70005</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >108000</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >130009</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
                        </div>
                        <div className="labelHistory">
                            <p className="textLabelHistory" >Produto</p>
                            <p className="textLabelHistory" id="textLabelHistory2" >100004</p>
                            <div className="divBarCodeDash" >
                                <img id="barCodeHistoryIcon" src={barCodeHistory} alt="icone de seta."/>
                            </div>
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