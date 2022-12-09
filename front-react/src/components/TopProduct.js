import landscape from "../assets/landscape.png";

export default function TopProducts(props) {

    return (
        <div className="d-flex w-auto h-25"  >
            <div className="d-flex"  style={{ justifyContent: "center", alignItems: "center" }}>
                <img className="w-auto h-100" src={landscape}></img>
                <h6 className="ps-2" onChange={props.refreshValue} >{props.value}</h6>
                <h6 className="ps-2" style={{ fontWeight: "bold" }} onChange={props.refreshQty} >{props.qty}</h6>
                <h6 className="ps-2"  >vendas</h6>
            </div>
        </div>
    )
}