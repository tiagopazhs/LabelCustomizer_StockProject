import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import NavBar from "../components/NavBar";
import StoreCard from "../components/StoreCard";
import TopProducts from "../components/TopProduct";
import PieOrder from "../components/PieOrder";
import '../styles.css';
import logoLojaGalo from "../assets/LogoLojaDoGalo4.png";
import logoInterStore from "../assets/logoInterStore.png";
import logoMRV from "../assets/logoMRVClollection2.png";
import logoInterPass from "../assets/logoInterPass.png";
import loading from "../assets/loading.gif";
import { optionsColumn, optionsTable, formattersTable } from "../constants/dashContants";
import { findMax, removeListItem } from "../utils";

const moment = require('moment')
moment.locale('pt-br');

const url = "http://localhost:8500";

function Dash() {

    // Set variable that will be used to receive  the get orders data.
    const [currentProducts, setCurrentProducts] = useState([]);

    // Set variable that will be used to receive  the get orders data.
    const [currentOrders, setCurrentOrders] = useState([]);
    const [listAtendidos, setListAtendidos] = useState([]);
    const [listAbertos, setListAbertos] = useState([]);
    const [ldgList, setLdgList] = useState([]);
    const [isList, setIsList] = useState([]);
    const [mrvList, setMrvList] = useState([]);
    const [tagList, setTagList] = useState([]);

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
    const [biggerQty1, setBiggerQty1] = useState("");
    const [biggerQty2, setBiggerQty2] = useState("");
    const [biggerQty3, setBiggerQty3] = useState("");
    const [biggerQty4, setBiggerQty4] = useState("");

    // variable to update the updated time 
    const [updatedTime, setUpdatedTime] = useState("00:01")

    //update modal data chart
    let dataColumn = [
        ["Element", "Density", { role: "style" }, { role: "annotation" }],
        ["Interlog", transpInterlog, "#F07839", transpInterlog],
        ["Mercado livre", transpMeLi, "#F07839", transpMeLi],
        ["Correios", transpCorreios, "#F07839", transpCorreios],
        ["Bike", transpBike, "#F07839", transpBike],
        ["Locker", transpLocker, "#F07839", transpLocker],
    ];

    //Requisition to get products
    async function getProduto() {
        let responseProdGet = await fetch(`${url}/produtos`);
        let products = await responseProdGet.json();
        setCurrentProducts(products)
        console.log('Completo! products:', products)
    }

    //Requisition to get orders
    async function getPedido() {
        let responseGet = await fetch(`${url}/pedidos`);
        let orders = await responseGet.json();
        setCurrentOrders(orders?.sort((a, b) => (a.pTempoAtraso < b.pTempoAtraso) ? 1 : ((b.pTempoAtraso < a.pTempoAtraso) ? -1 : 0)))
        console.log('Completo! orders:', orders)
    }

    //Refresh values on the dashboard
    function refreshValues() {

        //filter orders that are not open 
        const notOpen = ['Atendido', 'Devolvido', 'Cancelado']
        setListAtendidos(Array.isArray(currentOrders) ? currentOrders.filter(currentOrders => { return currentOrders.pStatus === 'Atendido' }) : [])
        setListAbertos(Array.isArray(currentOrders) ? currentOrders.filter(currentOrders => { return notOpen.indexOf(currentOrders.pStatus) === -1 }) : [])

        // Stores values
        setLdgList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619239' }) : [])
        setIsList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203370950' }) : [])
        setMrvList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203994140' }) : [])
        setTagList(Array.isArray(listAtendidos) ? listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619241' }) : [])

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

        //Create the products data to sort by top 4 best sellers
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

        // refresh products data
        if (findMax(listOfProducts) != null && currentProducts != []) {

            listOfProducts = removeListItem(listOfProducts, "Personalização - Nome e Número") // remove item that are special
            let max1 = findMax(listOfProducts)
            setBigger1(currentProducts.filter(x => x.pCode === max1.item))
            setBiggerQty1(max1.qty)

            listOfProducts = removeListItem(listOfProducts, max1.item) // remove before item to find de second max
            let max2 = findMax(listOfProducts)
            setBigger2(currentProducts.filter(x => x.pCode === max2.item))
            setBiggerQty2(max2.qty)

            listOfProducts = removeListItem(listOfProducts, max2.item) // remove before item to find de third max
            let max3 = findMax(listOfProducts)
            setBigger3(currentProducts.filter(x => x.pCode === max3.item))
            setBiggerQty3(max3.qty)

            listOfProducts = removeListItem(listOfProducts, max3.item) // remove before item to find de for max
            let max4 = findMax(listOfProducts)
            setBigger4(currentProducts.filter(x => x.pCode === max4.item))
            setBiggerQty4(max4.qty)
        }

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

        setDataTableOpen(dataTable.length > 3 ? dataTable.sort((a, b) => b.last_nom - a.last_nom) : [["Pedido", "Loja", "Cliente", "Data", "dias atraso"], ["", "", "", "", ""]])

        // last update time
        setUpdatedTime(moment().format('hh:mm'))

    }

    // function that to get orders scheduled
    useEffect(() => {
        const myInterval = window.setInterval(function () {
            getPedido();
        }, 1500000); // repeat every 15 minutes
        return () => clearInterval(myInterval);
    }, []);

    // get products descriptions before to get started
    useEffect(() => {
        getProduto();
    }, []);

    // refresh orders values after the get order requisition
    useEffect(() => {
        getPedido();
    }, [currentProducts]);

    // refresh values when there are something new in the get order requisition
    useEffect(() => {
        refreshValues();
    }, [currentOrders]);

    console.log('oi', dataTableOpen)
    return (

        <div className="Dashboard" style={{ backgroundColor: "#F5F6FC" }}>
            <NavBar />
            {dataTableOpen.length === 2 &&
                <div className="d-flex" style={{ backgroundColor: 'orange', width: '100%', height: '44.5vw', alignItems: "center", justifyContent: "center" }} >
                    <div className="d-grid"  >
                        <div className="d-flex" style={{justifyContent: "center" }}>
                            <h2 className="me-5"> Carregando dashboard </h2>
                            <img src={loading} style={{ width: "30px", height: "30px" }} />
                        </div>
                        <h7> Você sabia que o bling tem um limite de requisições de 300 pedidos/produtos por segundo?</h7>
                        <h7> Isso faz com que o primeiro carregamento do dashboard demore entre 40 segundos e 1 minuto e 40 segundos.</h7>
                    </div>
                </div>
            }
            {dataTableOpen.length > 2 &&
                <div>
                    <div id="body" className="" style={{ height: '44.5vw', backgroundColor: "#F5F6FC" }}>{/* "#F5F6FC" F07939*/}
                        <div id="visaoGeral" className="d-flex" style={{ marginTop: "15px", marginBottom: "15px", }}>
                            <span className="d-flex" style={{ width: "70%" }}>
                                <div className="card-text ms-5"><h5 className="text-muted">Visão geral</h5></div>
                            </span>
                            <span className="d-flex" style={{ width: "15%" }}>
                                <p className="card-text"><small className="text-muted" onClick={() => { refreshValues(); getPedido() }} >Atualizado: </small></p>
                                <p className="card-text"><small className="text-muted ms-1" >{updatedTime}</small></p>
                            </span>
                            <span className="d-flex" style={{ width: "15%" }}>
                                <p className="card-text"><small className="text-muted" onClick={() => { getProduto() }} >Período:</small></p>
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
                                    <PieOrder orders={listAtendidos} title={"Pedidos enviados"} desc={"envios no prazo"} />
                                    <PieOrder orders={listAbertos} title={"Pedidos em aberto"} desc={"pedidos no prazo"} />
                                </div>
                                <div id="pedidosDown" className="" style={{ display: 'flex' }}>
                                    <div className="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                                        <h5 className="text-muted mt-3 mb-0 pb-0" style={{ textAlign: "center" }}>Modais de envio</h5>
                                        <div className="mt-0 pt-0">
                                            <Chart chartType="ColumnChart" height="395px" data={dataColumn} options={optionsColumn} />
                                        </div>
                                    </div>
                                    <div className="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                                        <h5 className="text-muted mt-3 mb-0 pb-0" style={{ textAlign: "center" }}>Produtos com maior saída</h5>
                                        <TopProducts details={bigger1} qty={biggerQty1} />
                                        <TopProducts details={bigger2} qty={biggerQty2} />
                                        <TopProducts details={bigger3} qty={biggerQty3} />
                                        <TopProducts details={bigger4} qty={biggerQty4} />
                                    </div>
                                </div>
                            </div>
                            <div id="listaPedidos" className="" style={{ width: "33%" }}>
                                <div className="card m-4" style={{ borderRadius: "15px", height: "60.3vh" }}>
                                    <h5 className="text-muted  mt-3" style={{ textAlign: "center" }}>Lista pedidos em aberto</h5>
                                    <Chart
                                        chartType="Table"
                                        data={dataTableOpen}
                                        options={optionsTable}
                                        formatters={formattersTable}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default Dash;