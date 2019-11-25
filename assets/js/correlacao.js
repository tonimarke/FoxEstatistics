$(document).ready(function(){     //faz ficar pronto ao carregar o documento

    //let chart = document.querySelector('canvas').chart; //jQuery para atualizar o canvas com os valores desejados
    
    $(document).on('click', function (){
        
 		var arrayX = []; var arrayY = [];var reta=[]; var pontos=[];
	    var correlacaoX = (document.getElementById("correlacaoX").value); //pega valor do input da variavel dependente
	    var correlacaoY = (document.getElementById("correlacaoY").value); //pega valor do input da variavel independente

	    arrayX = correlacaoX.split(";"); //define arrayX como os valores do array que são retornados pelo split separados por ';'.
	    arrayY = correlacaoY.split(";"); //define arrayY como os valores do array que são retornados pelo split separados por ';'.
	    var tamanhoVetor = arrayX.length;//ambos os vetores tem o mesmo tamanho, então só um length resolve

	    var yMax=arrayY[0]; //inicializa com o primeiro valor do vetor
	    var yMin=arrayY[0];
		for (let i = 0; i < arrayX.length; i++) {
		    pontos.push({ //adiciona x e y como um ponto para inserir no chart
		        x:arrayX[i],
		        y:arrayY[i]});

		    if (yMin < arrayY[i]) {//nesse loop agrega ao yMin o menor valor do vetor para usar na reta
	            yMin = arrayY[i];
	        }
	        if (yMax > arrayY[i]) { //nesse loop agrega ao yMax o maior valor do vetor para usar na reta
	            yMax = arrayY[i];
	        }  
	 	};

	    var somaX = 0;
	    for (let i = 0; i < arrayX.length; i++) { //calcula a soma de todos os valores de x
	       arrayX[i] = parseFloat(arrayX[i]); //parseFloat converte os valores do array para números
	       somaX += arrayX[i];
	    }

	    var somaY = 0;
	    for (let i = 0; i <arrayY.length; i++) { 
	       arrayY[i] = parseFloat(arrayY[i]);
	       somaY += arrayY[i];//calcula a soma de todos os valores de y
	   }
	 	
	    var produtoXY = 0;
	    var xQuadrado = 0;
	    var yQuadrado = 0;
	    //Variaveis definidas acima, calculo realizado no for abaixo
	    for (let i = 0; i < arrayX.length; i++) {
	        produtoXY += arrayX[i] * arrayY[i];
	        xQuadrado += arrayX[i] * arrayX[i];
	        yQuadrado += arrayY[i] * arrayY[i];

	    }

	    
	
    	var r = (((tamanhoVetor*produtoXY)-((somaX)*(somaY)))/Math.sqrt((tamanhoVetor*xQuadrado-(somaX*somaX))*(tamanhoVetor*yQuadrado-(somaY*somaY)))*100).toFixed(2);
	    // r é o coeficiente de correlação linear de Pearson. Deve sempre ser entre -1 e 1. Aqui ja está multiplicado por 100
		document.getElementById('resultadoCorrelacao').innerHTML = r + "%"; //exibe o valor da correlação
	    var a = (((tamanhoVetor*produtoXY)-(somaX*somaY))/(tamanhoVetor*xQuadrado-(somaX*somaX))).toFixed(2);
	    // 'a', assim como o 'b' são parametros a serem estimados para a formula de regressão: y=a*x+b
	    var yLinha = (somaY / tamanhoVetor).toFixed(2);//utiliza-se para se obter o valor de b
	    var xLinha = (somaX/tamanhoVetor).toFixed(2);//utiliza-se para se obter o valor de b
	    var b = (yLinha - a * xLinha).toFixed(2);

	   // console.log(tamanhoVetor + ";" + xLinha + ";" + yLinha)

	    //console.log("soma, somaY, produto, xQuadrado, yQuadrado são respectivamente: " + somaX + ";" + somaY + ";" + produtoXY + ";" + xQuadrado + ";" + yQuadrado )
        
        reta=[
	        {x:(yMin-b)/a,  y:yMin},
	        {x:(yMax-b)/a,  y:yMax}]
        //console.log(reta)

	    document.getElementById('equacaoCorrelacao').innerHTML = "Y = " + a + " * X " + " + " + b;
        //Projeção com X
        $("#projetaComX").click(function () {
            var xInserido = document.getElementById('inputProjecaoComX').value
            var SaidaProjecaoComX = (Number(a) * Number(xInserido)) + Number(b);
            document.getElementById('resultadoProjecaoComX').innerHTML = "A projeção de Y para X = " + xInserido + ", será = " + SaidaProjecaoComX
	    });
        
        $("#projetaComY").click(function () {
            var yInserido = document.getElementById('inputProjecaoComY').value
            var SaidaProjecaoComY = ((Number(yInserido) - Number(b) ) / Number(a));
            document.getElementById('resultadoProjecaoComY').innerHTML = "A projeção de X para Y = " + yInserido + ", será = " + SaidaProjecaoComY;
	    });

	    $('#divCanvas').append('<canvas id="myChart" width="400" height="400"></canvas>');

	    var ctx = document.getElementById("myChart");

	    var chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            type: 'line',
            label: 'X:',
            data: reta,
            fill: false,
            backgroundColor: "rgba(218,83,79, .7)",
            borderColor: "rgba(218,83,79, .7)",
            pointRadius: 0
          }, {
            type: 'bubble',
            label: 'Y:',
            data: pontos,
            backgroundColor: "rgba(76,78,80, .7)",
            borderColor: "transparent",
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }],
           
          }
        }
      });
	
    });
    
});

	
	