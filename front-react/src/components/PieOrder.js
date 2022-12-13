import React, { useEffect, useState} from "react";
import { Chart } from "react-google-charts";

export default function PieOrder(props) {

    // Set deadline variables
    const [totalOrders, setTotalOrders] = useState(0);
    const [ordersOnTime, setOrdersOnTime] = useState(0);
    const [ordersOutOfTime, setOrdersOutOfTime] = useState(0);
    const [percentOrders, setPercentOrders] = useState(0);

    // Variables to use in pie chart
    const [startAngle, setStartAngle] = useState(493);
    const [blueColor, setBlueColor] = useState(55);
    const [redColor, setRedColor] = useState(0);

    //data pie variables
    const data = [
        ["Pac Man", "Percentage"],
        ["", redColor], // red
        ["", 20], // white
        ["", blueColor], // blue
    ];

    //options pie
    const options = {
        legend: "none",
        pieHole: 0.7,
        pieSliceText: "none",
        pieStartAngle: startAngle,
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

    function refreshValues() {
        let ordersConfig = props.orders
        let total = ordersConfig.length
        setTotalOrders(total)
        let onTime = ordersConfig.filter(ordersConfig => { return ordersConfig.pTempoAtraso === 0 });
        let qtyOnTime = onTime.length
        setOrdersOnTime(qtyOnTime)
        setOrdersOutOfTime(total - qtyOnTime)
        let percentOnTime = qtyOnTime / total
        let percentOutTime = 1 - percentOnTime
        setPercentOrders(new Intl.NumberFormat('en-IN', { style: 'percent', maximumFractionDigits: '1', minimumFractionDigits: '1' }).format(percentOnTime))
        setBlueColor(percentOnTime * 55)
        setRedColor(percentOutTime * 55)
        setStartAngle(((percentOnTime * 55) * 4.73) + 230)
    }

    useEffect(() => {
        refreshValues();
    }, []);

    return (
        <>
            <div className="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
                <div className="" style={{ width: "50%" }}>
                    <div className="mt-5">
                        <h5 className="text-muted ms-5 mt-2" style={{ position: "absolute", textAlign: "center" }}>{props.title}</h5>
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            allowHtml='true'
                        />
                    </div>
                </div>
                <div className="card ps-3 pt-3 me-3 mb-3 mt-3" style={{ width: "50%", borderRadius: "15px", backgroundColor: "#F2F2F2", height: "85%" }}>
                    <p className="card-text" >Total - {totalOrders}</p>
                    <p className="card-text" >No prazo - {ordersOnTime}</p>
                    <p className="card-text" >Em atraso - {ordersOutOfTime}</p>
                    <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                        <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} >{percentOrders}</h3><p className="card-text ps-2 mb-2">{props.desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}