let input = [], m, desvP, array = [], val = 0, resp = 0, Fi, freq = [], elemento = [], objTabela = [];

//Criará o ROL
function criarRol(input, array){
	var i, el, j;
	input = document.getElementById("rol").value;
	var aux = input.split(";");
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
	}
	else if (document.getElementById('QN').checked || document.getElementById('QO').checked){
		for (i = 0; i < aux.length; i++){
			array.push(aux[i]);
		}
		array.sort();
	}
	moda(array);
	media(array, elemento, freq);
	criarTab(elemento, array, freq, objTabela);
}

//MODA
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
	console.log(elemento);
	console.log(freq);
	//falta verificar para amodal  
}

//MÉDIA
function media(array, elemento, freq){
	var soma = 0;
	if (document.getElementById('QD').checked || document.getElementById('QC').checked){
		for (i = 0; i < elemento.length; i++){
			soma += elemento[i] * freq[i];
		}

	}
	console.log(soma/array.length);
}

/*//MEDIANA
function mediana(array){
	var mediana;
	var p1;
	if (document.getElementById('QD').checked){
		if(array.length % 2 == 0){
			p1 = array.length/2;
			var p2 = array.length/2+1;
			mediana = (parseFloat(array[p1-1]) + parseFloat(array[p2-1]))/2;
		}
			else{
				p1 = (array.length+1)/2;
				mediana = parseFloat(array[p1-1]);
			}
	}
	else if(document.getElementById('QC').checked){

	}
return mediana;
}*/

/*//Intevalo de classes
function iClasses(array, Fi){
	var Fi = array.length;
	var AA = array[Fi-1] - array[0] + 1;
	var h;
	var k = Math.round(Math.sqrt(Fi));

	if (AA % 2 == 0){
		h = (AA) / k;
		console.log(Math.ceil(h));
		return Math.ceil(h);
	}
	else{
		h = (AA + 1) / k;
		console.log(Math.ceil(h));
		return Math.ceil(h);
	}
}*/

//CRIA TABELA
function criarTab(elemento, array, freq, objTabela){
	var varPesquisadas = [], fSimples = [], fRelativa = [], fAcumulada = [];
	var total = 0, frPercem = [], teste = [3, 5, 4, 7];

	for (i = 0; i < elemento.length; i++){
		total += elemento[i];
	}

		if (document.getElementById('QN').checked || document.getElementById('QO').checked){
			objTabela.varPesquisadas = elemento;
			objTabela.fSimples = freq;

			for (i = 0; i < freq.length; i++){

				frPercem.push(teste[i]/total);
			}

			objTabela.PfrPercemsvmkl = frPercem;
			console.table(objTabela);
				/*objTabela.push({
					varPesquisadas: elemento[i];
					fSimples: freq[i];
					fRelativa: freq[i]/total;
					fAcumulada: soma += freq[i];
				});
				objTabela.varPesquisadas.push(elemento[i]);
				objTabela.fSimples.push(freq[i]);
				objTabela.fRelativa.push(freq[i] / total);
				objTabela.fAcumulada.push(soma += freq[i]);*/
		}
}

/*//VARIÂNCIA
function variancia(array, val){
	if (document.getElementById('p').checked){
		for(var i = 0; i < array.length; i++){
			resp += Math.pow((parseFloat(array[i]) - val), 2);
		}
		resp = resp / array.length;
		return resp;
	}
	else {
		for(var i = 0; i < array.length; i++){
			resp += Math.pow((parseFloat(array[i]) - val), 2);
		}
		resp = resp / (array.length -1);
		return resp;	
	}
}

//DESVIO PADRAO
function dp(resp){
	desvP = Math.sqrt(resp);
	return desvP;
}

//%DP
function coeficiente(desvP, val){
	var cDP = (desvP/val) * 100;
	return cDP;
}*/