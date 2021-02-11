import Nota100R from '../assets/Nota100R.png';
import Nota50R from '../assets/Nota50R.png';
import Nota20R from '../assets/Nota20R.png';
import Nota10R from '../assets/Nota10R.png';
import Nota5R from '../assets/Nota5R.png';
import Nota2R from '../assets/Nota2R.png';

import Moeda1R from '../assets/Moeda1R.png';
import Moeda50C from '../assets/Moeda50C.png';
import Moeda25C from '../assets/Moeda25C.png';
import Moeda10C from '../assets/Moeda10C.png';
import Moeda5C from '../assets/Moeda5C.png';
import Moeda1C from '../assets/Moeda1C.png';

export interface INota {
  text: string;
  quantidade: number;
  valor: number;
  imagem: any;
}

export interface IMoeda {
  text: string;
  quantidade: number;
  valor: number;
  imagem: any;
}

export interface ICalculaTrocoResponse {
  notas: INota[];
  moedas: IMoeda[];
}

export default function calculaTroco(
  valorCompra: number,
  valorPago: number,
): ICalculaTrocoResponse {
  const somatoria = valorPago - valorCompra;

  const troco = Math.round(somatoria * 100 + Number.EPSILON) / 100;

  let valorRestante = 0;

  let quantidadeN100 = 0;
  let quantidadeN50 = 0;
  let quantidadeN20 = 0;
  let quantidadeN10 = 0;
  let quantidadeN5 = 0;
  let quantidadeN2 = 0;
  let quantidadeM1r = 0;
  let quantidadeM50c = 0;
  let quantidadeM25c = 0;
  let quantidadeM10c = 0;
  let quantidadeM5c = 0;
  let quantidadeM1c = 0;

  let valorN100 = 0;
  let valorN50 = 0;
  let valorN20 = 0;
  let valorN10 = 0;
  let valorN5 = 0;
  let valorN2 = 0;
  let valorM1r = 0;
  let valorM50c = 0;
  let valorM25c = 0;
  let valorM10c = 0;
  let valorM5c = 0;
  let valorM1c = 0;

  // Notas
  quantidadeN100 = Math.floor(Math.floor(troco) / 100);
  valorN100 = quantidadeN100 > 0 ? quantidadeN100 * 100 : 0;

  valorRestante = Math.round((troco - valorN100) * 100 + Number.EPSILON) / 100;

  quantidadeN50 = Math.floor(Math.floor(valorRestante) / 50);
  valorN50 = quantidadeN50 > 0 ? quantidadeN50 * 50 : 0;

  valorRestante =
    Math.round((valorRestante - valorN50) * 100 + Number.EPSILON) / 100;

  quantidadeN20 = Math.floor(Math.floor(valorRestante) / 20);
  valorN20 = quantidadeN20 > 0 ? quantidadeN20 * 20 : 0;

  valorRestante =
    Math.round((valorRestante - valorN20) * 100 + Number.EPSILON) / 100;

  quantidadeN10 = Math.floor(Math.floor(valorRestante) / 10);
  valorN10 = quantidadeN10 > 0 ? quantidadeN10 * 10 : 0;

  valorRestante =
    Math.round((valorRestante - valorN10) * 100 + Number.EPSILON) / 100;

  quantidadeN5 = Math.floor(Math.floor(valorRestante) / 5);
  valorN5 = quantidadeN5 > 0 ? quantidadeN5 * 5 : 0;

  valorRestante =
    Math.round((valorRestante - valorN5) * 100 + Number.EPSILON) / 100;

  quantidadeN2 = Math.floor(Math.floor(valorRestante) / 2);
  valorN2 = quantidadeN2 > 0 ? quantidadeN2 * 2 : 0;

  // Moedas
  valorRestante =
    Math.round((valorRestante - valorN2) * 100 + Number.EPSILON) / 100;

  quantidadeM1r = Math.floor(Math.floor(valorRestante) / 1);
  valorM1r = quantidadeM1r > 0 ? quantidadeM1r * 1 : 0;

  valorRestante =
    Math.round((valorRestante - valorM1r) * 100 + Number.EPSILON) / 100;

  quantidadeM50c = Math.floor(valorRestante / 0.5);
  valorM50c = quantidadeM50c > 0 ? quantidadeM50c * 0.5 : 0;

  valorRestante =
    Math.round((valorRestante - valorM50c) * 100 + Number.EPSILON) / 100;

  quantidadeM25c = Math.floor(valorRestante / 0.25);
  valorM25c = quantidadeM25c > 0 ? quantidadeM25c * 0.25 : 0;

  valorRestante =
    Math.round((valorRestante - valorM25c) * 100 + Number.EPSILON) / 100;

  quantidadeM10c = Math.floor(valorRestante / 0.1);
  valorM10c = quantidadeM10c > 0 ? quantidadeM10c * 0.1 : 0;

  valorRestante =
    Math.round((valorRestante - valorM10c) * 100 + Number.EPSILON) / 100;

  quantidadeM5c = Math.floor(valorRestante / 0.05);
  valorM5c = quantidadeM5c > 0 ? quantidadeM5c * 0.05 : 0;

  valorRestante =
    Math.round((valorRestante - valorM5c) * 100 + Number.EPSILON) / 100;

  quantidadeM1c = Math.floor(valorRestante / 0.01);

  valorM1c = quantidadeM1c > 0 ? quantidadeM1c * 0.01 : 0;

  valorRestante =
    Math.round(
      (Number(valorRestante.toFixed(2)) - valorM1c) * 100 + Number.EPSILON,
    ) / 100;

  const retorno: ICalculaTrocoResponse = {
    notas: [],
    moedas: [],
  };

  // Mostra as notas
  if (quantidadeN100 > 0) {
    retorno.notas.push({
      text: '100 reais',
      quantidade: quantidadeN100,
      valor: valorN100,
      imagem: Nota100R,
    });
  }
  if (quantidadeN50 > 0) {
    retorno.notas.push({
      text: '50 reais',
      quantidade: quantidadeN50,
      valor: valorN50,
      imagem: Nota50R,
    });
  }
  if (quantidadeN20 > 0) {
    retorno.notas.push({
      text: '20 reais',
      quantidade: quantidadeN20,
      valor: valorN20,
      imagem: Nota20R,
    });
  }
  if (quantidadeN10 > 0) {
    retorno.notas.push({
      text: '10 reais',
      quantidade: quantidadeN10,
      valor: valorN10,
      imagem: Nota10R,
    });
  }
  if (quantidadeN5 > 0) {
    retorno.notas.push({
      text: '5 reais',
      quantidade: quantidadeN5,
      valor: valorN5,
      imagem: Nota5R,
    });
  }
  if (quantidadeN2 > 0) {
    retorno.notas.push({
      text: '2 reais',
      quantidade: quantidadeN2,
      valor: valorN2,
      imagem: Nota2R,
    });
  }

  // Mostra as moedas
  if (quantidadeM1r > 0) {
    retorno.moedas.push({
      text: '1 Real',
      quantidade: quantidadeM1r,
      valor: valorM1r,
      imagem: Moeda1R,
    });
  }
  if (quantidadeM50c > 0) {
    retorno.moedas.push({
      text: '50 centavos',
      quantidade: quantidadeM50c,
      valor: valorM50c,
      imagem: Moeda50C,
    });
  }
  if (quantidadeM25c > 0) {
    retorno.moedas.push({
      text: '25 centavos',
      quantidade: quantidadeM25c,
      valor: valorM25c,
      imagem: Moeda25C,
    });
  }
  if (quantidadeM10c > 0) {
    retorno.moedas.push({
      text: '10 centavos',
      quantidade: quantidadeM10c,
      valor: valorM10c,
      imagem: Moeda10C,
    });
  }
  if (quantidadeM5c > 0) {
    retorno.moedas.push({
      text: '5 centavos',
      quantidade: quantidadeM5c,
      valor: valorM5c,
      imagem: Moeda5C,
    });
  }
  if (quantidadeM1c > 0) {
    retorno.moedas.push({
      text: '1 centavo',
      quantidade: quantidadeM1c,
      valor: valorM1c,
      imagem: Moeda1C,
    });
  }

  return retorno;
}
