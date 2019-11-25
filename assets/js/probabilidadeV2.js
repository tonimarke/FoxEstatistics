$(document).ready(function(){    
    $("#calcularBinomial").click(function () {
    //PROBABILIDADE BINOMIAL
    let resultado = 0;
    let mediaBinomial, dpUniforme, probabilidadepercem, k, n, p, q;

//    function binomial(){    iniciado pelo jquery
        //variaveis
        var input = document.getElementById("evento_prob").value;
        var aux = input.split("; ");
        var evento = [];	
            for (i = 0; i < aux.length; i++){
                evento.push(parseFloat(aux[i]));
            }
        k = evento.length;
        n = document.getElementById("valorN").value;
        p = document.getElementById("valorK").value;
        q = document.getElementById("valorP").value;

        //"processamento"
        var probabilidade = 0;
        for (let i = 0; i < k.length; i++) {
            probabilidade += analiseCombinatoria(n, k[i]) * Math.pow(p, k[i]) * Math.pow(q, n - k[i]);
        }

        //resultados
        mediaPB(n, p);
        desvioPadrao_uniforme(n, p, q);
        probabilidadepercem = (probabilidade * 100).toFixed(2);
        document.getElementById("probabilidadeBinom").innerHTML = ("Probabilidade: " + probabilidadepercem + "<br>" + "Media: "+ mediaBinomial + "<br>" + "Desvio Padrão : " + dpUniforme + "<br>");
//    }

    //PROBABILIDADE BINOMIAL: MÉDIA
    function mediaPB(n, p){
        mediaBinomial = n * p;
        return mediaBinomial;
    }
    //PROBABILIDADE BINOMIAL: DP
    function desvioPadrao_uniforme(n, p, q){
        dpUniforme = Math.sqrt(n * p * q);
        return dpUniforme;
    }

    function analiseCombinatoria(n, k){

        resultado = fatorial(n) / (fatorial(k) * (fatorial(n - k)));

        return resultado;
    }

    });

    //PROBABILIDADE UNIFORME

    $("#calcularUniforme").click(function () {

    var a, b, varianciaUniforme, mediaUniforme, desvioPadraoUniforme, CVUniforme;

    // function probUniforme(){ acionado pelo jqyery
        var selectUniforme = document.getElementById("selectUniforme").value;
        a = parseInt(document.getElementById('pontoMinUniforme').value);
        b = parseInt(document.getElementById('pontoMaxUniforme').value);
        var valor = document.getElementById('quantidadeUniforme').value;

        //digita o maximo e o mínimo o usuario seleciona mais que/entre/menor que
        switch (selectUniforme) {
            case '1':
                var probUniMaior = valor;
                var probabilidade = ((1 / (b - a)) * (b - probUniMaior)) * 100;
                console.log("probuni" + probabilidade);
                saida();
                return probabilidade;
            case '2':
                var aEntre = document.getElementById('deX').value;
                var bEntre = document.getElementById('ateY').value;
                var probabilidade = ((1 / (b - a)) * (bEntre - aEntre)) * 100;
                console.log("probuni" + probabilidade);
                saida();
                return probabilidade;
            case '3':
                var probUniMenor = valor;
                var probabilidade = ((1 / (b - a)) * (probUniMenor - a)) * 100;
                console.log("probuni" + probabilidade);
                saida();
                return probabilidade;
        }

        function saida(){
        mediaPU(a, b);
        varianciaPU(a, b);
        dpPU(varianciaUniforme);
        cvPU(desvioPadraoUniforme, mediaUniforme);
        document.getElementById('probabilidadeUnif').innerHTML = ("Probabilidade: " + probabilidade + "%" + "<br>" + "Media: "+ mediaUniforme + "<br>" + "Variância: " + varianciaUniforme + "<br>" + "Desvio Padrão : " + desvioPadraoUniforme + "<br>" + "Coeficiente de Variação" + CVUniforme + "<br>");
        }
    //}

    //PROBABILIDADE UNIFORME: MÉDIA
    function mediaPU(a, b){
        mediaUniforme = (a + b) / 2;
        return mediaUniforme;
    }

    //PROBABILIDADE UNIFORME: VARIÂNCIA
    function varianciaPU(a, b){
        varianciaUniforme = ((b - a) ** 2) / 12;
        return varianciaUniforme;
    }

    //PROBABILIDADE UNIFORME: DP
    function dpPU(variancia){
        desvioPadraoUniforme = Math.sqrt(variancia);
        return desvioPadraoUniforme;
    }

    //PROBABILIDADE UNIFORME: CV
    function cvPU(desvioPadraoUniforme, mediaUniforme){
        CVUniforme = (desvioPadraoUniforme / mediaUniforme) * 100;
        return CVUniforme;
    }

    document.getElementById('probabilidadeUnif').innerHTML = ("Probabilidade: " + probabilidade + "%" + "<br>" + "Media: "+ mediaUniforme + "<br>" + "Variância: " + varianciaUniforme + "<br>" + "Desvio Padrão : " + desvioPadraoUniforme + "<br>" + "Coeficiente de Variação" + CVUniforme + "<br>");

    });

});