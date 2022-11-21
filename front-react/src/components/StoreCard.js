import logoMRV from "../assets/logoMRVClollection.png";

export default function StoreCard(props) {
    return (
        <div class="" style={{ height: "15%", width: "20%", marginRight: '4%' }}>
            <div class="card" style={{ borderRadius: "15px" }}>
                <div class="d-flex">
                    <div id="cardComALogo" class="card ms-3 me-5" style={{ backgroundColor: props.backLogoColor, width: "20%", height: "3.2vw", alignItems: "center", justifyContent: "center", marginTop: "-0.5vw", borderRadius: "15px" }}>
                        <img id="isIcon" class="img img-responsive full-width" src={props.logo} alt="icone da empresa pesquisada" style={{ width: "80%", height: "auto" }} />
                    </div>
                    <div class="me-0 pe-0" style={{ width: "60%" }}>
                        <h7 class="card-text d-flex justify-content-end align-items-center me-3 pt-2">Pedidos enviados no mês</h7>
                        <h4 class="card-text d-flex justify-content-end align-items-center me-3 pt-2" style={{ fontWeight: "bold" }} >1758</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div className="d-flex" style={{borderStyle: "solid", borderTopColor: "#F1F5FF", borderWidth: "1px", borderLeftColor: "transparent", borderRightColor: "transparent", borderBottomColor: "transparent"  }}>
                        <small class="text-muted mt-2" style={{ fontWeight: "bold"}}>98%</small>
                        <small class="text-muted mt-2 ms-1">no prazo</small>
                    </div>
                    <div className="d-flex">
                        <small class="text-muted" style={{ fontWeight: "bold" }}>1,03</small>
                        <small class="text-muted ms-1">dias em média para envio</small>
                    </div>
                </div>
            </div>
        </div >
    )
}