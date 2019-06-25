window.onload = function () {
    console.log("hello world");

    var app = new Vue({
        el: "#app",
        data: function () {
            return {
                cureList: [
                    "Table Salt",
                    "Sugar",
                    "Orange juice",
                    "Spaceacillin",
                    "Saline-Glucose Solution",
                    "Ethanol",
                    "Leporazine",
                    "Synaptizine",
                    "Lipolicide",
                    "Silver",
                    "Gold"
                ],
                chemicalList: [
                    "Virus Rations",
                    "Virus Food",
                    "Mutagenic Agar",
                    "Sucrose Agar",
                    "Weakened Virus Plasma",
                    "Virus Plasma",
                    "Unstable Uranium Gel",
                    "Stable Uranium Gel"
                ],
                symptomList: [],
                symptomTotals: [{
                    "stealth": 0,
                    "resistance": 0,
                    "speed": 0,
                    "transmission": 0,
                    "cure": "",
                    "chemicals": [],
                    "level": 0
                }],
                json: null
            }
        },
        methods: {
            add: function (obj) {
                if (!this.symptomList.includes(obj)) {
                    if (this.symptomList.length != 6) {
                        this.symptomList.push(obj);
                        for (let jsonIndex in this.json) {
                            if (this.json[jsonIndex].symptom == obj.symptom) {
                                this.json[jsonIndex].isActive = "active";
                            }
                        }
                    }
                }
                this.update_totals();
            },
            remove: function (obj) {
                if (this.symptomList.includes(obj)) {
                    if (this.symptomList.length >= 0) {
                        for (let index in this.symptomList) {
                            if (this.symptomList[index] == obj) {
                                this.symptomList.splice(index, 1);
                                for (let jsonIndex in this.json) {
                                    if (this.json[jsonIndex].symptom == obj.symptom) {
                                        this.json[jsonIndex].isActive = "";
                                    }
                                }
                            }
                        }
                    }
                }
                this.update_totals();
            },
            update_totals: function () {
                let stealthTotal = 0;
                let resistanceTotal = 0;
                let speedTotal = 0;
                let transmissionTotal = 0;
                let level = 0;
                let chemicalArray = [];
                for (let index in this.symptomList) {
                    stealthTotal += this.symptomList[index].stealth;
                    resistanceTotal += this.symptomList[index].resistance;
                    speedTotal += this.symptomList[index].stagespeed;
                    transmissionTotal += this.symptomList[index].transmission;
                    level = this.symptomList[index].level;

                    switch (level) {
                        case 1:
                            chemicalArray.push(this.chemicalList[0]);
                            break;
                        case 2:
                            chemicalArray.push(this.chemicalList[1]);
                            break;
                        case 3:
                            chemicalArray.push(this.chemicalList[2]);
                            break;
                        case 4:
                            chemicalArray.push(this.chemicalList[3]);
                            break;
                        case 5:
                            chemicalArray.push(this.chemicalList[4]);
                            break;
                        case 6:
                            chemicalArray.push(this.chemicalList[5]);
                            break;
                        case 7:
                            chemicalArray.push(this.chemicalList[6]);
                            break;
                        case 8:
                            chemicalArray.push(this.chemicalList[7]);
                            break;
                    }
                }

                switch (resistanceTotal) {
                    case 1:
                        this.symptomTotals.cure = this.cureList[0];
                        break
                    case 2:
                        this.symptomTotals.cure = this.cureList[1];
                        break
                    case 3:
                        this.symptomTotals.cure = this.cureList[2];
                        break
                    case 4:
                        this.symptomTotals.cure = this.cureList[3];
                        break
                    case 5:
                        this.symptomTotals.cure = this.cureList[4];
                        break
                    case 6:
                        this.symptomTotals.cure = this.cureList[5];
                        break
                    case 7:
                        this.symptomTotals.cure = this.cureList[6];
                        break
                    case 8:
                        this.symptomTotals.cure = this.cureList[7];
                        break
                    case 9:
                        this.symptomTotals.cure = this.cureList[8];
                        break
                    default:
                        if (resistanceTotal < 1) {
                            this.symptomTotals.cure = this.cureList[0];
                        } else {
                            this.symptomTotals.cure = this.cureList[8];
                        }
                }

                this.symptomTotals.chemicals = [...new Set(chemicalArray)];
                this.symptomTotals.stealth = stealthTotal;
                this.symptomTotals.resistance = resistanceTotal;
                this.symptomTotals.speed = speedTotal;
                this.symptomTotals.transmission = transmissionTotal;
            }
        }
    });

    $.getJSON('data.json', function (json) {
        app.json = json;
    });
}