export default function SubNavBar(props) {
    return (
        <div id="visaoGeral" className="d-flex" style={{ marginTop: "15px", marginBottom: "15px", }}>
            <span className="d-flex" style={{ width: "70%" }}>
                <div className="card-text ms-5"><h5 className="text-muted">Visão geral</h5></div>
            </span>
            <span className="d-flex" style={{ width: "15%" }}>
                <p className="card-text"><small className="text-muted" >Atualizado: </small></p>
                <p className="card-text"><small className="text-muted ms-1" >{props.updatedTime}</small></p>
            </span>
            <span className="d-flex" style={{ width: "15%" }}>
                <p className="card-text"><small className="text-muted" >Período:</small></p>
                <p className="card-text"><small className="text-muted ms-1">Mes Atual</small></p>
            </span>
        </div>
    )
}