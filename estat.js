let input = [], m, desvP, array = [], val = 0, resp = 0, Fi;

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
	else if(document.getElementById('QN').checked || document.getElementById('QO').checked){
		for (i = 0; i < aux.length; i++){
			array.push(aux[i]);
		}
		array.sort();
	}
	return array;
}

//MODA
function moda(array){
	var i, freq = [], elemento = [], contagem = 0, aux = array[0], fAux = 1, m = "";

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
	console.log(elemento.length);
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
	return m;
	//falta verificar para amodal  
}

//Intevalo de classes
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
}

//MEDIANA
function mediana(array){
	var mediana;
	var p1;
	if(array.length % 2 == 0){
		p1 = array.length/2;
		var p2 = array.length/2+1;
		mediana = (parseFloat(array[p1-1]) + parseFloat(array[p2-1]))/2;
	}
        else{
            p1 = (array.length+1)/2;
            mediana = parseFloat(array[p1-1]);
        }
return mediana;
}

//VARIÂNCIA
function variancia(array, val){
	for(var i = 0; i < array.length; i++){
		resp += Math.pow((parseFloat(array[i]) - val), 2);
	}
	resp = resp / array.length;
	return resp;
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
}