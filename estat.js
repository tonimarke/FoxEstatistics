let input = [], m, val = 0, desvP, varian, array = [], resp = 0, Fi, freq = [], elemento = [], objTabela = [];
let identificador, k, inClasse, copiaK = [];
let vetorK = [];
let FiContinuaCopia, varContinuaCopia, varContinuac2Copia, fAcumuladaCopia;
//Criará o ROL
function criarRol(input, array){
	var i, el, j;
	input = document.getElementById("rol").value;
	var aux = input.split("; ");

	if (document.getElementById('QD').checked || document.getElementById('QC').checked){
		for (i = 0; i < aux.length; i++){
			array.push(parseFloat(aux[i]));
		}
			for (i = 1; i < array.length; i++){
				el = array[i];
				j = i - 1;
				while (j >= 0 && array[j] > el){
					array[j + 1] = array[j];
					j--;
				}
				array[j + 1] = el;
			}
			console.log(array);
			moda(array);
			media(array, elemento, freq);
			mediana(array);
			media(array, elemento, freq);
			iClasses(array, Fi, k, vetorK);
			criarTab(elemento, freq, objTabela, identificador, inClasse, copiaK);
			mSeparatrizes(array, FiContinuaCopia, varContinuaCopia, varContinuac2Copia);
	}
	else if (document.getElementById('QN').checked || document.getElementById('QO').checked){
		for (i = 0; i < aux.length; i++){
			array.push(aux[i]);
		}
		array.sort();
		moda(array);
		mediana(array)
		media(array, elemento, freq);
		mSeparatrizes(array, FiContinuaCopia, varContinuaCopia, varContinuac2Copia)
	}
}

//MODA (falta verificar amodal)
function moda(array){
	var i, contagem = 0, aux = array[0], fAux = 1, m = "";

	for(i = 1; i < array.length; i++){
		if(aux == array[i]){
			fAux++;
		}
        else{
            freq[contagem] = fAux;
            elemento[contagem] = aux;
            fAux = 1;
            aux = array[i];
            contagem++;
        }
	}
	freq[contagem] = fAux;
	elemento[contagem] = aux;
	aux = freq[0];
	for(i = 0; i < freq.length; i++){
		if(aux <= freq[i]){
			if(aux < freq[i]){
				m = elemento[i];
				aux = freq[i];
			}
			else if(aux == freq[i] && i == 0){
				m = elemento[i];
			}
			else if(aux == freq[i]){
				m += ", " + elemento[i];
			}
		}
	}
	console.log("moda: " + m);
	return m;
	//falta verificar para amodal  
}

// MÉDIA ARITMÉTICA fórmula do %DP
function mediaArt(){
	var pLin = 0;

	for (i = 0; i < array.length; i++){
		pLin += array[i];
	}

	val = pLin / array.length;
	return val;
}

//MÉDIA PONDERADA
function media(array, elemento, freq){
	var soma = 0;
	if (document.getElementById('QD').checked || document.getElementById('QC').checked){
		for (i = 0; i < elemento.length; i++){
			soma += elemento[i] * freq[i];
		}
		console.log("media" + soma/array.length);
		return soma / array.length;
	}
	else if (document.getElementById('QN').checked || document.getElementById('QO').checked){
		console.log("Media: N/A");
		return "N/A";
	}
}

//MEDIANA
function mediana(array){
	var p2, p1 = array.length/2;
	if (document.getElementById('QD').checked || document.getElementById('QC').checked){
		if(p1 % 2 == 0){
			p2 = p1;
			console.log("mediana: " + array[p1] + " e " + array[p1-1]);
			return array[p1] + " e " + array[p1-1];
		}
		else{
			p2 = Math.round(p1);
			console.log("mediana" + array[p2]);
			return array[p2];
		}
	}
}

//Intevalo de classes
function iClasses(array, Fi, k, vetorK){
	var Fi = array.length-1;
	var AA = (array[Fi]-array[0]) + 1;
	var kTemp = Math.sqrt(Fi); 

	k = Math.trunc(kTemp);

	vetorK = [k-1, k, k+1];
	copiaK = [...vetorK];

	if (AA % vetorK[1] == 0){
		identificador = 1;
		inClasse = AA / vetorK[1];
	}
		else if (AA % vetorK[2] == 0){
			identificador = 2;
			inClasse = AA / vetorK[2];
		}
			else if (AA % vetorK[0] == 0){
				identificador = 0;
				inClasse = AA / vetorK[0];
			}
}

//CRIA TABELA (trocar nomes dos objetos e lógica da contínua)
function criarTab(elemento, freq, objTabela, identificador, inClasse, copiaK){
	var varContinua = [], varContinuac2 = [], contador, FiContinua = [];
	var total = 0, frPercem = [], fAcumulada = [], soma = 0, fAcumuladapercem = [], aux1 = parseInt(elemento[0]);
	var aux = 0;
	FiContinuaCopia = [...FiContinua];
	varContinuaCopia = [...varContinua];
	varContinuac2Copia = [...varContinuac2];
	fAcumuladaCopia = [...fAcumulada]

	var linha = copiaK;

	for (i = 0; i < freq.length; i++){
		total += freq[i];
	}

	if (document.getElementById('QN').checked || document.getElementById('QO').checked || document.getElementById('QD').checked){

		objTabela.varPesquisadas = elemento;
		objTabela.fSimples = freq;
			for (i = 0; i < freq.length; i++){
				frPercem.push((freq[i] / total * 100).toFixed(1));
				fAcumulada.push(soma += freq[i]);
				fAcumuladapercem.push((aux += freq[i] / total * 100).toFixed(1));
			}
		objTabela.PfrPercemsvmkl = frPercem;
		objTabela.fAcumuladassdk = fAcumulada;
		objTabela.fAcumuladapercemdfdsm = fAcumuladapercem;
		console.table(objTabela);
		}

	else{
		if (identificador == 1){
			for (i = 0; i < linha[1]; i++){
				varContinua.push(aux1);
				aux1 += inClasse;
				varContinuac2.push(aux1);
			}
		}
			else if (identificador == 2){
					for (i = 0; i < linha[2]-1; i++){
						varContinua.push(aux1);
						aux1 += inClasse;
						varContinuac2.push(aux1);
					}
			}
				else if (identificador == 0){
					for (i = 0; i < linha[0]-1; i++){
						varContinua.push(aux1);
						aux1 += inClasse;
						varContinuac2.push(aux1);
					}
				}
		objTabela.primeiraC = varContinua;
		objTabela.segundaC = varContinuac2;
		for (var i = 0; i < varContinuac2.length; i++) {
			contador = 0;
			for (var j = 0; j < array.length; j++) {
				if (array[j] >= varContinua[i] && array[j] < varContinuac2[i]){
					contador++;
				}
			}
			FiContinua.push(contador);
		}
		objTabela.FiContinuaajksk = FiContinua;
		for (i = 0; i < varContinua.length; i++){
			frPercem.push((FiContinua[i]/total*100).toFixed(1));
			fAcumulada.push(soma += FiContinua[i]);
			fAcumuladapercem.push((aux += FiContinua[i]/total*100).toFixed(1));
		}
		objTabela.PfrPercemsvmkl = frPercem;
		objTabela.fAcumuladassdk = fAcumulada;
		objTabela.fAcumuladapercemdfdsm = fAcumuladapercem;
		console.table(objTabela);

	}
}

//VARIÂNCIA
function variancia(array, val){
	mediaArt();
	//variância populacional
	if (document.getElementById('p').checked){
		for(var i = 0; i < array.length; i++){
			resp += Math.pow((parseFloat((array[i])-val)), 2);
		}
		varian = resp / array.length;
		console.log("variancia: " + varian);
		return varian;
	}

	//variância amostral
	else if (document.getElementById('a').checked){
		for(var i = 0; i < array.length; i++){
			resp += Math.pow((parseFloat((array[i])-val)), 2);
		}
		varian = resp / (array.length - 1);
		console.log("variancia: " + varian);
		return varian;
	}
}

//DESVIO PADRAO
function dP(varian){
	desvP = Math.sqrt(varian);
	console.log("desvio: " + desvP);
	return desvP;
}

//%DP
function coefDP(desvP, val){
	var cDP = (desvP / val) * 100;
	console.log("console" + cDP);
	return cDP;
}

//MEDIDAS SEPARATRIZES
function mSeparatrizes(array, FiContinuaCopia, varContinuaCopia, varContinuac2Copia, fAcumfAcumuladaCopia){
	var til = document.getElementById("sep").value;
	var tamanho = array.length;
	var classe;
	var FiCAux = FiContinuaCopia;
	var posicao = Math.trunc(tamanho * (til/100));

	for (var i = 0; i < FiCAux.length; i++){
		if (til >= FiCAux){
			classe = i;
		}
	}

	var lpk = varContinuaCopia[classe];
	var facAnterior = fAcumfAcumuladaCopia-1;

	if (facAnterior < 0 || facAnterior == 0){
		facAnterior = 0;
	}

	var fpk = FiCAux[classe];
	var Lpk = varContinuac2Copia[classe];
	var hpk = Lpk - lpk;

	var msContinua = lpk + ((posicao - facAnterior) / fpk) * hpk;

	if (document.getElementById('QN').checked || document.getElementById('QO').checked || document.getElementById('QD').checked){
		console.log("medida separatriz" + posicao);
		return posicao;
	}
	else {
		console.log("medida separatriz" + msContinua);
		return msContinua;
	}
}