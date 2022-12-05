import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import StoreCard from "../components/StoreCard";
import '../styles.css';
import logoLojaGalo from "../assets/LogoLojaDoGalo4.png";
import logoInterStore from "../assets/logoInterStore.png";
import logoMRV from "../assets/logoMRVClollection2.png";
import logoInterPass from "../assets/logoInterPass.png";
import { Chart } from "react-google-charts";

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

   const [updatedTime, setUpdatedTime] = useState("00:01")

   //Requisition to get orders
   async function getPedido() {
      let responseGet = await fetch(`${url}/pedidos`);
      let orders = await responseGet.json();
      setCurrentOrders(orders)
      console.log('orders: ', orders)
   }

   //Refresh values on the dashboard
   function refreshValues() {      

      setListAtendidos(currentOrders.filter(currentOrders => { return currentOrders.pStatus === 'Atendido' }))
      setListAbertos(currentOrders.filter(currentOrders => { return currentOrders.pStatus != 'Atendido' && currentOrders.pStatus != 'Devolvido' && currentOrders.pStatus != 'Cancelado' }))

      // Stores values
      setLdgList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619239' }))
      setIsList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203370950' }))
      setMrvList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203994140' }))
      setTagList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619241' }))

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
      let prazOpenTotal = listAbertos.filter(listAbertos => { return listAbertos.pTempo < 3 && !(listAbertos.pPrazoEspecial) || listAbertos.pTempo < 5 && listAbertos.pPrazoEspecial });
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

      setUpdatedTime(moment().format('hh:mm'))

   }

   //Data charts:
   const dataSendedPie = [
      ["Pac Man", "Percentage"],
      ["", 4],
      ["", 20],
      ["", 45],
   ];
   const optionsSendedPie = {
      legend: "none",
      pieHole: 0.7,
      pieSliceText: "none",
      redFrom: 90,
      redTo: 100,
      minorTicks: 5,
      pieStartAngle: 110,
      tooltip: { trigger: "none" },
      slices: {
         0: { color: "#ED3833" },
         1: { color: "transparent" },
         2: { color: "#4EB9C4" },
      },
      width: "30vh",
      height: "30vh",
      paddingTop: "150vh",
      backgroundColor: "none",
   };
   const dataOpenPie = [
      ["Pac Man", "Percentage"],
      ["", 12], // red
      ["", 20], // white
      ["", 38], // blue
   ];
   const optionsOpenPie = {
      legend: "none",
      pieHole: 0.7,
      pieSliceText: "none",
      pieStartAngle: 69,
      // pieStartAngle: 260,
      // pieStartAngle: 233,
      // pieStartAngle: 129,
      tooltip: { trigger: "none" },
      slices: {
         0: { color: "#ED3833" },
         1: { color: "transparent" },
         2: { color: "#4EB9C4" },
      },
      width: "30vh",
      height: "30vh",
      paddingTop: "150vh",
      backgroundColor: "none",
   };
   const dataColumn = [
      ["Element", "Density", { role: "style" }],
      ["Interlog", transpInterlog, "#F07839"],
      ["Mercado livre", transpMeLi, "#F07839"],
      ["Correios", transpCorreios, "#F07839"],
      ["Bike", transpBike, "#F07839"],
      ["Locker", transpLocker, "#F07839"],
   ];

   const optionsColumn = {
      allowHtml: 'true',
      legend: "none",
      paddingTop: "150px",
      chartArea: { left: "10%", top: "7%", width: "80%", height: "35%" },
      backgroundColor: "none",
      vAxis: {
         baselineColor: "#B8B7BB",
         textStyle: {
            fontSize: 10,
            color: "transparent",
         },
         gridlines: {
            count: 0
         }
      },
      hAxis: {
         showEveryText: 7,
         gridlines: { count: 0 }
      },
   };
   const dataTable = [
      ["Pedido", "Loja", "Cliente", "Data", "dias atraso"],
      ["175788", "Is", "Tatiane Pimenta Costa atiane Pimenta Costa", "10/07/22", 15],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/07/22", 4],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/07/22", 3],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 3],
      ["175788", "Is", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["175788", "Is", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["175788", "Is", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/07/22", 2],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["175788", "Is", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["175788", "Is", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["175788", "Is", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/06/22", 0],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/08/22", 0],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["175788", "Is", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["176060", "Galo", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["177070", "Pass", "Tatiane Pimenta Costa", "10/07/22", 0],
      ["177071", "MRV", "Tatiane Pimenta Costa", "10/07/22", 0],
   ];

   const optionsTable = {
      allowHtml: true,
      showRowNumber: true,
      height: "53vh",
      hAxis: { textPosition: 'none' },
      cssClassNames: {
         tableCell: 'tableOrder'
      },
   };
   const formattersTable = [
      {
         type: "ColorFormat",
         column: 4,
         ranges: [
            [0, 0, "black", "white"],
            [3, null, "black", "#EE616F"],
            [2, null, "black", "#F7D883"],
         ],
      },
   ];
   const dataTable2 = [
      ["", "", ""],
      ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 2],
      ["img", "Interpig - laranja especificação: único", 0],
      ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 2],
      ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 1],
      ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 3],
   ];

   const optionsTable2 = {
      allowHtml: true,
      showRowNumber: true,
      allowHtml: true,
      legend: "none",
      height: "20vh",
      cssClassNames: { tableCell: 'classTable', headerCell: 'noHeader' },
   };
   const formattersTable2 = [
   ];

   //function that to get orders scheduled
//    useEffect(() => {
//      const myInterval = window.setInterval(function () {
//         getPedido();
//         refreshValues()
//          }, 60000); // repeat every 60 seconds
//      return () => clearInterval(myInterval);
// }, []);


   //refresh values when there are something new
   useEffect(() => {
         refreshValues()
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
                  <StoreCard logo={logoLojaGalo} backLogoColor={"#303030"} atualizarPedidos={ldgList}/>
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
                           <p className="card-text" onChange={setTotalOrdersOpen}>Total - {totalOrdersOpen}</p>
                           <p className="card-text" onChange={setOrdersOpenOnTime}>No prazo - {ordersOpenOnTime}</p>
                           <p className="card-text" onChange={setOrdersOpenOutOfTime}>Em atraso - {ordersOpenOutOfTime}</p>
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
                        <Chart
                           chartType="Table"
                           height="95%"
                           data={dataTable2}
                           options={optionsTable2}
                           formatters={formattersTable2}
                        />
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