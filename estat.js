$(document).ready(function(){    
    $("#btnDescritiva").click(function () {
    	$("#inserirDescritiva").append('<form action=""><input id="QN" type="radio" name="variavel" value="1"> Nominal <input id="QO" type="radio" name="variavel" value="2"> Ordinal<input id="QD" type="radio" name="variavel" value="3"> Discreta			<input id="QC" type="radio" name="variavel" value="4"> Contínua			<br>		</form>		<p>			Nome da variável: <input type="text" id="variavel"/>		</p>		<p>			ROL <input type="text" id="rol"/> 	</p>		<form action="">			<input id="a" type="radio" name="v" value="amostral"> Amostra <input id="p" type="radio" name="v" value="popu"> População<br>		</form>		<br>		<p>			Medida separatriz <div class="form-group">							<select id="slct1" name="slct1" onchange = "populate(this.id,"slct2")">					<option value="Quartil">Quartil</option>					<option value="Quintil">Quintil</option>					<option value="Decil">Decil</option>					<option value="Percentil">Percentil</option>			</select>			<select id="slct2" name="slct2"></select>			<br>			<table id="exibe"></table>			<p class="center" id="resultado"></p>						<p class="center" id="mmm"></p>			<canvas id="myChart2" width="600" height="400"></canvas>');
    });
    $("#calcularDescritiva").click(function () {
		let input = [], mediaP, desvP, varian, array = [], resp = 0, freq = [], elemento = [], objTabela = {};
		let k, inClasse, copiaK = [];
		let vetorK = [], intervalo_classe = [];
		let FiContinuaCopia, varContinuaCopia, varContinuac2Copia, fAcumuladaCopia;
		let right, left;

		let m = "", median, cDP;

		//Criará o ROL
		$("#calcularDescritiva").click(function () {
		//function criarRol(input){
			input = document.getElementById("rol").value; //dados
			nomevar = document.getElementById("variavel").value; //nome
			var aux = input.split("; ");

			if (document.getElementById('QC').checked){
				for (i = 0; i < aux.length; i++){
					array.push(parseFloat(aux[i]));
				}
					qSort(array, 0, array.length -1);
					moda(array);
					media(array, elemento, freq);
					mediana(array);
					iClasses(array);
					criarTab(elemento, freq, intervalo_classe);
					variancia(array, mediaP, resp);
					dP(varian);
					coefDP(desvP, mediaP);
					mSeparatrizes(array, FiContinuaCopia, varContinuaCopia, varContinuac2Copia, fAcumuladaCopia);
				
				//exibição da tabela

				document.getElementById("exibe").innerHTML = exibe;
				for (let i = 0; i < elemento.length; i++) {
					var exibe = exibe + "<tr>" + 
							"<td align=center>" + objTabela.concatenador[i] + "</td>" + 
							"<td align=center>" + objTabela.FiContinuaajksk [i]  + "</td>" + 
							"<td align=center>" + objTabela.PfrPercemsvmkl[i] + "% </td>" + 
							"<td align=center>" + objTabela.fAcumuladassdk[i] + "</td>" + 
							"<td align=center>" + objTabela.fAcumuladapercemdfdsm[i] + "% </td>" +
										"</tr>";
				}
				document.getElementById("mmm").innerHTML = ("Media: "+ mediaP + "<br>" + "Moda : " + m + "<br>" + "Mediana: " + mediana + "<br>");
			}
			else if (document.getElementById('QD').checked){
				for (i = 0; i < aux.length; i++){
					array.push(parseFloat(aux[i]));
				}
					qSort(array, 0, array.length -1);
					moda(array);
					media(array, elemento, freq);
					mediana(array);
					criarTab(elemento, freq, intervalo_classe);	
					variancia(array, mediaP, resp);
					dP(varian);
					coefDP(desvP, mediaP);
					mSeparatrizes(array, FiContinuaCopia, varContinuaCopia, varContinuac2Copia, fAcumuladaCopia);
				
					//exibição da tabela

				document.getElementById("exibe").innerHTML = exibe;
				for (let i = 0; i < elemento.length; i++) {
					var exibe = exibe + "<tr>" + 
							"<td align=center>" + objTabela.varPesquisadas[i] + "</td>" + 
							"<td align=center>" + objTabela.fSimples [i]  + "</td>" + 
							"<td align=center>" + objTabela.PfrPercemsvmkl[i] + "% </td>" + 
							"<td align=center>" + objTabela.fAcumuladassdk[i] + "</td>" + 
							"<td align=center>" + objTabela.fAcumuladapercemdfdsm[i] + "% </td>" +
										"</tr>";
				}
				document.getElementById("mmm").innerHTML = ("Media: "+ mediaP + "<br>" + "Moda : " + m + "<br>" + "Mediana: " + mediana + "<br>");
			}
			else{
				for (i = 0; i < aux.length; i++){
					array.push(aux[i]);
				}
				array.sort()
				//window.localStorage.setItem('array_descritiva', JSON.stringify(array));
				moda(array);
				media(array, elemento, freq);
				mediana(array);
				criarTab(elemento, freq, intervalo_classe);
				mSeparatrizes(array, FiContinuaCopia, varContinuaCopia, varContinuac2Copia, fAcumuladaCopia);
				
				//exibição da tabela
				
				document.getElementById("exibe").innerHTML = exibe;
				for (let i = 0; i < elemento.length; i++) {
					var exibe = exibe + "<tr>" + 
							"<td align=center>" + objTabela.varPesquisadas[i] + "</td>" + 
							"<td align=center>" + objTabela.fSimples [i]  + "</td>" + 
							"<td align=center>" + objTabela.PfrPercemsvmkl[i] + "% </td>" + 
							"<td align=center>" + objTabela.fAcumuladassdk[i] + "</td>" + 
							"<td align=center>" + objTabela.fAcumuladapercemdfdsm[i] + "% </td>" +
										"</tr>";
				}
				document.getElementById("mmm").innerHTML = ("Media: "+ mediaP + "<br>" + "Moda : " + m + "<br>" + "Mediana: " + mediana + "<br>");
			}
		});

		//ORDENACAO
		function qSort(array, left, right){
		    var i = left;
		    var j = right;
		    var tmp;
		    var pivotidx = (left + right) / 2;
		    var pivot = parseInt(array[pivotidx.toFixed()]); 
			//PARTICAO
			{
		        while (i <= j){
		            while (parseInt(array[i]) < pivot)
		                i++;
		                while (parseInt(array[j]) > pivot)
		                    j--;
		                if (i <= j){
		                    tmp = array[i];
		                    array[i] = array[j];
		                    array[j] = tmp;
		                    i++;
		                    j--;
		                }
		        }
		        //RECURSAO
		        if (left < j){
		            qSort(array, left, j);
		        }
		        if (i < right){
		            qSort(array, i, right);
				}
			}
			return array;
		}

		//MODA (falta verificar amodal)
		function moda(array){
			var i, contagem = 0, aux = array[0], fAux = 1;

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

		//MÉDIA PONDERADA
		function media(array, elemento, freq){
			var soma = 0;
			var tamanhoVetor = array.length;
			var tamanhoElemento = elemento.length;
			if (document.getElementById('QD').checked || document.getElementById('QC').checked){
				for (i = 0; i < tamanhoElemento; i++){
					soma += elemento[i] * freq[i];
				}
				console.log("media" + soma/array.length);
				mediaP = (soma / tamanhoVetor).toFixed(2);
				return mediaP;
			}
			else if (document.getElementById('QN').checked || document.getElementById('QO').checked){
				mediaP = "Media: N/A";
				return mediaP;
			}
		}

		//MEDIANA
		function mediana(array){
			var p2, p1 = array.length/2;

			if (document.getElementById('QD').checked || document.getElementById('QC').checked){
				if(p1 % 2 == 0){
					console.log("mediana: " + ((array[p1] + array[p1+1])/2) );
					median = (array[p1]+array[p1+1])/2;
					return median;
				}
				else{
					p2 = Math.round(p1);
					median = array[p2];
					return median;
				}
			}
		}

		//VARIÂNCIA
		function variancia(array, mediaP, resp){
			//variância populacional

			var tamanhoVetor = array.length;

			if (document.getElementById('p').checked){ //populacao
				for(var i = 0; i < tamanhoVetor; i++){
					resp += Math.pow((parseFloat(array[i]) - mediaP), 2);
				}
				varian = resp / tamanhoVetor;
				console.log("variancia: " + varian);
				return varian;
			}

			//variância amostral
			else if (document.getElementById('a').checked){ //amostra
				for(var i = 0; i < array.length; i++){
					resp += Math.pow((parseFloat(array[i]) - mediaP), 2);
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
		function coefDP(desvP, mediaP){
			cDP = (desvP / mediaP) * 100;
			console.log("Coeficiente: " + cDP);
			return cDP;
		}

		//Intevalo de classes
		function iClasses(array){
			var max_number = array[array.length-1];
			var min_number = array[0];
			var amplitude_total = max_number - min_number;
			var kTemp = Math.sqrt(array.length);
			var inClassetemp;

			k = parseInt(kTemp);

			vetorK = [k-1, k, k+1];

			do {
		        for (let i = 0; i < vetorK.length; i++) {
					inClassetemp = (amplitude_total + 1) / vetorK[i];
		            if (inClassetemp % 1 === 0) {
						intervalo_classe = [inClassetemp, vetorK[i]];
		                return intervalo_classe;
		            }
		        }
		        amplitude_total += 1;
			} while (inClassetemp % 1 !== 0);
		}

		//CRIA TABELA Frequências (trocar nomes dos objetos e lógica da contínua)
		function criarTab(elemento, freq, intervalo_classe){
			var iC = intervalo_classe;

			var varContinua = [], varContinuac2 = [], contador, FiContinua = [];
			var total = 0, frPercem = [], fAcumulada = [], soma = 0, fAcumuladapercem = [], aux1 = parseInt(elemento[0]);
			var aux = 0;

			var concatenado = [ ], buff = [];

			FiContinuaCopia = [...FiContinua];
			varContinuaCopia = [...varContinua];
			varContinuac2Copia = [...varContinuac2];
			fAcumuladaCopia = [...fAcumulada];

			var intervaloClasse = iC[0];
			var identificador = iC[1];

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
				
					var data=[]; var chart=[];
					var optionspizza = {
						 aspectRatio: 2,                       
						title:{
						   display:true,
						   text:"Variável Pesquisada: " + nomevar,
						   fontSize:15,
						   borderWidth:100
						},
						legend:{
						   display:true,
						   position:'bottom',
						   labels:{
							 fontColor:'#000'
						   }
						},
						layout:{
						   padding:{
							 left:0,
							 right:150,
							 bottom:0,
							 top:0
						   }
						},
						tooltips:{
							enabled:true
						}
					}
					for (let i = 0; i <elemento.length; i++) {
						chart[i]=elemento[i];    
					};
					for (let i = 0; i < freq.length; i++) {
						data[i]= freq[i];
					};
					var label = optionspizza;
					graficoQuali(chart,data,label);
					var graficoVar; 
						 function graficoQuali(chart,data,label){
							var ctx = document.getElementById("myChart2").getContext('2d');
								if(graficoVar != null){
									graficoVar.destroy();
								}
							graficoVar = new Chart(ctx, {
							type: 'pie',
							data: {
								labels: chart,
								datasets: [{
										label: nomevar,
										data: data,
										backgroundColor:
											[
											 'rgba(72, 61, 139, 0.6)',
								 
											 'rgba(0, 0, 255, 0.6)',           
								 
											 'rgba(34, 139, 34, 0.6)',
								 
											 'rgba(255, 255, 0, 0.6)',
								 
											 'rgba(255, 0, 0, 0.6)',
								 
											 'rgba(0, 255, 127, 0.6)',            
								 
											 'rgba(255, 140, 0, 0.6)',
								 
											 'rgba(54, 162, 235, 0.6)',
								 
											 'rgba(255, 206, 86, 0.6)',
								 
											 'rgba(75, 192, 192, 0.6)',
								 
											 'rgba(255, 99, 132, 0.6)',
								 
											 'rgba(25, 25, 112, 0.6)',
								 
											 'rgba(100, 149, 237, 0.6)',
								 
											 'rgba(0, 250, 154, 0.6)',
											 
											 'rgba(165, 42, 42, 0.6)',
								 
											 'rgba(148, 0, 211, 0.6)',
								 
											 'rgba(153, 102, 255, 0.6)',
								 
											 'rgba(255, 159, 64, 0.6)',
								 
											 'rgba(205, 69, 102, 0.6)',
								 
											 'rgba(47, 79, 79, 0.6)',
								 
											 'rgba(119, 136, 153, 0.6)'
										   ],
										   borderWidth:1,
										   borderColor:'#777',
										   hoverBorderWidth:3,
										   hoverBorderColor:'#000'
											}],
									   },
									   options:label
									
							}
							);
								  
								 }
								 function attgrafico() {
									 removeData(Chart);
								 function removeData(chart) {
								   chart.data.labels.pop();
								   chart.data.datasets.forEach((dataset) => {
									   dataset.data.pop();
								   });
								   chart.update();
							   };
							   addData(chart,label,data);
							   function addData(chart, label, data) {
								   chart.data.labels.push(label);
								   chart.data.datasets.forEach((dataset) => {
									   dataset.data.push(data);
								   });
								   chart.update();
							   };          
				   
								 }
				
			}
			else{
					for (i = 0; i < identificador; i++){
						varContinua.push(aux1);
						aux1 += intervaloClasse;
						varContinuac2.push(aux1);
					}
					buff = "";
					for (i = 0; i < varContinua.length; i++){
						var cont = varContinua[i];
						var cont2 = varContinuac2[i];
			
						buff = buff.concat(cont.toString(), " |— ", cont2.toString());
						concatenado.push(buff);
						buff = "";
					}
					objTabela.concatenador = concatenado;
				for (var i = 0; i < varContinuac2.length; i++){
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

				var data = [];
				var chart = [];
				var optionsbarra= {
					scales:{
						xAxes:[{
							categoryPercentage:1,
							barPercentage:1
						}],
						yAxes:[{
							ticks:{
								beginAtZero:true
							}
						}]
					},   
					title:{
						display:true,
						text:"Variável Pesquisada: " + nomevar,
						fontSize:15,
						borderWidth:100
					},
					legend:{
						display:true,
						position:'bottom',
						labels:{
						fontColor:'#000'
						}
					},
					layout:{
						padding:{
							left:0,
							right:150,
							bottom:0,
							top:0
						}
					},
					tooltips:{
						enabled:true
					}
				}
			       
				for (let i = 0; i < concatenado.length; i++) {
					chart[i] = concatenado[i];
				}
					for (let i = 0; i < FiContinua.length; i++){
						data[i]= FiContinua[i];
					}
				label = optionsbarra;
				graficoCont(chart, data, label);	 
			 
				var graficoVar;
				function graficoCont(chart,data,label){
					 var ctx = document.getElementById("myChart2").getContext('2d');

					 if(graficoVar != null){
						graficoVar.destroy();
					 }
					 graficoVar = new Chart(ctx, {
					 type: 'bar',
					 data: {
						 labels:chart,
						 datasets: [
							 {
								 label: nomevar,
								 data: data,
								 backgroundColor:[
									 'rgba(72, 61, 139, 0.6)',
						 
									 'rgba(0, 0, 255, 0.6)',           
						 
									 'rgba(34, 139, 34, 0.6)',
						 
									 'rgba(255, 255, 0, 0.6)',
						 
									 'rgba(255, 0, 0, 0.6)',
						 
									 'rgba(0, 255, 127, 0.6)',            
						 
									 'rgba(255, 140, 0, 0.6)',
						 
									 'rgba(54, 162, 235, 0.6)',
						 
									 'rgba(255, 206, 86, 0.6)',
						 
									 'rgba(75, 192, 192, 0.6)',
						 
									 'rgba(255, 99, 132, 0.6)',
						 
									 'rgba(25, 25, 112, 0.6)',
						 
									 'rgba(100, 149, 237, 0.6)',
						 
									 'rgba(0, 250, 154, 0.6)',
									 
									 'rgba(165, 42, 42, 0.6)',
						 
									 'rgba(148, 0, 211, 0.6)',
						 
									 'rgba(153, 102, 255, 0.6)',
						 
									 'rgba(255, 159, 64, 0.6)',
						 
									 'rgba(205, 69, 102, 0.6)',
						 
									 'rgba(47, 79, 79, 0.6)',
						 
									 'rgba(119, 136, 153, 0.6)'
								   ],                                    
								   borderWidth:1,
								   borderColor:'#777',
								   hoverBorderWidth:3,
								   hoverBorderColor:'#000'
								 }],
							   },
							   options:label
							 });
						   }
							function attgrafico() {
							   removeData(Chart);
							function removeData(chart) {
							chart.data.labels.pop();
							chart.data.datasets.forEach((dataset) => {
								dataset.data.pop();
							});
							chart.update();
						 };
						 addData(chart,label,data);
						 function addData(chart, label, data) {
							 chart.data.labels.push(label);
							 chart.data.datasets.forEach((dataset) => {
								dataset.data.push(data);
							 });
							chart.update();
						 };       
			 
							}

			}

		}

		//MEDIDAS SEPARATRIZES
		function mSeparatrizes(array, FiContinuaCopia, varContinuaCopia, varContinuac2Copia, fAcumuladaCopia){

			var e = document.getElementById("slct2");
			var til = e.options[e.selectedIndex].value;

			if (document.getElementById('QN').checked || document.getElementById('QO').checked || document.getElementById('QD').checked){
				var tamanho = array.length; //precisarei para achar a posição
				var posicao = Math.round(tamanho * (til/100)); //essa é a posição no rol
				var valor = array[posicao];
				console.log("medida separatriz" + valor);
				return valor;
			}
			else {
				var tamanho = array.length; //precisarei para achar a posição
				var classe = 0; //linha
				var FiCAux = FiContinuaCopia; //para achar o limite inferior
				var fac_acumulada = fAcumuladaCopia;
			
				var posicao = Math.round(tamanho * (til/100)); //essa é a posição no rol
				var valor = array[posicao];
				
				console.log("array dentro: " + tamanho);
				var v0 = varContinuaCopia;
				var v1 = varContinuac2Copia;
			
				var tamanho_linha = v0.length;
				console.log("taman: " + tamanho_linha)
			
				for(var i = 0; i < tamanho_linha; i++){
					console.log("ok");
					if (v0[i] >= valor && v1[i] < valor){
						console.log("ok");
						classe = i;
					}
				}
				//console.log("classe" + classe);
				var limite_inferior = v1[classe];
				var fac_anterior = fac_acumulada[classe-1];
				var fi = FiCAux[classe];
				var intervalo = v1 - v0;
			
				if (fac_anterior < 0 || fac_anterior == 0){
					fac_anterior = 0;
				}
			
				var msContinua = limite_inferior + ((posicao - fac_anterior) / fi) * intervalo;
				console.log("medida separatriz" + msContinua);
				return msContinua;
			}

			//fpk = FiCAux[classe]; fi

			/*var Lpk = varContinuac2Copia[classe];

			var hpk = Lpk - Lpk;


			for (var i = 0; i < FiCAux.length; i++){
				if (til >= FiCAux.length){
					classe = i;
				}
			}

			//console.log(classe);
			//var Lpk = varContinuaCopia[classe]; 
			//console.log(Lpk);
			//var facAnterior = fAcumfAcumuladaCopia-1;

			console.log("separatiz da quali" + fi);

			if (facAnterior < 0 || facAnterior == 0){
				facAnterior = 0;
			}
			var fpk = FiCAux[classe];
			var Lpk = varContinuac2Copia[classe];
			var hpk = Lpk - Lpk;*/
		}

		function populate(s1,s2){
			var s1 = document.getElementById(s1);
			var s2 = document.getElementById(s2);

			s2.innerHTML = "";
			if(s1.value == "Quartil"){
				var optionArray = ["25|25","50|50","75|75", "100|100"];
			} 
			else if(s1.value == "Quintil"){
				var optionArray = ["20|20","40|40","60|60", "80|80", "100|100"];
			} 
			else if(s1.value == "Decil"){
				var optionArray = ["10|10", "20|20", "30|30", "40|40", "50|50", "60|60", "70|70", "80|80", "90|90", "100|100"];
			} 
			else if(s1.value == "Percentil"){
				var optionArray = [];
				var buff = "";
				for(i = 1; i <= 100; i++){
					buff = buff.concat( i.toString(), "|", i.toString() );
					optionArray.push(buff);
					buff = "";
				}
			}
			for(var option in optionArray){
				var pair = optionArray[option].split("|");
				var newOption = document.createElement("option");
				newOption.value = pair[0];
				newOption.innerHTML = pair[1];
				s2.options.add(newOption);
			}
		}
	});
});