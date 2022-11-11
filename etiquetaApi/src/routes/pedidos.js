const express = require('express');
const app = express();
const router = require("express").Router();
const https = require('https')
const axios = require('axios');
const { Console } = require('console');
const url = "https://bling.com.br/b"
const apiKey = "31504fef3824785bc4c7baabbf332d8d146b533eb7a517632ec18573ae351d3964353a70"
let date = new Date();
let day = ("00" + date.getDate()).slice(-2);
let month = ("00" + (date.getMonth()+1)).slice(-2);
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;

//create an instane to solve cors problems
const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false,
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
  })
});

const orderList = [
    {
    pedido: {
      desconto: '13,77',
      observacoes: '',
      observacaointerna: '',
      data: '2022-11-09',
      numero: '174434',
      numeroOrdemCompra: '',
      vendedor: '',
      valorfrete: '8.77',
      outrasdespesas: '0.00',
      totalprodutos: '105.90',
      totalvenda: '100.90',
      situacao: 'Atendido',
      dataSaida: '2022-11-08',
      loja: '203619239',
      numeroPedidoLoja: '1274880602997-01',
      tipoIntegracao: 'VTex',
      cliente: {
        id: '13141545976',
        nome: 'Gustavo Artiaga',
        cnpj: '55148506687',
        ie: '',
        rg: '',
        endereco: 'Rua Rita Viana',
        numero: '81',
        complemento: 'Casa',
        cidade: 'Pedro Leopoldo',
        bairro: 'Pedro Henrique  (Doutor Lund)',
        cep: '33250524',
        uf: 'MG',
        email: 'guartiaga@gmail.com',
        celular: '',
        fone: '(31) 99630-3272'
      },
      pagamento: { categoria: 'Vendas' },
      nota: {
        serie: '1',
        numero: '075993',
        dataEmissao: '2022-11-09 11:09:55',
        situacao: '7',
        valorNota: '100.90',
        chaveAcesso: '31221135119784000156550010000759931274499470'
      },
      transporte: {
        transportadora: 'Interlog',
        cnpj: '08957212000173',
        tipo_frete: 'R',
        qtde_volumes: '1',
        enderecoEntrega: [Object],
        volumes: [Array],
        servico_correios: 'Expresso'
      },
      intermediador: {
        cnpj: '05.314.972/0001-74',
        nomeUsuario: 'vtexappkey-shoppingdamassa-FAWYRF'
      },
      itens: [ [Object] ],
      parcelas: [ [Object] ],
      codigosRastreamento: { codigoRastreamento: '174434' }
    }
  },
  {
    pedido: {
      desconto: '0,00',
      observacoes: '',
      observacaointerna: '',
      data: '2022-11-09',
      numero: '174435',
      numeroOrdemCompra: '',
      vendedor: '',
      valorfrete: '9.47',
      outrasdespesas: '0.00',
      totalprodutos: '199.80',
      totalvenda: '209.27',
      situacao: 'Atendido',
      dataSaida: '2022-11-08',
      loja: '203619239',
      numeroPedidoLoja: '1274890602999-01',
      tipoIntegracao: 'VTex',
      cliente: {
        id: '15889431652',
        nome: 'Karine Fronza',
        cnpj: '05333939900',
        ie: null,
        rg: '',
        endereco: 'Rua ponta grossa',
        numero: '33',
        complemento: 'Ato 01',
        cidade: 'Apiúna',
        bairro: 'Centro',
        cep: '89135000',
        uf: 'SC',
        email: 'ka_efi@yahoo.com.br',
        celular: '',
        fone: '(31) 98281-5555'
      },
      pagamento: { categoria: 'Vendas' },
      nota: {
        serie: '1',
        numero: '075999',
        dataEmissao: '2022-11-09 11:09:23',
        situacao: '7',
        valorNota: '209.27',
        chaveAcesso: '31221135119784000156550010000759991274510800'
      },
      transporte: {
        transportadora: 'Interlog',
        cnpj: '08957212000173',
        tipo_frete: 'R',
        qtde_volumes: '1',
        enderecoEntrega: [Object],
        volumes: [Array],
        servico_correios: 'Expresso'
      },
      intermediador: {
        cnpj: '05.314.972/0001-74',
        nomeUsuario: 'vtexappkey-shoppingdamassa-FAWYRF'
      },
      itens: [ [Object], [Object] ],
      parcelas: [ [Object] ],
      codigosRastreamento: { codigoRastreamento: '174435' }
    }
},
  {pedido: {
      desconto: '36,40',
      observacoes: '',
      observacaointerna: '',
      data: '2022-11-09',
      numero: '174436',
      numeroOrdemCompra: '',
      vendedor: '',
      valorfrete: '7.35',
      outrasdespesas: '0.00',
      totalprodutos: '279.99',
      totalvenda: '250.94',
      situacao: 'Atendido',
      dataSaida: '2022-11-08',
      loja: '203619239',
      numeroPedidoLoja: '1274890603001-01',
      tipoIntegracao: 'VTex',
      cliente: {
        id: '12757422008',
        nome: 'Lucas Duarte',
        cnpj: '07940083643',
        ie: null,
        rg: '',
        endereco: 'Rua Professor Pimenta da Veiga',
        numero: '266',
        complemento: '302',
        cidade: 'Belo Horizonte',
        bairro: 'Cidade Nova',
        cep: '31170190',
        uf: 'MG',
        email: 'lucasvduarte@yahoo.com.br',
        celular: null,
        fone: '(31) 99735-0396'
      },
      pagamento: { categoria: 'Vendas' },
      nota: {
        serie: '1',
        numero: '075984',
        dataEmissao: '2022-11-09 11:10:41',
        situacao: '7',
        valorNota: '250.94',
        chaveAcesso: '31221135119784000156550010000759841274477770'
      },
      transporte: {
        transportadora: 'Interlog',
        cnpj: '08957212000173',
        tipo_frete: 'R',
        qtde_volumes: '1',
        enderecoEntrega: [Object],
        volumes: [Array],
        servico_correios: 'Expresso'
      },
      intermediador: {
        cnpj: '05.314.972/0001-74',
        nomeUsuario: 'vtexappkey-shoppingdamassa-FAWYRF'
      },
      itens: [ [Object] ],
      parcelas: [ [Object] ],
      codigosRastreamento: { codigoRastreamento: '174436' }
    }
  }
]
          

//Get requisiton, of all orders.
router.get('/', async (req, res) => {
  try{
    // const {data:pedidos} =  await axios.get(`${url}/Api/v2/pedido/174186/json?apikey=${apiKey}`);
    let numberPage = 1
    let ordersList = []
    let i = 0;
    let run = true

    let pedidosAtendidos = []
    let pedidosCancelados = []
    let PedidosDevolvidos = []
    let outrosPedidos = []

    let daysTotalAtendidos = 0
    let daysTotalEmAberto = 0
  
    //Concat all orders requisions
    while (run) {
      const {data} = await axios.get(`${url}/Api/v2/pedidos/page=${numberPage}/json?apikey=${apiKey}&filters=dataEmissao[01/11/2022TO09/11/2022]`); //&filters=dataEmissao[01/11/2022TO03/11/2022];idSituacao[9]
      let ordersData = data.retorno.pedidos
      ordersList = ordersList.concat(ordersData)
      numberPage++;
      i++;
      if(ordersData.length<100){
        run = false
      }
    }

    let orderOutOfTime = 0
    limit = ordersList.length
    j = 0
    ordersListFilter = "203619239"

    while (j < limit){

      //variables to deal with ther orders fields
      let orderObject = ordersList[j].pedido
      let pNumero = ordersList[j].pedido.numero
      let pLoja = ordersList[j].pedido.loja
      let pStatus = ordersList[j].pedido.situacao
      let pDataCriacao = ordersList[j].pedido.data
      if('nota' in orderObject) {
        pDataEnvio = ordersList[j].pedido.nota.dataEmissao;
      }else{
        pDataEnvio = currentDate
      }
      let pDataEnvioFormat = pDataEnvio.slice(0,10)
      let pTempoMs = new Date(pDataEnvioFormat) - new Date (pDataCriacao)
      let pTempo = pTempoMs / (1000 * 60 * 60 * 24)

      //order fields
      let pedidoFiltrado = {
        pNumero,
        pLoja,
        pStatus,
        pDataCriacao, 
        pDataEnvioFormat,
        pTempo
      }

      //verify the order status and group for situation & sum days in i each situation
      if (pStatus === 'Atendido' && pLoja === ordersListFilter){
        pedidosAtendidos = pedidosAtendidos.concat(pedidoFiltrado);
        daysTotalAtendidos = daysTotalAtendidos + pTempo;
      }else if(pStatus === 'Cancelado' && pLoja === ordersListFilter){
        pedidosCancelados = pedidosCancelados.concat(pedidoFiltrado)
      }else if(pStatus === 'Devolvido' && pLoja === ordersListFilter){
        PedidosDevolvidos = PedidosDevolvidos.concat(pedidoFiltrado)
      }else if (pLoja === ordersListFilter){
        outrosPedidos = outrosPedidos.concat(pedidoFiltrado);
        daysTotalEmAberto = daysTotalEmAberto + pTempo;
      }

      //verify how many orders are out of time and have been sended
      if (pTempo>2 && pStatus === 'Atendido'){
        orderOutOfTime++;
      }
      j++;
    }

    let pedidosAtendidosOutOfTimeList = pedidosAtendidos.filter(pedidosAtendidos => pedidosAtendidos.pTempo > 2)
    let pedidosAtendidosOutOfTime = pedidosAtendidosOutOfTimeList.length
    let pedidosAtendidosOnTime = pedidosAtendidos.length - pedidosAtendidosOutOfTime
    let tempoMedioPedidosAtendido = daysTotalAtendidos / pedidosAtendidos.length

    let pedidosEmAbertoOutOfTimeList = outrosPedidos.filter(outrosPedidos => outrosPedidos.pTempo > 2)
    let pedidosEmAbertoOutOfTime = pedidosEmAbertoOutOfTimeList.length
    let pedidosEmAbertoOnTime = outrosPedidos.length - pedidosEmAbertoOutOfTime
    let tempoMedioPedidosEmAberto = daysTotalEmAberto / outrosPedidos.length

    result = {
      pedidosAtendidos,
      pedidosCancelados,
      PedidosDevolvidos,
      outrosPedidos,
      // pedidosAtendidosOutOfTimeList,
      pedidosAtendidosOutOfTime,
      pedidosAtendidosOnTime,
      tempoMedioPedidosAtendido,
      pedidosEmAbertoOutOfTimeList,
      pedidosEmAbertoOutOfTime,
      pedidosEmAbertoOnTime,
      tempoMedioPedidosEmAberto
    }

    res.json(result) // res.json(ordersList.length)
  }
  catch(err){
    console.log(err)
    res.json({err})
  }
})

module.exports = router

      // TRATAR PEDIDO:******************************
      // let pNumero = data.retorno.pedidos[0].pedido.numero
      // let pLoja = data.retorno.pedidos[0].pedido.loja
      // let pStatus = data.retorno.pedidos[0].pedido.situacao
      // let pDataCriacao = data.retorno.pedidos[0].pedido.data
      // let pDataEnvio = data.retorno.pedidos[0].pedido.nota.dataEmissao
      // let pDataEnvioFormat = pDataEnvio.slice(0,10)
      // let pTempoMs = new Date(pDataEnvioFormat) - new Date (pDataCriacao)
      // let pTempo = pTempoMs / (1000 * 60 * 60 * 24)

      // let pedidoFiltrado = {
      //   pNumero,
      //   pLoja,
      //   pStatus,
      //   pDataCriacao,
      //   pDataEnvioFormat,
      //   pTempo
      // }


        // TRATAR PEDIDO:******************************
      // let pNumero = ordersList[0].pedido.numero
      // let pLoja = ordersList[0].pedido.loja
      // let pStatus = ordersList[0].pedido.situacao
      // let pDataCriacao = ordersList[0].pedido.data
      // let pDataEnvio = ordersList[0].pedido.nota.dataEmissao
      // let pDataEnvioFormat = pDataEnvio.slice(0,10)
      // let pTempoMs = new Date(pDataEnvioFormat) - new Date (pDataCriacao)
      // let pTempo = pTempoMs / (1000 * 60 * 60 * 24)

      // let pedidoFiltrado = {
      //   pNumero,
      //   pLoja,
      //   pStatus,
      //   pDataCriacao,
      //   pDataEnvioFormat,
      //   pTempo
      // }