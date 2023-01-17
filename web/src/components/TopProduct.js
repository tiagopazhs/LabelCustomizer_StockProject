import landscape from "../assets/landscape.png";

export default function TopProducts(props) {

    let data = ""
    let dataImg = landscape
    let dataDesc = 'loading...'

    //verify if there are data in the requisition
    if(!props.details){
        return
    }
    //verfy if it is a null item
    else if(Array.isArray(props.details)){
        data = props.details
        if(data.length > 0) {dataImg = props.details[0].pImg; dataDesc = props.details[0].pDesc}
    }

    
    return (
        <div className="d-flex w-auto h-25 ps-3"  >
            <div className="d-flex "  style={{ justifyContent: "start", alignItems: "center", borderStyle: "solid", borderTopColor: "transparent", borderWidth: "2px", borderLeftColor: "transparent", borderRightColor: "transparent", borderBottomColor: "#E1E4ED" }}>
                <img className="p-2 ps-4 pt-0" style={{ width: "80px", height: "40px" }} src={dataImg}></img>
                <small className="ps-3" style={{ width: "305px" }}>{dataDesc}</small>
                <small className="ps-2" style={{ fontWeight: "bold" }} >{props.qty}</small>
                <small className="ps-2"  >vendas</small>
            </div>
        </div>
    )
}