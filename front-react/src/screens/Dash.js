import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import StoreCard from "../components/StoreCard";
import '../styles.css';
import logoMRV from "../assets/logoMRVClollection.png";
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

    //Requisition to get orders
    async function getPedido() {
        const responseGet = await fetch(`${url}/pedidos`);
        const orders = await responseGet.json();
        console.log(orders)
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
        position: "absolute",
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
        paddingTop:"150vh",
        backgroundColor: "none",
    };

    const backLogoColor2 = "#4FB385"

    return (
        <div className="Dashboard" style={{ backgroundColor: "#F5F6FC" }}>
            <NavBar />
            <div id="body" className="" style={{ height: '44.5vw', backgroundColor: "#F5F6FC" }}>{/* "#F5F6FC" */}
                <div id="visaoGeral" className="d-flex" style={{ marginTop: "15px", marginBottom: "15px", }}>
                    <span className="d-flex" style={{ width: "70%" }}>
                        <p class="card-text m-4"><h5 class="text-muted">Visão geral</h5></p>
                    </span>
                    <span className="d-flex" style={{ width: "15%" }}>
                        <p class="card-text"><small class="text-muted">Atualizado: </small></p>
                        <p class="card-text"><small class="text-muted">19:33</small></p>
                    </span>
                    <span className="d-flex" style={{ width: "15%" }}>
                        <p class="card-text"><small class="text-muted">Período:</small></p>
                        <p class="card-text"><small class="text-muted">Mes Atual ˅</small></p>
                    </span>
                </div>
                <div id="lojas" className="" >
                    <div class="d-flex mb-4" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }} >
                        <p style={{ marginLeft: '4%' }}></p>
                        <StoreCard logo={logoMRV} backLogoColor={"#4FB385"}/>
                        <StoreCard logo={logoMRV} backLogoColor={"#4FB385"}/>
                        <StoreCard logo={logoMRV} backLogoColor={"#4FB385"}/>
                        <StoreCard logo={logoMRV} backLogoColor={"#4FB385"}/>
                    </div>
                </div>
                <div id="bodyDown" class="d-flex ps-4 pe-4" style={{ height: '72%', width: "100%" }}>
                    <div className="pedidos" style={{ width: "66%" }}>
                        <div id="pedidosUp" className="" style={{ display: 'flex' }}>
                            <div class="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
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
                                    <p class="card-text">Total - 399</p>
                                    <p class="card-text">No prazo - 351</p>
                                    <p class="card-text">Em atraso - 49</p>
                                    <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                                        <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} >98% </h3><p class="card-text ps-2 mb-2"> envios no prazo</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
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
                                    <p class="card-text">Total - 38</p>
                                    <p class="card-text">No prazo - 35</p>
                                    <p class="card-text">Em atraso - 3</p>
                                    <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                                        <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} >96% </h3><p class="card-text ps-2 mb-2"> pedidos no prazo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="pedidosDown" className="" style={{ display: 'flex' }}>
                            <div class="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                                <h5 className="text-muted" style={{ textAlign: "center" }}>Modais de envio</h5>
                            </div>
                            <div class="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                                <h5 className="text-muted" style={{ textAlign: "center" }}>Produtos com maior saída</h5>
                            </div>
                        </div>
                    </div>
                    <div id="listaPedidos" className="" style={{ width: "33%" }}>
                        <div class="card m-4" style={{ borderRadius: "15px", height: "60.3vh" }}>
                            <h5 className="text-muted" style={{ textAlign: "center" }}>Pedidos em aberto</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* orders
            <button // clean input fields
                onClick={getPedido}
                >Get
            </button> */}
        </div>
    )
};

export default Dash;