const vendasData = require("./data.json");



function checkSales(data){
    const bonus = {}; // List with all sellers and their comission.

    data.vendas.forEach(log => {
        if(!bonus[log.vendedor]){ bonus[log.vendedor] = 0 } // Check if seller is already in the list and adds him case not.

        let comission = 0;

        if(log.valor >= 500){
            comission = log.valor*0.05;
        }else if(log.valor >= 100){
            comission = log.valor*0.01;
        }

        bonus[log.vendedor] += Math.floor(comission); // Adds the comission value to seller's data.
    });

    return bonus
}



const comission = checkSales(vendasData)
for(const key in comission){ console.log(`Comissão de ${key}: R$${comission[key]}`) } // Outputs the result.