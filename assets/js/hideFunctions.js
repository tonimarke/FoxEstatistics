$(document).ready(function(){                                       $("#rowCorrelacao").hide();//esconde correlação
     $("#btnCorrelacao").click(function () {//mostra correlação ao clicar no botão
         $("#rowDescritiva").hide('slow');
         $("#rowProbabilidade").hide('slow'); //esconde outras funções abertas
         $("#rowCorrelacao").show(400); //mostra correlação
    });
});

$(document).ready(function(){ 
    $("#rowUniforme").hide(); //deixa oculta uniforme
    $("#rowBinomial").hide(); //deixa oculta binomial
    $("#rowNormal").hide(); //deixa oculta normal
    $("#rowProbabilidade").hide(); //Esconde probabilidade
     $("#btnProbabilidade").click(function () {
         $("#rowDescritiva").hide('slow');
         $("#rowCorrelacao").hide('slow');//esconde outras funções abertas
         $("#rowProbabilidade").show(400); //mostra probabilidade
    });
});

$(document).ready(function(){ 
    $("#rowBinomial").hide(); //deixa oculta binomial
     $("#btnBinomial").click(function (){
         $("#rowNormal").hide('slow');
         $("#rowUniforme").hide('slow');//oculta outras funções abertas
         $("#rowBinomial").show(400); //exibe a função binomial
    });
});

$(document).ready(function(){ 
    $("#rowNormal").hide(); //deixa oculta normal
     $("#btnNormal").click(function (){
         $("#rowUniforme").hide('slow');
         $("#rowBinomial").hide('slow');//oculta as outras funções abertas
         $("#rowNormal").show(400); //exibe a função normal
    });
});

$(document).ready(function(){ 
     $("#btnUniforme").click(function (){
         $("#rowBinmomial").hide('slow');
         $("#rowNormal").hide('slow');//oculta as outras funções abertas
         $("#rowUniforme").show(400); //exibe a função uniforme
    });
});

$(document).ready(function(){
   // $("#valorQuartil").hide();
   // $("#valorQuintil").hide();
   // $("#valorDecil").hide();
   // $("#porcentil").hide();
    $("#rowDescritiva").hide();//Esconde todos os intens até serem selecionados, inclusive o card
    $("#btnDescritiva").click(function (){
         $("#rowCorrelacao").hide('slow');
         $("#rowProbabilidade").hide('slow');//oculta as outras funções abertas
         $("#rowDescritiva").show(400); //exibe a função uniforme
    });
});