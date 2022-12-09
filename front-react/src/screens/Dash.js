import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import StoreCard from "../components/StoreCard";
import TopProducts from "../components/TopProduct";
import '../styles.css';
import logoLojaGalo from "../assets/LogoLojaDoGalo4.png";
import logoInterStore from "../assets/logoInterStore.png";
import logoMRV from "../assets/logoMRVClollection2.png";
import logoInterPass from "../assets/logoInterPass.png";
import landscape from "../assets/landscape.png";
import { Chart } from "react-google-charts";
import { dataSendedPie, optionsSendedPie, dataOpenPie, optionsOpenPie, optionsColumn, dataProductTable, optionsProductTable, formattersProductTable, optionsTable, formattersTable, orderListTeste } from "../constants/dashContants";


const moment = require('moment')
moment.locale('pt-br');

const url = "http://localhost:8500";

function Dash() {

    // Set variable that will be used to receive  the get orders data.
    const [currentOrders, setCurrentOrders] = useState([]);
    const [listAtendidos, setListAtendidos] = useState([]);
    const [listAbertos, setListAbertos] = useState([]);
    const [ldgList, setLdgList] = useState([]);
    const [isList, setIsList] = useState([]);
    const [mrvList, setMrvList] = useState([]);
    const [tagList, setTagList] = useState([]);

    // Set deadline variables
    const [totalOrdersSended, setTotalOrdersSended] = useState(0);
    const [ordersSendedOnTime, setOrdersSendedOnTime] = useState(0);
    const [ordersSendedOutOfTime, setOrdersSendedOutOfTime] = useState(0);
    const [percentOrdersSended, setPercentOrdersSended] = useState(0);
    const [totalOrdersOpen, setTotalOrdersOpen] = useState(0);
    const [ordersOpenOnTime, setOrdersOpenOnTime] = useState(0);
    const [ordersOpenOutOfTime, setOrdersOpenOutOfTime] = useState(0);
    const [percentOrdersOpen, setPercentOrdersOpen] = useState(0);

    // Set chart transport variables
    const [transpInterlog, setTranspInterlog] = useState(0);
    const [transpMeLi, setTranspMeli] = useState(0);
    const [transpCorreios, setTranspCorreios] = useState(0);
    const [transpBike, setTranspBike] = useState(0);
    const [transpLocker, setTranspLocker] = useState(0);
    const [dataTableOpen, setDataTableOpen] = useState([["Pedido", "Loja", "Cliente", "Data", "dias atraso"], ["", "", "", "", ""]]);

    // Variables to use in the bigest selers items
    const [bigger1, setBigger1] = useState("");
    const [bigger2, setBigger2] = useState("");
    const [bigger3, setBigger3] = useState("");
    const [bigger4, setBigger4] = useState("");
    const [bigger5, setBigger5] = useState("");
    const [biggerQty1, setBiggerQty1] = useState("");
    const [biggerQty2, setBiggerQty2] = useState("");
    const [biggerQty3, setBiggerQty3] = useState("");
    const [biggerQty4, setBiggerQty4] = useState("");
    const [biggerQty5, setBiggerQty5] = useState("");

    const [updatedTime, setUpdatedTime] = useState("00:01")


    // Data Charts
    let dataTable = dataTableOpen;
    let dataColumn = [
        ["Element", "Density", { role: "style" }],
        ["Interlog", transpInterlog, "#F07839"],
        ["Mercado livre", transpMeLi, "#F07839"],
        ["Correios", transpCorreios, "#F07839"],
        ["Bike", transpBike, "#F07839"],
        ["Locker", transpLocker, "#F07839"],
    ];

    //Requisition to get orders
    async function getPedido() {
        let responseGet = await fetch(`${url}/pedidos`);
        let orders = await responseGet.json();
        setCurrentOrders(orders)
        console.log('Completo! orders:', orders)
    }

    //Refresh values on the dashboard
    function refreshValues() {

        const notOpen = ['Atendido', 'Devolvido', 'Cancelado']
        setListAtendidos(Array.isArray(currentOrders) ? currentOrders.filter(currentOrders => { return currentOrders.pStatus === 'Atendido' }) : [])
        setListAbertos(Array.isArray(currentOrders) ? currentOrders.filter(currentOrders => { return notOpen.indexOf(currentOrders.pStatus) === -1 }) : [])

        // Stores values
        setLdgList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619239' }) : [])
        setIsList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203370950' }) : [])
        setMrvList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203994140' }) : [])
        setTagList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619241' }) : [])

        // Sended orders
        let totalTotal = listAtendidos.length
        setTotalOrdersSended(totalTotal)
        let prazTotal = listAtendidos.filter(listAtendidos => { return listAtendidos.pTempo < 3 && !(listAtendidos.pPrazoEspecial) || listAtendidos.pTempo < 5 && listAtendidos.pPrazoEspecial });
        let totalPrazTotal = prazTotal.length
        setOrdersSendedOnTime(totalPrazTotal)
        setOrdersSendedOutOfTime(totalTotal - totalPrazTotal)
        setPercentOrdersSended(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazTotal / totalTotal))

        // Open orders
        let openTotal = listAbertos.length
        setTotalOrdersOpen(openTotal)
        let prazOpenTotal = listAbertos.filter(listAbertos => { return listAbertos.pTempo < 2 && !(listAbertos.pPrazoEspecial) || listAbertos.pTempo < 4 && listAbertos.pPrazoEspecial });
        let totalOpenPrazTotal = prazOpenTotal.length
        setOrdersOpenOnTime(totalOpenPrazTotal)
        setOrdersOpenOutOfTime(openTotal - totalOpenPrazTotal)
        setPercentOrdersOpen(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalOpenPrazTotal / openTotal))

        // sended orders by mode
        let pedidosTranspInterlog = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'Interlog' })
        setTranspInterlog(pedidosTranspInterlog.length)
        let pedidosTranspMeli = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'vtex:fob_16dc0f6' })
        setTranspMeli(pedidosTranspMeli.length)
        let pedidosTranspCorreios = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'correios' })
        setTranspCorreios(pedidosTranspCorreios.length)
        let pedidosTranspBike = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'BIKE' })
        setTranspBike(pedidosTranspBike.length)
        let pedidosTranspLocker = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'Clique e retire - Inter' })
        setTranspLocker(pedidosTranspLocker.length)

        // top 5 best selling products
        let listOfProducts = []
        let z = 0
        let y = 0
        let product = ""
        let newProduct = ""
        let qty = ""
        let img = ""
        let desc = ""
        let objIndex = 0
        let newList = []

        while (z < listAtendidos.length) {
            while (y < listAtendidos[z].pItens.length) {
                product = listAtendidos[z].pItens[y].item.codigo
                desc = listAtendidos[z].pItens[y].item.descricao
                img = ""
                qty = parseInt(listAtendidos[z].pItens[y].item.quantidade)
                newProduct = [{ "item": product, "descricao": desc, "img": img, "qty": qty }]
                objIndex = listOfProducts.findIndex((obj => obj.item == product));
                if (objIndex === -1) {
                    Array.prototype.push.apply(listOfProducts, newProduct);
                } else {
                    listOfProducts[objIndex].qty = listOfProducts[objIndex].qty + qty
                }
                y++
            }
            y = 0
            z++
        }
        // console.log(listOfProducts)
        // console.log(findMax(listOfProducts).item)
        if(findMax(listOfProducts) != null){
           
            let max1 = findMax(listOfProducts)
            // newList = removeListItem()
            // let max2 = findMax(listOfProducts)[0]
            // let max3 = findMax(listOfProducts)[0]
            // let max4 = findMax(listOfProducts)[0]
            // let max5 = findMax(listOfProducts)[0]

            setBigger1(max1.descricao)
            // setBigger2(findMax(listOfProducts)[0].descricao)
            // setBigger3(findMax(listOfProducts)[0].descricao)
            // setBigger4(findMax(listOfProducts)[0].descricao)
            // setBigger5(findMax(listOfProducts)[0].descricao)

            setBiggerQty1(max1.qty)
            // setBiggerQty2(findMax(listOfProducts)[0].qty)
            // setBiggerQty3(findMax(listOfProducts)[0].qty)
            // setBiggerQty4(findMax(listOfProducts)[0].qty)
            // setBiggerQty5(findMax(listOfProducts)[0].qty)
        }
        
        
        
        
        


        // setBigger1(findMax(listOfProducts)[0] != null ? findMax(listOfProducts)[0].descricao : "")
        // setBigger2(findMax(listOfProducts)[0] != null ? findMax(listOfProducts)[0].descricao : "")
        // setBigger3(findMax(listOfProducts)[0] != null ? findMax(listOfProducts)[0].descricao : "")
        // setBigger4(findMax(listOfProducts)[0] != null ? findMax(listOfProducts)[0].descricao : "")
        // setBigger5(findMax(listOfProducts)[0] != null ? findMax(listOfProducts)[0].descricao : "")


        // table of open orders
        const storesNumbers = ["203619239", "203370950", "203994140", "203619241"]
        const storesName = ["Loja do Galo", "InterStore", "Loja MRV", "Intertag"]
        let dataTable = [["Pedido", "Loja", "Cliente", "Data", "dias atraso"]]
        let dataTableResult = []
        let storeIndice = -1
        let aux = 0
        let currentOrder = []
        let dataTableAdd = []
        while (aux < listAbertos.length) {
            dataTableResult = []
            currentOrder = listAbertos[aux]
            storeIndice = storesNumbers.indexOf(currentOrder.pLoja)
            dataTableAdd = [
                currentOrder.pNumero,
                storesName[storeIndice],
                currentOrder.pCliente,
                moment(currentOrder.pDataCriacao).format("DD/MM"),
                currentOrder.pTempoAtraso
            ]
            dataTableResult = [...dataTable, [...dataTableAdd]]
            dataTable = dataTableResult
            aux++
        }
        setDataTableOpen(dataTable)

        // last update time
        setUpdatedTime(moment().format('hh:mm'))

    }

    function findMax(list) {

        let maxNum = 0
        let objIndex = 1
        maxNum = Math.max(...list.map(o => o.qty))
        objIndex = list.findIndex((obj => obj.qty === maxNum));

        // list.splice(objIndex, 1)
        return list[objIndex]
    }

    // function removeListItem(list) {

    //     let maxNum = 0
    //     let objIndex = 1
    //     maxNum = Math.max(...list.map(o => o.qty))
    //     objIndex = list.findIndex((obj => obj.qty === maxNum));

    //     // list.splice(objIndex, 1)
    //     return list[objIndex]
    // }

    // function that to get orders scheduled
    useEffect(() => {
        const myInterval = window.setInterval(function () {
            getPedido();
        }, 300000); // repeat every 5 minutes
        return () => clearInterval(myInterval);
    }, []);

    //refresh values when there are something new
    useEffect(() => {
        refreshValues();
    }, [currentOrders]);

    return (
        <div className="Dashboard" style={{ backgroundColor: "#F5F6FC" }}>
            <NavBar />
            <div id="body" className="" style={{ height: '44.5vw', backgroundColor: "#F5F6FC" }}>{/* "#F5F6FC" */}
                <div id="visaoGeral" className="d-flex" style={{ marginTop: "15px", marginBottom: "15px", }}>
                    <span className="d-flex" style={{ width: "70%" }}>
                        <div className="card-text ms-5"><h5 className="text-muted">Visão geral</h5></div>
                    </span>
                    <span className="d-flex" style={{ width: "15%" }}>
                        <p className="card-text"><small className="text-muted" onClick={() => { getPedido() }} >Atualizado: </small></p>
                        <p className="card-text"><small className="text-muted ms-1" onChange={setUpdatedTime} >{updatedTime}</small></p>
                    </span>
                    <span className="d-flex" style={{ width: "15%" }}>
                        <p className="card-text"><small className="text-muted">Período:</small></p>
                        <p className="card-text"><small className="text-muted ms-1">Mes Atual</small></p>
                    </span>
                </div>
                <div id="lojas" className="" >
                    <div className="d-flex mb-4" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }} >
                        <p style={{ marginLeft: '4%' }}></p>
                        <StoreCard logo={logoLojaGalo} backLogoColor={"#303030"} atualizarPedidos={ldgList} />
                        <StoreCard logo={logoInterStore} backLogoColor={"#F5F6FA"} atualizarPedidos={isList} />
                        <StoreCard logo={logoMRV} backLogoColor={"#4FB385"} atualizarPedidos={mrvList} />
                        <StoreCard logo={logoInterPass} backLogoColor={"#F5F6FA"} atualizarPedidos={tagList} />
                    </div>
                </div>
                <div id="bodyDown" className="d-flex ps-4 pe-4" style={{ height: '72%', width: "100%" }}>
                    <div className="pedidos" style={{ width: "66%" }}>
                        <div id="pedidosUp" className="" style={{ display: 'flex' }}>
                            <div className="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
                                <div className="" style={{ width: "50%" }}>
                                    <div className="mt-5">
                                        <h5 className="text-muted ms-5 mt-2" style={{ position: "absolute", textAlign: "center" }}>Pedidos enviados</h5>
                                        <Chart
                                            chartType="PieChart"
                                            data={dataSendedPie}
                                            options={optionsSendedPie}
                                            allowHtml="true"
                                        />
                                    </div>
                                </div>
                                <div className="card ps-3 pt-3 me-3 mb-3 mt-3" style={{ width: "50%", borderRadius: "15px", backgroundColor: "#F2F2F2", height: "85%" }}>
                                    <p className="card-text" onChange={setTotalOrdersSended}>Total - {totalOrdersSended}</p>
                                    <p className="card-text" onChange={setOrdersSendedOnTime}>No prazo - {ordersSendedOnTime}</p>
                                    <p className="card-text" onChange={setOrdersSendedOutOfTime}>Em atraso - {ordersSendedOutOfTime}</p>
                                    <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                                        <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} onChange={setPercentOrdersSended}>{percentOrdersSended}</h3><p className="card-text ps-2 mb-2"> envios no prazo</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
                                <div className="" style={{ width: "50%" }}>
                                    <div className="mt-5">
                                        <h5 className="text-muted ms-5 mt-2" style={{ position: "absolute", textAlign: "center" }}>Pedidos em aberto</h5>
                                        <Chart
                                            chartType="PieChart"
                                            data={dataOpenPie}
                                            options={optionsOpenPie}
                                            allowHtml='true'
                                        />
                                    </div>
                                </div>
                                <div className="card ps-3 pt-3 me-3 mb-3 mt-3" style={{ width: "50%", borderRadius: "15px", backgroundColor: "#F2F2F2", height: "85%" }}>
                                    <p className="card-text" >Total - {totalOrdersOpen}</p>
                                    <p className="card-text" >No prazo - {ordersOpenOnTime}</p>
                                    <p className="card-text" >Em atraso - {ordersOpenOutOfTime}</p>
                                    <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                                        <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} onChange={setPercentOrdersOpen}>{percentOrdersOpen}</h3><p className="card-text ps-2 mb-2"> pedidos no prazo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="pedidosDown" className="" style={{ display: 'flex' }}>
                            <div className="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                                <h5 className="text-muted mt-3" style={{ textAlign: "center" }}>Modais de envio</h5>
                                <div>
                                    <Chart chartType="ColumnChart" width="100%" height="400px" data={dataColumn} options={optionsColumn} />
                                </div>
                            </div>
                            <div className="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                                <h5 className="text-muted mt-3" style={{ textAlign: "center" }}>Produtos com maior saída</h5>
                                <TopProducts refreshValue={setBigger1} value={bigger1} refreshQty={setBiggerQty1} qty={biggerQty1}/>
                                <TopProducts refreshValue={"Porta Cartão Preto - 3 unidades"} value={"Porta Cartão Preto - 3 unidades"} refreshQty={"5"} qty={"5"}/>
                                <TopProducts refreshValue={"Bolsa Térmica Inter Black"} value={"Bolsa Térmica Inter Black"} refreshQty={"5"} qty={"5"}/>
                            </div>
                        </div>
                    </div>
                    <div id="listaPedidos" className="" style={{ width: "33%" }}>
                        <div className="card m-4" style={{ borderRadius: "15px", height: "60.3vh" }}>
                            <h5 className="text-muted  mt-3" style={{ textAlign: "center" }}>Pedidos em aberto</h5>
                            <Chart
                                chartType="Table"
                                data={dataTable}
                                options={optionsTable}
                                formatters={formattersTable}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dash;