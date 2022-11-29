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

function Dash() {

   //function that will be used to get orders scheduled
   // useEffect(() => {
   //     const myInterval = window.setInterval(function(){
   //         getPedido()
   //       }, 6000000);
   //     return () => clearInterval(myInterval);
   //   }, []);

   // Set variable that will be used to receive  the get orders data.
   const [currentOrdersResult, setCurrentOrdersResult] = useState([]);

   // Set variables that will be used to orders with status: Atendido
   const [atendidosLdg, setAtendidosLdg] = useState(0);
   const [prazoLdg, setPrazoLdg] = useState(0);
   const [atendidosIs, setAtendidosIs] = useState(0);
   const [prazoIs, setPrazoIs] = useState(0);
   const [atendidosMrv, setAtendidosMrv] = useState(0);
   const [prazoMrv, setPrazoMrv] = useState(0);
   const [atendidosTag, setAtendidosTag] = useState(0);
   const [prazoTag, setPrazoTag] = useState(0);

   //Requisition to get orders
   async function getPedido() {
      const responseGet = await fetch(`${url}/pedidos`);
      const orders = await responseGet.json();
      console.log('orders: ', orders)
      setCurrentOrdersResult(orders)
   }

   //Teste
   function onChangeTest() {
      let ordersAtendidosTotal = currentOrdersResult.pedidosAtendidos

      let LDG = ordersAtendidosTotal.filter(ordersAtendidosTotal => {
         return ordersAtendidosTotal.pLoja === '203619239';
      });
      let totalLDG = LDG.length
      setAtendidosLdg(totalLDG);
      let prazLDG = LDG.filter(LDG => {
         return LDG.pTempo < 3;
      });
      setAtendidosLdg(prazLDG/totalLDG);
      console.log('finalTeste', setAtendidosLdg)
      
      let IS = ordersAtendidosTotal.filter(ordersAtendidosTotal => {
         return ordersAtendidosTotal.pLoja === '203370950';
      });
      setAtendidosIs(IS.length);
      let MRV = ordersAtendidosTotal.filter(ordersAtendidosTotal => {
         return ordersAtendidosTotal.pLoja === '203994140';
      });
      setAtendidosMrv(MRV.length);
      let TAG = ordersAtendidosTotal.filter(ordersAtendidosTotal => {
         return ordersAtendidosTotal.pLoja === '203619241';
      });
      setAtendidosTag(TAG.length);
      console.log('alterou totais')
   }

   //Data charts:
   const dataPie = [
      ["Task", "Hours per Day"],
      ["No prazo", 96],
      ["Em atraso", 4],
   ];
   const optionsPie = {
      pieHole: 0.7,
      is3D: false,
      legend: "none",
      pieSliceText: "none",
      width: "30vh",
      height: "30vh",
      backgroundColor: "none",
      slices: {
         0: { color: "#4EB9C4" },
         1: { color: "#ED3833" },
      },
   };
   const dataMidPie = [
      ["Pac Man", "Percentage"],
      ["", 4],
      ["", 20],
      ["", 45],
   ];
   const optionsMidPie = {
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
   const dataColumn = [
      ["Element", "Density", { role: "style" }],
      ["Interlog", 140, "#F07839"],
      ["Correios", 35, "#F07839"],
      ["Bike", 100, "#F07839"],
      ["Locker", 50, "#F07839"],
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

         <button onClick={() => { getPedido(); onChangeTest() }}>Get
         </button>

         <input value={atendidosLdg} id="inpQty" onChange={setAtendidosLdg}></input>

         <NavBar />
         <div id="body" className="" style={{ height: '44.5vw', backgroundColor: "#F5F6FC" }}>{/* "#F5F6FC" */}
            <div id="visaoGeral" className="d-flex" style={{ marginTop: "15px", marginBottom: "15px", }}>
               <span className="d-flex" style={{ width: "70%" }}>
                  <div className="card-text ms-5"><h5 className="text-muted">Visão geral</h5></div>
               </span>
               <span className="d-flex" style={{ width: "15%" }}>
                  <p className="card-text"><small className="text-muted">Atualizado: </small></p>
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
                  <StoreCard logo={logoLojaGalo} backLogoColor={"#303030"} pedidosEnviados={atendidosLdg} atualizarPedidos={setAtendidosLdg} prazoEnviados={prazoLdg} atualizarPrazo={setPrazoLdg}/>
                  <StoreCard logo={logoInterStore} backLogoColor={"#F5F6FA"} pedidosEnviados={atendidosIs} atualizarPedidos={setAtendidosIs}/>
                  <StoreCard logo={logoMRV} backLogoColor={"#4FB385"} pedidosEnviados={atendidosMrv} atualizarPedidos={setAtendidosMrv}/>
                  <StoreCard logo={logoInterPass} backLogoColor={"#F5F6FA"} pedidosEnviados={atendidosTag} atualizarPedidos={setAtendidosTag}/>
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
                                 data={dataPie}
                                 options={optionsPie}
                                 allowHtml="true"
                              />
                           </div>
                        </div>
                        <div className="card ps-3 pt-3 me-3 mb-3 mt-3" style={{ width: "50%", borderRadius: "15px", backgroundColor: "#F2F2F2", height: "85%" }}>
                           <p className="card-text">Total - 399</p>
                           <p className="card-text">No prazo - 351</p>
                           <p className="card-text">Em atraso - 49</p>
                           <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                              <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} >98% </h3><p className="card-text ps-2 mb-2"> envios no prazo</p>
                           </div>
                        </div>
                     </div>
                     <div className="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
                        <div className="" style={{ width: "50%" }}>
                           <div className="mt-5">
                              <h5 className="text-muted ms-5 mt-2" style={{ position: "absolute", textAlign: "center" }}>Pedidos em aberto</h5>
                              <Chart
                                 chartType="PieChart"
                                 data={dataMidPie}
                                 options={optionsMidPie}
                                 allowHtml='true'
                              />
                           </div>
                        </div>
                        <div className="card ps-3 pt-3 me-3 mb-3 mt-3" style={{ width: "50%", borderRadius: "15px", backgroundColor: "#F2F2F2", height: "85%" }}>
                           <p className="card-text">Total - 38</p>
                           <p className="card-text">No prazo - 35</p>
                           <p className="card-text">Em atraso - 3</p>
                           <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                              <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} >96% </h3><p className="card-text ps-2 mb-2"> pedidos no prazo</p>
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