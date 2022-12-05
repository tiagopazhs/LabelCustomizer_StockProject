import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import StoreCard from "../components/StoreCard";
import '../styles.css';
import logoLojaGalo from "../assets/LogoLojaDoGalo4.png";
import logoInterStore from "../assets/logoInterStore.png";
import logoMRV from "../assets/logoMRVClollection2.png";
import logoInterPass from "../assets/logoInterPass.png";
import { Chart } from "react-google-charts";
import { dataSendedPie, optionsSendedPie, dataOpenPie, optionsOpenPie, optionsColumn, dataProductTable, optionsProductTable, formattersProductTable, optionsTable, formattersTable } from "../constants/dashContants";

const moment = require('moment')
moment.locale('pt-br');

const url = "http://localhost:8500";

function Dash() {

   // Set variable that will be used to receive  the get orders data.
   const [currentOrders, setCurrentOrders] = useState([]);
   const [listAtendidos, setListAtendidos] = useState([]);
   const [listAbertos, setListAbertos] = useState([]);
   const [ldgList, setLdgList] = useState([]);
   const [isList, setIsList] = useState([]);
   const [mrvList, setMrvList] = useState([]);
   const [tagList, setTagList] = useState([]);

   // Set deadline variables
   const [totalOrdersSended, setTotalOrdersSended] = useState(0);
   const [ordersSendedOnTime, setOrdersSendedOnTime] = useState(0);
   const [ordersSendedOutOfTime, setOrdersSendedOutOfTime] = useState(0);
   const [percentOrdersSended, setPercentOrdersSended] = useState(0);
   const [totalOrdersOpen, setTotalOrdersOpen] = useState(0);
   const [ordersOpenOnTime, setOrdersOpenOnTime] = useState(0);
   const [ordersOpenOutOfTime, setOrdersOpenOutOfTime] = useState(0);
   const [percentOrdersOpen, setPercentOrdersOpen] = useState(0);

   // Set chart transport variables
   const [transpInterlog, setTranspInterlog] = useState(0);
   const [transpMeLi, setTranspMeli] = useState(0);
   const [transpCorreios, setTranspCorreios] = useState(0);
   const [transpBike, setTranspBike] = useState(0);
   const [transpLocker, setTranspLocker] = useState(0);
   const [dataTableOpen, setDataTableOpen] = useState([["Pedido", "Loja", "Cliente", "Data", "dias atraso"], ["", "", "", "", ""]]);

   const [updatedTime, setUpdatedTime] = useState("00:01")


   // Data Charts
   let dataTable = dataTableOpen;
   let dataColumn = [
      ["Element", "Density", { role: "style" }],
      ["Interlog", transpInterlog, "#F07839"],
      ["Mercado livre", transpMeLi, "#F07839"],
      ["Correios", transpCorreios, "#F07839"],
      ["Bike", transpBike, "#F07839"],
      ["Locker", transpLocker, "#F07839"],
   ];

   //Requisition to get orders
   async function getPedido() {
      let responseGet = await fetch(`${url}/pedidos`);
      let orders = await responseGet.json();
      setCurrentOrders(orders)
      console.log('orders: ', orders)
   }

   let orderListTeste = [
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
   
   teste()

   async function teste() {
      
      let listAtendidos = orderListTeste
      let listOfProducts = [ {item: "532609037", qty: 2} , {item: "GB3495-GG", qty: 3} , {item: "GB3495-M", qty: 1} , {item: "2346", qty: 6} ]
      let z = 0
      let product = ""
      let newProduct = ""
      let qty = ""
      let objIndex = 0

      while (z < listAtendidos.length) {

         console.log(listAtendidos[z].pNumero)

         product = listAtendidos[z].pItens[0].item.codigo  
         qty = parseInt(listAtendidos[z].pItens[0].item.quantidade)
         newProduct = {"item": product, "qty": qty}

         objIndex = listOfProducts.findIndex((obj => obj.item == product.toString()));

         if(objIndex != -1){
            listOfProducts[objIndex].qty = listOfProducts[objIndex].qty + qty

         } else {
            console.log('else')
            listOfProducts = { ...listOfProducts, ...newProduct }
         }
         z++
      }
      console.log(listOfProducts)
   }

   //Refresh values on the dashboard
   function refreshValues() {

      const notOpen = ['Atendido', 'Devolvido', 'Cancelado']
      setListAtendidos(currentOrders.filter(currentOrders => { return currentOrders.pStatus === 'Atendido' }))
      setListAbertos(currentOrders.filter(currentOrders => { return notOpen.indexOf(currentOrders.pStatus) === -1 }))

      // Stores values
      setLdgList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619239' }))
      setIsList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203370950' }))
      setMrvList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203994140' }))
      setTagList(listAtendidos.filter(listAtendidos => { return listAtendidos.pLoja === '203619241' }))

      // Sended orders
      let totalTotal = listAtendidos.length
      setTotalOrdersSended(totalTotal)
      let prazTotal = listAtendidos.filter(listAtendidos => { return listAtendidos.pTempo < 3 && !(listAtendidos.pPrazoEspecial) || listAtendidos.pTempo < 5 && listAtendidos.pPrazoEspecial });
      let totalPrazTotal = prazTotal.length
      setOrdersSendedOnTime(totalPrazTotal)
      setOrdersSendedOutOfTime(totalTotal - totalPrazTotal)
      setPercentOrdersSended(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalPrazTotal / totalTotal))

      // Open orders
      let openTotal = listAbertos.length
      setTotalOrdersOpen(openTotal)
      let prazOpenTotal = listAbertos.filter(listAbertos => { return listAbertos.pTempo < 3 && !(listAbertos.pPrazoEspecial) || listAbertos.pTempo < 5 && listAbertos.pPrazoEspecial });
      let totalOpenPrazTotal = prazOpenTotal.length
      setOrdersOpenOnTime(totalOpenPrazTotal)
      setOrdersOpenOutOfTime(openTotal - totalOpenPrazTotal)
      setPercentOrdersOpen(new Intl.NumberFormat('en-IN', { style: 'percent' }).format(totalOpenPrazTotal / openTotal))

      // sended orders by mode
      let pedidosTranspInterlog = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'Interlog' })
      setTranspInterlog(pedidosTranspInterlog.length)
      let pedidosTranspMeli = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'vtex:fob_16dc0f6' })
      setTranspMeli(pedidosTranspMeli.length)
      let pedidosTranspCorreios = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'correios' })
      setTranspCorreios(pedidosTranspCorreios.length)
      let pedidosTranspBike = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'BIKE' })
      setTranspBike(pedidosTranspBike.length)
      let pedidosTranspLocker = listAtendidos.filter(listAtendidos => { return listAtendidos.pTransportadora === 'Clique e retire - Inter' })
      setTranspLocker(pedidosTranspLocker.length)

      // top 5 best selling products

      // table of open orders
      const storesNumbers = ["203619239", "203370950", "203994140", "203619241"]
      const storesName = ["Loja do Galo", "InterStore", "Loja MRV", "Intertag"]
      let dataTable = [["Pedido", "Loja", "Cliente", "Data", "dias atraso"]]
      let dataTableResult = []
      let storeIndice = -1
      let aux = 0
      let currentOrder = []
      let dataTableAdd = []
      while (aux < listAbertos.length) {
         dataTableResult = []
         currentOrder = listAbertos[aux]
         storeIndice = storesNumbers.indexOf(currentOrder.pLoja)
         dataTableAdd = [
            currentOrder.pNumero,
            storesName[storeIndice],
            currentOrder.pCliente,
            moment(currentOrder.pDataCriacao).format("DD/MM"),
            currentOrder.pTempoAtraso
         ]
         dataTableResult = [...dataTable, [...dataTableAdd]]
         dataTable = dataTableResult
         aux++
      }
      setDataTableOpen(dataTable)

      // last update time
      setUpdatedTime(moment().format('hh:mm'))

   }

   // function that to get orders scheduled
   useEffect(() => {
      const myInterval = window.setInterval(function () {
         getPedido();
         refreshValues()
      }, 1800000); // repeat every 180 seconds
      return () => clearInterval(myInterval);
   }, []);


   //refresh values when there are something new
   useEffect(() => {
      refreshValues()
   }, [currentOrders]);

   return (
      <div className="Dashboard" style={{ backgroundColor: "#F5F6FC" }}>
         <NavBar />
         <div id="body" className="" style={{ height: '44.5vw', backgroundColor: "#F5F6FC" }}>{/* "#F5F6FC" */}
            <div id="visaoGeral" className="d-flex" style={{ marginTop: "15px", marginBottom: "15px", }}>
               <span className="d-flex" style={{ width: "70%" }}>
                  <div className="card-text ms-5"><h5 className="text-muted">Visão geral</h5></div>
               </span>
               <span className="d-flex" style={{ width: "15%" }}>
                  <p className="card-text"><small className="text-muted" onClick={() => { getPedido() }} >Atualizado: </small></p>
                  <p className="card-text"><small className="text-muted ms-1" onChange={setUpdatedTime} >{updatedTime}</small></p>
               </span>
               <span className="d-flex" style={{ width: "15%" }}>
                  <p className="card-text"><small className="text-muted">Período:</small></p>
                  <p className="card-text"><small className="text-muted ms-1">Mes Atual</small></p>
               </span>
            </div>
            <div id="lojas" className="" >
               <div className="d-flex mb-4" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }} >
                  <p style={{ marginLeft: '4%' }}></p>
                  <StoreCard logo={logoLojaGalo} backLogoColor={"#303030"} atualizarPedidos={ldgList} />
                  <StoreCard logo={logoInterStore} backLogoColor={"#F5F6FA"} atualizarPedidos={isList} />
                  <StoreCard logo={logoMRV} backLogoColor={"#4FB385"} atualizarPedidos={mrvList} />
                  <StoreCard logo={logoInterPass} backLogoColor={"#F5F6FA"} atualizarPedidos={tagList} />
               </div>
            </div>
            <div id="bodyDown" className="d-flex ps-4 pe-4" style={{ height: '72%', width: "100%" }}>
               <div className="pedidos" style={{ width: "66%" }}>
                  <div id="pedidosUp" className="" style={{ display: 'flex' }}>
                     <div className="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
                        <div className="" style={{ width: "50%" }}>
                           <div className="mt-5">
                              <h5 className="text-muted ms-5 mt-2" style={{ position: "absolute", textAlign: "center" }}>Pedidos enviados</h5>
                              <Chart
                                 chartType="PieChart"
                                 data={dataSendedPie}
                                 options={optionsSendedPie}
                                 allowHtml="true"
                              />
                           </div>
                        </div>
                        <div className="card ps-3 pt-3 me-3 mb-3 mt-3" style={{ width: "50%", borderRadius: "15px", backgroundColor: "#F2F2F2", height: "85%" }}>
                           <p className="card-text" onChange={setTotalOrdersSended}>Total - {totalOrdersSended}</p>
                           <p className="card-text" onChange={setOrdersSendedOnTime}>No prazo - {ordersSendedOnTime}</p>
                           <p className="card-text" onChange={setOrdersSendedOutOfTime}>Em atraso - {ordersSendedOutOfTime}</p>
                           <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                              <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} onChange={setPercentOrdersSended}>{percentOrdersSended}</h3><p className="card-text ps-2 mb-2"> envios no prazo</p>
                           </div>
                        </div>
                     </div>
                     <div className="card m-4" style={{ borderRadius: "15px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50%", height: "27.5vh" }}>
                        <div className="" style={{ width: "50%" }}>
                           <div className="mt-5">
                              <h5 className="text-muted ms-5 mt-2" style={{ position: "absolute", textAlign: "center" }}>Pedidos em aberto</h5>
                              <Chart
                                 chartType="PieChart"
                                 data={dataOpenPie}
                                 options={optionsOpenPie}
                                 allowHtml='true'
                              />
                           </div>
                        </div>
                        <div className="card ps-3 pt-3 me-3 mb-3 mt-3" style={{ width: "50%", borderRadius: "15px", backgroundColor: "#F2F2F2", height: "85%" }}>
                           <p className="card-text" onChange={setTotalOrdersOpen}>Total - {totalOrdersOpen}</p>
                           <p className="card-text" onChange={setOrdersOpenOnTime}>No prazo - {ordersOpenOnTime}</p>
                           <p className="card-text" onChange={setOrdersOpenOutOfTime}>Em atraso - {ordersOpenOutOfTime}</p>
                           <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                              <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} onChange={setPercentOrdersOpen}>{percentOrdersOpen}</h3><p className="card-text ps-2 mb-2"> pedidos no prazo</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div id="pedidosDown" className="" style={{ display: 'flex' }}>
                     <div className="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                        <h5 className="text-muted mt-3" style={{ textAlign: "center" }}>Modais de envio</h5>
                        <div>
                           <Chart chartType="ColumnChart" width="100%" height="400px" data={dataColumn} options={optionsColumn} />
                        </div>
                     </div>
                     <div className="card m-4" style={{ borderRadius: "15px", width: "50%", height: "27.5vh" }}>
                        <h5 className="text-muted mt-3" style={{ textAlign: "center" }}>Produtos com maior saída</h5>
                        <Chart
                           chartType="Table"
                           height="95%"
                           data={dataProductTable}
                           options={optionsProductTable}
                           formatters={formattersProductTable}
                        />
                     </div>
                  </div>
               </div>
               <div id="listaPedidos" className="" style={{ width: "33%" }}>
                  <div className="card m-4" style={{ borderRadius: "15px", height: "60.3vh" }}>
                     <h5 className="text-muted  mt-3" style={{ textAlign: "center" }}>Pedidos em aberto</h5>
                     <Chart
                        chartType="Table"
                        data={dataTable}
                        options={optionsTable}
                        formatters={formattersTable}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
};

export default Dash;