//format column chart
export const optionsColumn = {
    legend: "none",
    chartArea: { left: "10%", top: "7%", width: "80%", height: "35%" },
    backgroundColor: "none",
    annotations: {
        textStyle: {
            fontSize: 15,
            bold: true,
            color: "#495769",
        },
        alwaysOutside: true,
        highContrast: false,
    },
    vAxis: {
        baselineColor: "#B8B7BB",
        textStyle: {
            fontSize: 10,
            color: "transparent",
        },
        gridlines: {
            count: 0,
        },     
    },
    hAxis: {
        showEveryText: 7,
        gridlines: { count: 0 },
    },

};

//format table chart
export const optionsTable = {
    allowHtml: true,
    showRowNumber: true,
    height: "53vh",
    hAxis: { textPosition: 'none' },
    cssClassNames: {
        tableCell: 'tableOrder'
    }
};

//format table chart
export const formattersTable = [
    {
        type: "ColorFormat",
        column: 4,
        desc: true,
        ranges: [
            [0, 0, "black", "white"],
            [2, null, "black", "#EE616F"],
            [1, null, "black", "#F7D883"],
        ],
    },
];
