window.onload = function () {
    console.log("hello world");

    var app = new Vue({
        el: "#app",
        data: function () {
            return {
                symptomList: [],
                json: null
            }
        },
        methods: {
            add: function(obj){ 
                this.symptomList.push(obj.symptom); 
            }
        }
    });

    $.getJSON('data.json', function (json) {
        app.json = json;
    });
}