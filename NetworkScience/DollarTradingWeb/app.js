(function () {
    'use strict';

    var count = 0;
    var intervalRef = 0;
    var graph = {x: [], y: []};

    $("#params").submit(paramsHandler);

    ///////////////////////////

    function giveFn(data) {
        data.population.forEach(p => {
            var i = data.population.indexOf(p);
            var r = Math.floor(Math.random() * data.n);
            while(r === i)
                r = Math.floor(Math.random() * data.n);
            data.population[i] -= data.g;
            data.population[r] += data.g;
        });
        return data.population.sort((a, b) => { return a-b });
    }

    function paramsHandler(e) {
        e.preventDefault();
        count = 0;
        clearInterval(intervalRef);
        var data = {
            c: $("#c").val(),
            g: Number($("#g").val()),
            t: Number($("#t").val()),
            n: Number($("#n").val()),
            m: Number($("#m").val()),
            s: Number($("#s").val())
        };
        var i = 0;
        for(i; i<data.n; i++)
            graph.x.push(i);
        data.population = setPopulation(data);
        intervalRef = setInterval(plotBarGraph, data.s, data);
    }

    function plotBarGraph(data) {
        graph.y=[];
        data.population = giveFn(data);
        data.population.forEach(p => { graph.y.push(p) });
        Plotly.newPlot('graphDiv', [{ x: graph.x, y: graph.y, type: 'bar', marker: { color: data.c } }]);
        count += 1;
        if(count >= data.t) 
            clearInterval(intervalRef);
    }

    function setPopulation(data) {
        var population = [];
        var i = 0;
        for(i; i < data.n; i+=1) {
            population.push(data.m);
        }
        return population;
    }
})();