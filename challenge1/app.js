class Sales {
    #salesData;

    constructor(){
        this.#salesData = require("./data.json").vendas;
    }

    calculateComissions(){
        const comission = {};

        this.#salesData.forEach(data => {
            if(!comission[data.vendedor]){ comission[data.vendedor] = 0 } // Check if seller is already in the list and adds him case not.

            let value = 0;

            if(data.valor >= 500){
                value = data.valor*.05;
            }else if(data.valor >= 100){
                value = data.valor*.01;
            }

            comission[data.vendedor] += Math.floor(value);
        });

        return comission;
    }
}

const sales = new Sales();
const comissions = sales.calculateComissions();