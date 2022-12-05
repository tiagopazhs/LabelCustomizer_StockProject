import React, { useEffect, useState } from "react";

export default function StoreCard(props) {

    let Loja = props.atualizarPedidos

    const [atendidosLoja, setAtendidosLoja] = useState(0);
    const [prazoLoja, setPrazoLoja] = useState(0);
    const [mediaDefault, setMediaDefault] = useState(0);
    const [mediaSpecial, setMediaSpecial] = useState(0);
    const [mediaLoja, setMediaLoja] = useState(0);

    function refreshFieldsValues() {

        setAtendidosLoja(Loja.length) 
        
        let prazoLoja = Loja.filter(Loja => { return Loja.pTempo < 3 && !(Loja.pPrazoEspecial) || Loja.pTempo < 5 && Loja.pPrazoEspecial });
        let totalPrazoLoja = prazoLoja.length
        setPrazoLoja(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazoLoja / atendidosLoja))

        setMediaDefault(averageLoja(Loja.filter(Loja => { return !(Loja.pPrazoEspecial)})).toFixed(2))
        setMediaSpecial(averageLoja(Loja.filter(Loja => { return (Loja.pPrazoEspecial)})).toFixed(2))
        setMediaLoja(averageLoja(atendidosLoja).toFixed(2))
    }

    function averageLoja(list){
        let sumTime = 0
        for (let i = 0; i < list.length; i++) {
            sumTime += list[i].pTempo
        }
        return sumTime / list.length
    }

    //function to refresh values
    useEffect(() => {
        refreshFieldsValues();
    }, [Loja]);

    return (
        <div class="" style={{ height: "15%", width: "20%", marginRight: '4%' }}>
            <div class="card" style={{ borderRadius: "15px" }}>
                <div class="d-flex">
                    <div id="cardComALogo" class="card ms-3 me-5" style={{ backgroundColor: props.backLogoColor, width: "20%", height: "3.2vw", alignItems: "center", justifyContent: "center", marginTop: "-0.5vw", borderRadius: "15px" }}>
                        <img id="isIcon" class="img img-responsive full-width" src={props.logo} alt="icone da empresa pesquisada" style={{ width: "80%", height: "auto" }} />
                    </div>
                    <div class="me-0 pe-0" style={{ width: "60%" }}>
                        <h7 class="card-text d-flex justify-content-end align-items-center me-3 pt-2">Pedidos enviados no mês</h7>
                        <h4 class="card-text d-flex justify-content-end align-items-center me-3 pt-2" style={{ fontWeight: "bold" }} onChange={setAtendidosLoja}>{atendidosLoja}</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div className="d-flex" style={{ borderStyle: "solid", borderTopColor: "#F1F5FF", borderWidth: "1px", borderLeftColor: "transparent", borderRightColor: "transparent", borderBottomColor: "transparent" }}>
                        <small class="text-muted mt-2" style={{ fontWeight: "bold" }} onChange={setPrazoLoja}>{prazoLoja}</small>
                        <small class="text-muted mt-2 ms-1">no prazo</small>
                    </div>
                    <div>
                        {props.backLogoColor != "#303030" &&
                            <div className="d-flex">
                                <small class="text-muted" style={{ fontWeight: "bold" }} onChange={setMediaLoja}>{mediaLoja}</small>
                                <small class="text-muted ms-1">dias em média para envio</small>
                            </div>
                        }
                        {props.backLogoColor === "#303030" &&
                            <div className="d-flex">
                                <small class="text-muted" style={{ fontWeight: "bold" }} onChange={setMediaDefault}>{mediaDefault}</small>
                                <small class="text-muted ms-1">dias em média e </small>
                                <small class="text-muted ms-1" style={{ fontWeight: "bold" }} onChange={setMediaSpecial}>{mediaSpecial}</small>
                                <small class="text-muted ms-1">para personalização</small>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}