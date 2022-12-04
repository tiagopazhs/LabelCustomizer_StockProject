import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import StoreCard from "../components/StoreCard";
import '../styles.css';
import logoLojaGalo from "../assets/LogoLojaDoGalo4.png";
import logoInterStore from "../assets/logoInterStore.png";
import logoMRV from "../assets/logoMRVClollection2.png";
import logoInterPass from "../assets/logoInterPass.png";
import { Chart } from "react-google-charts";

const url = "http://localhost:8500";


let initial = ""
let end = ""
function Dash() {

   const [teste, setTeste] = useState("default");
   async function testeFunc() {
   }

   // Set variable that will be used to receive  the get orders data.
   const [currentOrdersResult, setCurrentOrdersResult] = useState([]);

   // Set variables that will be used in store cards
   const [atendidosLdg, setAtendidosLdg] = useState(0);
   const [prazoLdg, setPrazoLdg] = useState(0);
   const [mediaLdg, setMediaLdg] = useState(0);
   const [atendidosIs, setAtendidosIs] = useState(0);
   const [prazoIs, setPrazoIs] = useState(0);
   const [mediaIs, setMediaIs] = useState(0);
   const [atendidosMrv, setAtendidosMrv] = useState(0);
   const [prazoMrv, setPrazoMrv] = useState(0);
   const [mediaMrv, setMediaMrv] = useState(0);
   const [atendidosTag, setAtendidosTag] = useState(0);
   const [prazoTag, setPrazoTag] = useState(0);
   const [mediaTag, setMediaTag] = useState(0);

   // Set variables to use in deadline orders
   const [totalOrdersSended, setTotalOrdersSended] = useState(0);
   const [ordersSendedOnTime, setOrdersSendedOnTime] = useState(0);
   const [ordersSendedOutOfTime, setOrdersSendedOutOfTime] = useState(0);
   const [percentOrdersSended, setPercentOrdersSended] = useState(0);
   const [totalOrdersOpen, setTotalOrdersOpen] = useState(0);
   const [ordersOpenOnTime, setOrdersOpenOnTime] = useState(0);
   const [ordersOpenOutOfTime, setOrdersOpenOutOfTime] = useState(0);
   const [percentOrdersOpen, setPercentOrdersOpen] = useState(0);

   // Set pie transport variables
   const [transpInterlog, setTranspInterlog] = useState(0);
   const [transpMeLi, setTranspMeli] = useState(0);
   const [transpCorreios, setTranspCorreios] = useState(0);
   const [transpBike, setTranspBike] = useState(0);
   const [transpLocker, setTranspLocker] = useState(0);

   //function that to get orders scheduled
   // useEffect(() => {
   //    const myInterval = window.setInterval(function () {
   //       getPedido();
   //       refreshValues()
   //    }, 60000); // repeat every 60 seconds
   //    return () => clearInterval(myInterval);
   // }, []);

   //Requisition to get orders
   async function getPedido() {
      const responseGet = await fetch(`${url}/pedidos`);
      const orders = await responseGet.json();
      console.log('orders: ', orders)
      setCurrentOrdersResult(orders)
   }

   //Refresh values on the dashboard
   function refreshValues() {
      let ordersAtendidosTotal = currentOrdersResult.pedidosAtendidos
      let ordersAbertosTotal = currentOrdersResult.outrosPedidos

      //STORE CARD LOJA DO GALO
      let LDG = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pLoja === '203619239' });//total or orders
      let totalLDG = LDG.length
      setAtendidosLdg(totalLDG);//ordens on time
      let prazLDG = LDG.filter(LDG => { return LDG.pTempo < 3 });
      let totalPrazLDG = prazLDG.length
      setPrazoLdg(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazLDG / totalLDG)); //calculate and format orders lead tie
      let auxSumOrderTimeLdg = 0 //Variable that will be used in the sum of time orders
      for (let i = 0; i < LDG.length; i++) { auxSumOrderTimeLdg += LDG[i].pTempo }
      let averageLdg = auxSumOrderTimeLdg / totalLDG //calculate the average
      setMediaLdg(averageLdg.toFixed(2))

      //STORE CARD INTER STORE
      let IS = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pLoja === '203370950' });//total de ordens
      let totalIS = IS.length
      setAtendidosIs(totalIS);//ordens no prazo
      let prazIS = IS.filter(IS => { return IS.pTempo < 3 });
      let totalPrazIS = prazIS.length
      setPrazoIs(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazIS / totalIS));//calcula e formata ordens no prazo
      let auxSumOrderTimeIs = 0 //Variable that will be used in the sum of time orders
      for (let i = 0; i < IS.length; i++) { auxSumOrderTimeIs += IS[i].pTempo }
      let averageIs = auxSumOrderTimeIs / totalIS //calculate the average
      setMediaIs(averageIs.toFixed(2))

      //STORE CARD MRV
      let MRV = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pLoja === '203994140' });//total de ordens
      let totalMRV = MRV.length
      setAtendidosMrv(totalMRV);//ordens no prazo
      let prazMRV = MRV.filter(MRV => { return MRV.pTempo < 3 });
      let totalPrazMRV = prazMRV.length
      setPrazoMrv(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazMRV / totalMRV));//calcula e formata ordens no prazo
      let auxSumOrderTimeMrv = 0 //Variable that will be used in the sum of time orders
      for (let i = 0; i < MRV.length; i++) { auxSumOrderTimeMrv += MRV[i].pTempo }
      let averageMrv = auxSumOrderTimeMrv / totalMRV //calculate the average
      setMediaMrv(averageMrv.toFixed(2))

      //STORE CARD TAG
      let TAG = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pLoja === '203619241' });//total de ordens
      let totalTAG = TAG.length
      setAtendidosTag(totalTAG);//ordens no prazo
      let prazTAG = TAG.filter(TAG => { return TAG.pTempo < 3 });
      let totalPrazTAG = prazTAG.length
      setPrazoTag(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazTAG / totalTAG));//calcula e formata ordens no prazo
      let auxSumOrderTimeTag = 0 //Variable that will be used in the sum of time orders
      for (let i = 0; i < TAG.length; i++) { auxSumOrderTimeTag += TAG[i].pTempo }
      let averageTag = auxSumOrderTimeTag / totalTAG //calculate the average
      setMediaTag(averageTag.toFixed(2))

      // ORDERS SENDED
      let totalTotal = ordersAtendidosTotal.length
      setTotalOrdersSended(totalTotal)
      let prazTotal = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pTempo < 3 });
      let totalPrazTotal = prazTotal.length
      setOrdersSendedOnTime(totalPrazTotal)
      setOrdersSendedOutOfTime(totalTotal - totalPrazTotal)
      setPercentOrdersSended(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazTotal / totalTotal))

      // ORDERS OPEN
      let openTotal = ordersAbertosTotal.length
      setTotalOrdersOpen(openTotal)
      let prazOpenTotal = ordersAbertosTotal.filter(ordersAbertosTotal => { return ordersAbertosTotal.pTempo < 3 });
      let totalOpenPrazTotal = prazOpenTotal.length
      setOrdersOpenOnTime(totalOpenPrazTotal)
      setOrdersOpenOutOfTime(openTotal - totalOpenPrazTotal)
      setPercentOrdersOpen(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalOpenPrazTotal / openTotal))

      // // SENDED MODES
      let pedidosTranspInterlog = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pTransportadora === 'Interlog' })
      setTranspInterlog(pedidosTranspInterlog.length)
      let pedidosTranspMeli = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pTransportadora === 'vtex:fob_16dc0f6' })
      setTranspMeli(pedidosTranspMeli.length)
      let pedidosTranspCorreios = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pTransportadora === 'correios' })
      setTranspCorreios(pedidosTranspCorreios.length)
      let pedidosTranspBike = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pTransportadora === 'BIKE' })
      setTranspBike(pedidosTranspBike.length)
      let pedidosTranspLocker = ordersAtendidosTotal.filter(ordersAtendidosTotal => { return ordersAtendidosTotal.pTransportadora === 'Clique e retire - Inter' })
      setTranspLocker(pedidosTranspLocker.length)
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


   return (
      <div className="Dashboard" style={{ backgroundColor: "#F5F6FC" }}>
         <button onClick={testeFunc} onChange={setTeste}> {teste}</button>
         <NavBar />
         <div id="body" className="" style={{ height: '44.5vw', backgroundColor: "#F5F6FC" }}>{/* "#F5F6FC" */}
            <div id="visaoGeral" className="d-flex" style={{ marginTop: "15px", marginBottom: "15px", }}>
               <span className="d-flex" style={{ width: "70%" }}>
                  <div className="card-text ms-5"><h5 className="text-muted">Visão geral</h5></div>
               </span>
               <span className="d-flex" style={{ width: "15%" }}>
                  <p className="card-text"><small className="text-muted" onClick={() => { getPedido(); refreshValues() }} >Atualizado: </small></p>
                  <p className="card-text"><small className="text-muted">19:33</small></p>
               </span>
               <span className="d-flex" style={{ width: "15%" }}>
                  <p className="card-text"><small className="text-muted">Período:</small></p>
                  <p className="card-text"><small className="text-muted">Mes Atual ˅</small></p>
               </span>
            </div>
            <div id="lojas" className="" >
               <div className="d-flex mb-4" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }} >
                  <p style={{ marginLeft: '4%' }}></p>
                  <StoreCard logo={logoLojaGalo} backLogoColor={"#303030"} //update style
                     pedidosEnviados={atendidosLdg} atualizarPedidos={setAtendidosLdg} //update Qty
                     prazoEnviados={prazoLdg} atualizarPrazo={setPrazoLdg} //update deadline
                     mediaEnviados={mediaLdg} atualizarMedia={setMediaLdg} //update average
                  />
                  <StoreCard logo={logoInterStore} backLogoColor={"#F5F6FA"} pedidosEnviados={atendidosIs} atualizarPedidos={setAtendidosIs} prazoEnviados={prazoIs} atualizarPrazo={setPrazoIs} mediaEnviados={mediaIs} atualizarMedia={setMediaIs} />
                  <StoreCard logo={logoMRV} backLogoColor={"#4FB385"} pedidosEnviados={atendidosMrv} atualizarPedidos={setAtendidosMrv} prazoEnviados={prazoMrv} atualizarPrazo={setPrazoMrv} mediaEnviados={mediaMrv} atualizarMedia={setMediaMrv} />
                  <StoreCard logo={logoInterPass} backLogoColor={"#F5F6FA"} pedidosEnviados={atendidosTag} atualizarPedidos={setAtendidosTag} prazoEnviados={prazoTag} atualizarPrazo={setPrazoTag} mediaEnviados={mediaTag} atualizarMedia={setMediaTag} />
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