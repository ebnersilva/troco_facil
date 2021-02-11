import React, {useCallback, useEffect, useState} from 'react';
import CurrencyInput from 'react-native-currency-input';
import uuid from 'react-native-uuid';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import calculaTroco, {INota, IMoeda} from './utils/calculaTroco';

const App = () => {
  const [inputValorCompra, setInputValorCompra] = useState<number | null>(null); // can also be null
  const [inputValorPago, setInputValorPago] = useState<number | null>(null); // can also be null
  const [botaoLimparVisivel, setBotaoLimparVisivel] = useState(false);
  const [valorTroco, setValorTroco] = useState('');

  const [notas, setNotas] = useState<INota[]>([]);
  const [moedas, setMoedas] = useState<IMoeda[]>([]);

  const calcularTroco = useCallback(() => {
    if (!inputValorCompra || !inputValorPago) {
      Alert.alert('Ops, Valores inválidos!');
      return;
    }

    if (inputValorCompra > inputValorPago) {
      Alert.alert('Ops, O valor pago não é suficiente!');
      return;
    }

    const {notas: notasRetornadas, moedas: moedasRetornadas} = calculaTroco(
      inputValorCompra,
      inputValorPago,
    );

    const troco = inputValorPago - inputValorCompra;
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(troco);

    setValorTroco(valorFormatado);

    if (notasRetornadas.length > 0) {
      setNotas(notasRetornadas);
    }

    if (moedasRetornadas.length > 0) {
      setMoedas(moedasRetornadas);
    }
  }, [inputValorCompra, inputValorPago]);

  const limpar = useCallback(() => {
    setInputValorCompra(null);
    setInputValorPago(null);
    setNotas([]);
    setMoedas([]);
    setBotaoLimparVisivel(false);
    setValorTroco('');
  }, []);

  useEffect(() => {
    if (notas.length > 0 || moedas.length > 0) {
      setBotaoLimparVisivel(true);
    }
  }, [notas, moedas]);

  const formataNomePlural = (quantity: number, text: string): string => {
    if (quantity > 1) {
      return `${text}s`;
    }
    return `${text}`;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Troco Fácil</Text>
            <View style={styles.containerInput}>
              <CurrencyInput
                style={styles.input}
                placeholder="Informe o valor da compra"
                placeholderTextColor="#2b2827"
                value={inputValorCompra}
                onChangeValue={setInputValorCompra}
                unit="R$"
                delimiter="."
                separator=","
                precision={2}
                editable={!botaoLimparVisivel}
              />
            </View>
            <View style={styles.containerInput}>
              <CurrencyInput
                style={styles.input}
                placeholder="Informe o valor pago"
                placeholderTextColor="#2b2827"
                value={inputValorPago}
                onChangeValue={setInputValorPago}
                unit="R$"
                delimiter="."
                separator=","
                precision={2}
                editable={!botaoLimparVisivel}
              />
            </View>

            {!botaoLimparVisivel ? (
              <TouchableOpacity
                style={styles.containerButton}
                onPress={calcularTroco}>
                <Text style={styles.textButton}>Calcular</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.containerButton} onPress={limpar}>
                <Text style={styles.textButton}>Limpar</Text>
              </TouchableOpacity>
            )}

            {botaoLimparVisivel && (
              <Text>{`Você tem que devolver ${valorTroco}`}</Text>
            )}

            <View style={styles.viewDetails}>
              <View style={styles.listNotas}>
                {notas.length > 0 &&
                  notas.map((nota) => (
                    <View key={uuid.v4()} style={styles.imageContainer}>
                      <Text style={styles.text}>{`${
                        nota.quantidade
                      } ${formataNomePlural(nota.quantidade, 'nota')} de ${
                        nota.text
                      }`}</Text>
                      <Image
                        style={styles.image}
                        source={nota.imagem}
                        resizeMode="contain"
                      />
                    </View>
                  ))}
              </View>
              <View style={styles.listMoedas}>
                {moedas.length > 0 &&
                  moedas.map((moeda) => (
                    <View key={uuid.v4()} style={styles.imageContainer}>
                      <Text style={styles.text}>{`${
                        moeda.quantidade
                      } ${formataNomePlural(moeda.quantidade, 'moeda')} de ${
                        moeda.text
                      }`}</Text>
                      <Image
                        style={styles.image}
                        source={moeda.imagem}
                        resizeMode="contain"
                      />
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  containerInput: {
    width: '90%',
    marginTop: 8,
    marginBottom: 8,
    height: 60,
    paddingTop: 0,
    paddingLeft: 16,
    backgroundColor: '#DDD',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2b2827',

    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#2b2827',
    fontSize: 16,
    height: 60,
    width: '100%',
  },
  containerButton: {
    width: '90%',
    marginTop: 8,
    marginBottom: 8,
    height: 60,
    backgroundColor: '#2b2827',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2b2827',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#FFF',
  },
  viewDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listNotas: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listMoedas: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    width: 100,
    height: 60,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 110,
    margin: 10,
  },
});

export default App;
