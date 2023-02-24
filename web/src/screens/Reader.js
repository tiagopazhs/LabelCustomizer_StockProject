import search from "../assets/search.png";
import option from "../assets/option.png";
import landscape from "../assets/landscape.png";
import { Chart } from "react-google-charts";
import { optionsTable, formattersTable } from "../constants/dashContants";
import React, { useState, useRef } from 'react';
import '../styles.css';
import NavBar from "../components/NavBar";
const url = "http://localhost:8501";

function Reader() {

    const [dataTableOpen, setDataTableOpen] = useState([["Código produto", "Descrição", "Quantidade"], ["020076-2", "Tshirt Feminina Verão Fazer Diferente Branca M", "1"]   ,["020077-2", "Tshirt Feminina Verão Fazer Diferente Preta M", "1"]   ,["CHVIB03", "Chinelo Havaianas Verão 2022 - Ícones Branco 37/38", "2"]   ,["020111-8", "Pantufa InterPig G", "1"]   ,["71179000", "Chaveiro Inter + Interpig", "1"]   ,["30015", "Caderno Interpig Executivo Preto", "5"]   ,["30012", "Kit Bloquinhos #Sanguelaranja - 4 unidades Kit 4 Bloquinhos #Sanguelaranja", "1"], ["020076-2", "Tshirt Feminina Verão Fazer Diferente Branca GG", "1"] , ["020076-2", "Tshirt Feminina Verão Fazer Diferente preta M", "1"]     ]);
    const [currentOrders, setCurrentOrders] = useState([]);

    // Requisição get
    async function getPedido(id) {
        const responseGet = await fetch(`${url}/serial`);
        const dadosPedido = await responseGet.json();

        setCurrentOrders(dadosPedido)
        return dadosPedido
    }
    // Set variables that will be used to comunicate with API
    const [methodReq, setMethodReq] = useState("POST");
    // Set variables that will be used in input fields
    const [codePrinter, setCodePrinter] = useState('');
    const [descOnePrinter, setDescOnePrinter] = useState('');
    const [descTwoPrinter, setDescTwoPrinter] = useState('');

    // Set variables that will be used in ref to move in fields
    const firstInput = useRef(null);
    const secondInput = useRef(null);

    //Set variable of barcode in stage
    const [inStage, setInStage] = useState(landscape);
    const [qtyLabel, setQtyLabel] = useState('0,00');
    const [firstHistoryLabel, setFirstHistoryLabel] = useState('100068');
    const [inStagePrinter, setInStagePrinter] = useState('notInStage');

    // Move from input one to input two and call the preview bar
    const moveToSecondInput = (event) => {
        if (event.key === 'Enter') {
            // previewBar();
            secondInput.current.focus();
        }
    }

    // clean the input field's to reset the validation of data
    async function cleanFields() {
        setCodePrinter('');
        setDescOnePrinter('');
        setDescTwoPrinter('');
        setInStagePrinter('notInStage');
        setCodePrinter('');
        setInStage(landscape);
        setQtyLabel('0,00');
        setFirstHistoryLabel('100068');
        firstInput.current.focus();
        setMethodReq("POST");
    }

    return (
        <div className="printerPage">
            <NavBar />

            <div className="body">
                <div className="mainPrinter" style={{ boxShadow: '1px 1px 9px #CCCDCD', width: "100%" }}>

                    <div className="navBarPrinter" >
                        <h2 className="ps-5 pt-2" style={{ fontStyle: 'sora', width: "50%", color: '#f3f3f3' }} >Ordem de validação por código de barras</h2>
                        <div className="navBarActions" >
                            <input id="searchLabels" defaultValue={'Buscar no histórico de leitura'}></input>
                            <div className="divSearchIcon">
                                <img id="searchIcon" onClick={() => getPedido()} src={search} alt="icone pesquisar" style={{ backgroundColor: 'white' }} />
                            </div>

                            <img id="optionIcon" src={option} alt="icone de opções" />
                        </div>
                    </div>

                    <div className="midLane">
                        <div className="stageInput" style={{ width: "30%" }}>
                            <div className="stageInputLeft" style={{ width: "100%" }}>
                                <div className="divInput  pt-5 m-3 mt-5" id="box1">
                                    <p>Código de barras</p>
                                    <input className="inputTyped p-0 m-0"
                                        id="input1"
                                        ref={firstInput} //referenciate a fiels for focus use
                                        value={codePrinter}
                                        style={{ height: "50px"}}
                                        onChange={e => setCodePrinter(e.target.value)} //save the type data in a variable
                                        maxLength="14"
                                        onKeyDown={moveToSecondInput} //event executed when press enter
                                    />
                                </div>
                                <div className="pb-5 mb-5">
                                    <button className="pt-0 mt-0" // clean input fields
                                        id="btnEnter"
                                        onClick={() => cleanFields()}
                                        style={{ height: "80px", backgroundColor: '#FB6551', borderColor: '#FB6551' }}
                                    >EXCLUIR
                                    </button>
                                    <button // Call the post function. parameters: url that server is running, requisition type, data to post & clean input fields
                                        className="pt-0 mt-0"
                                        id="btnEnter"
                                        style={{ height: "80px", backgroundColor: '#00C75B', borderColor: '#00C75B' }}
                                    >ADICIONAR
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="stagePrinter" style={{ width: '70%', alignItems: "center", justifyContent: "" }}>
                            <div className="d-flex" >
                            <Chart
                                chartType="Table"
                                data={dataTableOpen}
                                options={optionsTable}
                                formatters={formattersTable}

                            />
                            </div>
                        </div>

                    </div>

                    <div className="footerBarPrinter" style={{ boxShadow: '0px 0px 6px rgba(73, 87, 105, .24' }}>
                        <div className="sliceFooterPrinter" >

                        </div>
                        <div className="sliceFooterPrinter" id="sliceFooterRigth" >
                            <button // clean input fields
                                id="btnEnter"
                                onClick={() => cleanFields()}
                            >Exportar CSV
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Reader;