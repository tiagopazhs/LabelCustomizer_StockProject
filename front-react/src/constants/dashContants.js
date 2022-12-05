

export const dataSendedPie = [
    ["Pac Man", "Percentage"],
    ["", 4],
    ["", 20],
    ["", 45],
 ];

 export const optionsSendedPie = {
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
 export const dataOpenPie = [
    ["Pac Man", "Percentage"],
    ["", 12], // red
    ["", 20], // white
    ["", 38], // blue
 ];
 export const optionsOpenPie = {
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
 export const dataColumn = [
    ["Element", "Density", { role: "style" }],
    ["Interlog", transpInterlog, "#F07839"],
    ["Mercado livre", transpMeLi, "#F07839"],
    ["Correios", transpCorreios, "#F07839"],
    ["Bike", transpBike, "#F07839"],
    ["Locker", transpLocker, "#F07839"],
 ];

 export const optionsColumn = {
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

 export const optionsTable = {
    allowHtml: true,
    showRowNumber: true,
    height: "53vh",
    hAxis: { textPosition: 'none' },
    cssClassNames: {
       tableCell: 'tableOrder'
    },
 };
 export const formattersTable = [
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
 export const dataProductTable = [
    ["", "", ""],
    ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 2],
    ["img", "Interpig - laranja especificação: único", 0],
    ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 2],
    ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 1],
    ["img", "Camisa Masculina Adidas Atlético Mineiro II 2022 Tamanho:G", 3],
 ];

 export const optionsProductTable = {
    allowHtml: true,
    showRowNumber: true,
    allowHtml: true,
    legend: "none",
    height: "20vh",
    cssClassNames: { tableCell: 'classTable', headerCell: 'noHeader' },
 };
 export const formattersProductTable = [
 ];