export const dataSendedPie = [
    ["Pac Man", "Percentage"],
    ["", 0],
    ["",],
    ["", 37],
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

// export const dataOpenPie = [
//     ["Pac Man", "Percentage"],
//     ["", 2], // red
//     ["", 20], // white
//     ["", 48], // blue
// ];

// export const optionsOpenPie = {
//     legend: "none",
//     pieHole: 0.7,
//     pieSliceText: "none",
//     pieStartAngle: 120,
//     // pieStartAngle: 260,
//     // pieStartAngle: 233,
//     // pieStartAngle: 129,
//     tooltip: { trigger: "none" },
//     slices: {
//         0: { color: "#ED3833" },
//         1: { color: "transparent" },
//         2: { color: "#4EB9C4" },
//     },
//     width: "30vh",
//     height: "30vh",
//     paddingTop: "150vh",
//     backgroundColor: "none",
// };


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

        //    viewWindow: {
        //     min: 0,
        //     max: 100,
        //     },        
    },
    hAxis: {
        showEveryText: 7,
        gridlines: { count: 0 },
    },

};

export const optionsTable = {
    allowHtml: true,
    showRowNumber: true,
    height: "53vh",
    hAxis: { textPosition: 'none' },
    cssClassNames: {
        tableCell: 'tableOrder'
    }
};

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

export const orderListTeste = [
    {
        "pNumero": "183496",
        "pLoja": "203619239",
        "pStatus": "Em andamento",
        "pCliente": "Samira Olivé Domingos",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "532609037",
                    "descricao": "Chinelo Havaianas Clube Atlético Mineiro 37/38",
                    "quantidade": "1.0000",
                    "valorunidade": "41.7200000000",
                    "precocusto": "31.6900000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "0",
                    "altura": "0",
                    "profundidade": "0",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7909843404507"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183497",
        "pLoja": "203619239",
        "pStatus": "Em andamento",
        "pCliente": "Larissa Costa",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "2346",
                    "descricao": "Copo Munich Galo - 200 ml",
                    "quantidade": "1.0000",
                    "valorunidade": "33.9000000000",
                    "precocusto": "13.9600000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7899790223880"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183498",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Lorrayne Pereira",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3495-G",
                    "descricao": "Camisa Masculina Adidas Atlético Mineiro 2022 - Jogo 3 G",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425849104"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Nome e Número",
                    "descricao": "Personalização Nome e Número",
                    "quantidade": "1.0000",
                    "valorunidade": "49.9000000000",
                    "precocusto": "20.0000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "78921535"
                }
            }
        ],
        "pPrazoEspecial": true,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183499",
        "pLoja": "203619239",
        "pStatus": "Verificado",
        "pCliente": "Lorrayne Pereira",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3495-G",
                    "descricao": "Camisa Masculina Adidas Atlético Mineiro 2022 - Jogo 3 G",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425849104"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Nome e Número",
                    "descricao": "Personalização Nome e Número",
                    "quantidade": "1.0000",
                    "valorunidade": "49.9000000000",
                    "precocusto": "20.0000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "78921535"
                }
            }
        ],
        "pPrazoEspecial": true,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183500",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Sonia Araújo",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "CAM701",
                    "descricao": "Bola Futebol de Campo Escudos",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "49.9000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.40000",
                    "largura": "35",
                    "altura": "55",
                    "profundidade": "35",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7898381260846"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183501",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Gabriel Araujo",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3495-G",
                    "descricao": "Camisa Masculina Adidas Atlético Mineiro 2022 - Jogo 3 G",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425849104"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183502",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Sonia Araújo",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "CAM701",
                    "descricao": "Bola Futebol de Campo Escudos",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "49.9000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.40000",
                    "largura": "35",
                    "altura": "55",
                    "profundidade": "35",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7898381260846"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183507",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "lucas silva",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "CAM047",
                    "descricao": "Chaveiro Emborrachado Escudo Atlético Mineiro",
                    "quantidade": "1.0000",
                    "valorunidade": "18.9900000000",
                    "precocusto": "7.9000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.10000",
                    "largura": "15",
                    "altura": "2",
                    "profundidade": "20",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7890959180471"
                }
            },
            {
                "item": {
                    "codigo": "CMOGGPVG",
                    "descricao": "Camiseta Masculina \"O Galo Ganhô\" G",
                    "quantidade": "1.0000",
                    "valorunidade": "83.9000000000",
                    "precocusto": "34.9000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7908435401733"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183508",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "PRD17305",
                    "descricao": "Camiseta Infantil Atlético Mineiro Copa do Mundo 2022 GG",
                    "quantidade": "1.0000",
                    "valorunidade": "99.9000000000",
                    "precocusto": "36.7200000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "0",
                    "altura": "0",
                    "profundidade": "0",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "3317555520745"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183509",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "PRD17305",
                    "descricao": "Camiseta Infantil Atlético Mineiro Copa do Mundo 2022 GG",
                    "quantidade": "1.0000",
                    "valorunidade": "99.9000000000",
                    "precocusto": "36.7200000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "0",
                    "altura": "0",
                    "profundidade": "0",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "3317555520745"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183510",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "000069",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta M",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "000070",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta G",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183511",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "PRD17305",
                    "descricao": "Camiseta Infantil Atlético Mineiro Copa do Mundo 2022 GG",
                    "quantidade": "1.0000",
                    "valorunidade": "99.9000000000",
                    "precocusto": "36.7200000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "0",
                    "altura": "0",
                    "profundidade": "0",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "3317555520745"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183512",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "000070",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta G",
                    "quantidade": "2.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "000058",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Branca M",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183513",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Jacquez Montero",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "100024",
                    "descricao": "Creatina + Malto  Suplementos da  Massa - Limão - 300ml Creatina + Malto Suplementos da Massa - Limão - 300ml",
                    "quantidade": "1.0000",
                    "valorunidade": "110.0000000000",
                    "precocusto": "55.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "0",
                    "altura": "0",
                    "profundidade": "0",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7895099842999"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183514",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "000069",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta M",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "000070",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta G",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183515",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "000070",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta G",
                    "quantidade": "2.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "000058",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Branca M",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183516",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "000070",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta G",
                    "quantidade": "2.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "000058",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Branca M",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "PRD17305",
                    "descricao": "Camiseta Infantil Atlético Mineiro Copa do Mundo 2022 GG",
                    "quantidade": "1.0000",
                    "valorunidade": "99.9000000000",
                    "precocusto": "36.7200000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "0",
                    "altura": "0",
                    "profundidade": "0",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "3317555520745"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183517",
        "pLoja": "203619239",
        "pStatus": "Em andamento",
        "pCliente": "Karine Parra",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "000070",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Preta G",
                    "quantidade": "2.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "000058",
                    "descricao": "Camiseta Feminina Copa do Mundo 2022 \"Aqui é Galo\" - Branca M",
                    "quantidade": "1.0000",
                    "valorunidade": "119.9000000000",
                    "precocusto": "48.5000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            },
            {
                "item": {
                    "codigo": "PRD17305",
                    "descricao": "Camiseta Infantil Atlético Mineiro Copa do Mundo 2022 GG",
                    "quantidade": "1.0000",
                    "valorunidade": "99.9000000000",
                    "precocusto": "36.7200000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.00000",
                    "largura": "0",
                    "altura": "0",
                    "profundidade": "0",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "3317555520745"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183524",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "ERICK JONAS ROSSETO",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183525",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "CLEBSON DANTAS DE SOUZA",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183526",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "NICKSON PERINI",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183527",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "JOSE RAFAEL EMANUEL VALADARES",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183528",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "LEANDRO ALVES DE OLIVEIRA",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183529",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "WESLEY ALVES DA SILVA",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183530",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "CARLITO DE JESUS SILVA",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183531",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "CAETANO DE ANDRADE SILVA",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183532",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "COSME MOURA SILVA",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183724",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "MAURICIO NOVA SILVA",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183725",
        "pLoja": "203619241",
        "pStatus": "Atendido",
        "pCliente": "PAULO ROGERIO LUIZ",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "intertag01",
                    "descricao": "Inter Tag",
                    "quantidade": "1.0000",
                    "valorunidade": "25.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "100.00000",
                    "largura": "12",
                    "altura": "15",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183741",
        "pLoja": "203619239",
        "pStatus": "Em andamento",
        "pCliente": "Neuza Santos",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "10845",
                    "descricao": "Copo Americano Escudo - 190 ml",
                    "quantidade": "6.0000",
                    "valorunidade": "21.9000000000",
                    "precocusto": "8.6900000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7899790245301"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183742",
        "pLoja": "203370950",
        "pStatus": "Atendido",
        "pCliente": "FREDERICO CORREA FERREIRA DE MELO",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "VT-HCC2019P",
                    "descricao": "Vinho Tinto - Herdade do Catapereiro Colheita (2019) - Português",
                    "quantidade": "1.0000",
                    "valorunidade": "94.0000000000",
                    "precocusto": "0.0000000000",
                    "descontoItem": "0.00",
                    "un": "UN",
                    "pesoBruto": "1.00000",
                    "largura": "28",
                    "altura": "16",
                    "profundidade": "36",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": ""
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Entrega Local"
    },
    {
        "pNumero": "183743",
        "pLoja": "203619239",
        "pStatus": "Em aberto",
        "pCliente": "GILMAR REIS",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3487-G",
                    "descricao": "Camisa Masculina Adidas Atlético Mineiro 2022 - Jogo 1 G",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0923004150",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425826020"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Nome e Número",
                    "descricao": "Personalização Nome e Número",
                    "quantidade": "1.0000",
                    "valorunidade": "49.9000000000",
                    "precocusto": "20.0000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "78921535"
                }
            }
        ],
        "pPrazoEspecial": true,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "183889",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Letícia Barros",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3537-PP",
                    "descricao": "Camisa Feminina Adidas Atlético Mineiro 2022 - Jogo 3 PP",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425868389"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Nome e Número",
                    "descricao": "Personalização Nome e Número",
                    "quantidade": "1.0000",
                    "valorunidade": "49.9000000000",
                    "precocusto": "20.0000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "78921535"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Nome e Número",
                    "descricao": "Personalização Nome e Número",
                    "quantidade": "1.0000",
                    "valorunidade": "49.9000000000",
                    "precocusto": "20.0000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "78921535"
                }
            },
            {
                "item": {
                    "codigo": "GB3495-M",
                    "descricao": "Camisa Masculina Adidas Atlético Mineiro 2022 - Jogo 3 M",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425849111"
                }
            }
        ],
        "pPrazoEspecial": true,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "184124",
        "pLoja": "203619239",
        "pStatus": "Em andamento",
        "pCliente": "Renato Wanderley Dias Dias",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "FBCPPMLG",
                    "descricao": "Camisa Polo Masculina Manga Longa - Preta G",
                    "quantidade": "1.0000",
                    "valorunidade": "129.9000000000",
                    "precocusto": "64.9500000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.23000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7890000156936"
                }
            },
            {
                "item": {
                    "codigo": "FBCPBMLG",
                    "descricao": "Camisa Polo Masculina Manga Longa - Branca G",
                    "quantidade": "1.0000",
                    "valorunidade": "129.9000000000",
                    "precocusto": "64.9500000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.23000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7890000157001"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "184627",
        "pLoja": "203619239",
        "pStatus": "Verificado",
        "pCliente": "Henri Barboni",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3495-G",
                    "descricao": "Camisa Masculina Adidas Atlético Mineiro 2022 - Jogo 3 G",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425849104"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Nome e Número",
                    "descricao": "Personalização Nome e Número",
                    "quantidade": "1.0000",
                    "valorunidade": "49.9000000000",
                    "precocusto": "20.0000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "78921535"
                }
            }
        ],
        "pPrazoEspecial": true,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "correios"
    },
    {
        "pNumero": "184633",
        "pLoja": "203619239",
        "pStatus": "Cancelado",
        "pCliente": "Fernanda Carvalho",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3536-P",
                    "descricao": "Camisa Feminina Adidas Atlético Mineiro 2022 - Jogo 2 P",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425897358"
                }
            }
        ],
        "pPrazoEspecial": false,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "Interlog"
    },
    {
        "pNumero": "184652",
        "pLoja": "203619239",
        "pStatus": "Em personalização",
        "pCliente": "Diego Lacerda",
        "pDataCriacao": "2022-12-05",
        "pDataEnvioFormat": 0,
        "pItens": [
            {
                "item": {
                    "codigo": "GB3495-P",
                    "descricao": "Camisa Masculina Adidas Atlético Mineiro 2022 - Jogo 3 P",
                    "quantidade": "1.0000",
                    "valorunidade": "299.9900000000",
                    "precocusto": "145.0900000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.20000",
                    "largura": "15",
                    "altura": "9",
                    "profundidade": "23",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "4065425849135"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Nome e Número",
                    "descricao": "Personalização Nome e Número",
                    "quantidade": "1.0000",
                    "valorunidade": "49.9000000000",
                    "precocusto": "20.0000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "78921535"
                }
            },
            {
                "item": {
                    "codigo": "Personalização - Patchs",
                    "descricao": "Personalização Patchs",
                    "quantidade": "1.0000",
                    "valorunidade": "45.9000000000",
                    "precocusto": "16.9000000000",
                    "descontoItem": "0.00",
                    "un": "un",
                    "pesoBruto": "0.00100",
                    "largura": "1",
                    "altura": "1",
                    "profundidade": "1",
                    "descricaoDetalhada": "",
                    "unidadeMedida": "cm",
                    "gtin": "7891000242698"
                }
            }
        ],
        "pPrazoEspecial": true,
        "pTempo": 0,
        "pTempoAtraso": 0,
        "pTransportadora": "correios"
    }
]
