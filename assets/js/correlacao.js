function correlacao() {
	
	var arrayX = []; var arrayY = [];var reta=[]; var pontos=[];
    var correlacaoX = (document.getElementById("correlacaoX").value); //pega valor do input da variavel dependente
    var correlacaoY = (document.getElementById("independente").value); //pega valor do input da variavel independente

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
       somaX += arrayX[i];//calcula a soma de todos os valores de y
 	
    var produtoXY = 0;
    var xQuadrado = 0;
    var yQuadrado = 0;
    //Variaveis definidas acima, calculo realizado no for abaixo
    for (let i = 0; i < arrayX.length; i++) {
        produtoXY += arrayX[i] * y[i];
        xQuadrado += arrayX[i] * arrayX[i];
        yQuadrado += arrayY[i] * arrayY[i];

    }

    var r = (((tamanhoVetor*produtoXY)-((somaX)*(somaY)))/Math.sqrt((tamanhoVetor*xQuadrado-(somaX*somaX))*(tamanhoVetor*yQuadrado-(somaY*somaY)))*100).toFixed(2);
    // r é o coeficiente de correlação linear de Pearson. Deve sempre ser entre -1 e 1
	document.getElementById('resultadoCorrelacao').innerHTML = r + "%"; //exibe o valor da correlação
    var a = (((tamanhoVetor*produtoXY)-(somaX*somaY))/(tamanhoVetor*xQuadrado-(somaX*somaX))).toFixed(2);
    // 'a', assim como o 'b' são parametros a serem estimados para a formula de regressão: y=a*x+b
    var yLinha = (somaY / tamanhoVetor).toFixed(2);
    var xLinha = (somaX/tamanhoVetor).toFixed(2);
    var b = (yLinha - a * xLinha).toFixed(2);


}