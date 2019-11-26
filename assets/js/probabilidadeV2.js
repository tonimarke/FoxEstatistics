$(document).ready(function(){    
    //PROBABILIDADE BINOMIAL
    $("#calcularBinomial").click(function () {
    let resultado = 0;
    let mediaBinomial, dpUniforme, k, n, p, q;

//    function binomial(){    iniciado pelo jquery
        //variaveis
        k = parseFloat(document.getElementById("valorK").value);
        n = parseFloat(document.getElementById("valorN").value);
        p = parseFloat(document.getElementById("valorP").value);
        q = 1 - p;
        console.log("q"+q);
        var fatorial = function(num){
            if (num === 0) {
                return 1;
            }
            else{
                var resp = 1;
                for (var i = 1; i <= num; i++) {
                    resp *= i;  
                }
                console.log("fato" + resp);
                return resp;
            }
        };

    for (let i = 0; i < k; i++) {
        resultado += analiseCombinatoria(n, k[i]) * Math.pow(p, k[i]) * Math.pow(q, n - k[i]);
    }
            //resultados
            mediaPB(n, p);
            desvioPadrao_uniforme(n, p, q);
            var resultadoPorcent = (resultado * 100).toFixed(2);
            document.getElementById("probabilidadeBinom").innerHTML = ("Probabilidade: " + resultadoPorcent + "<br>" + "Media: "+ mediaBinomial + "<br>" + "Desvio Padrão : " + dpUniforme + "<br>");
    
// Analise Combinatoria
function analiseCombinatoria(n, k){
    let resultado = 0;

    resultado = fatorial(n) / (fatorial(k) * (fatorial(n - k)));
    return resultado
}

    //PROBABILIDADE BINOMIAL: MÉDIA
    function mediaPB(n, p){
        mediaBinomial = n * p;
        console.log("mediabi" + mediaBinomial);
        return mediaBinomial;
    }
    //PROBABILIDADE BINOMIAL: DP
    function desvioPadrao_uniforme(n, p, q){
        dpUniforme = Math.sqrt(n * p * q);
        console.log("dp" + dpUniforme);
        return dpUniforme;
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