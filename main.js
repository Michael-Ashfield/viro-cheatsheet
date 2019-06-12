window.onload = function () {
    console.log("hello world");

    var app = new Vue({
        el: "#app",
        data: function () {
            return {
                symptomList: [],
                symptomTotals: [{
                    "stealth": 0,
                    "resistance": 0,
                    "speed": 0,
                    "transmission": 0,
                }],
                json: null
            }
        },
        methods: {
            add: function (obj) {
                if (!this.symptomList.includes(obj)) {
                    if (this.symptomList.length <= 6) {
                        this.symptomList.push(obj);
                    }
                }
                let stealthTotal = 0;
                let resistanceTotal = 0;
                let speedTotal = 0;
                let transmissionTotal = 0;
                for (let index in this.symptomList) {
                    stealthTotal += this.symptomList[index].stealth;
                    resistanceTotal += this.symptomList[index].resistance;
                    speedTotal += this.symptomList[index].stagespeed;
                    transmissionTotal += this.symptomList[index].transmission;
                }
                this.symptomTotals.stealth = stealthTotal;
                this.symptomTotals.resistance = resistanceTotal;
                this.symptomTotals.speed = speedTotal;
                this.symptomTotals.transmission = transmissionTotal;
            },
        }
    });

    $.getJSON('data.json', function (json) {
        app.json = json;
    });
}