class Register {
    #stockData;

    constructor(){
        this.#stockData = require("./data.json");
        if(!this.#stockData.log){ this.#stockData.log = [] } // Creates the "log" array to register the changes on stock.
    }

    #generateId(){ // Might use UUID but want to do it myself.
        const id = Math.round(Date.now() + (Math.random()*1000000));
        let inUse = false;

        this.#stockData.log.forEach(log => {
            if(log.id == id){inUse = true}
        })

        if(inUse){return this.#generateId()}
        
        return id;
    }

    #getItem(code){
        let item;

        this.#stockData.estoque.forEach(product => {
            if(product.codigoProduto == code){ item = product }
        })
        
        return item;
    }

    #setLog(item, msg){ // Register the modifications on stock.
        this.#stockData.log.push({
            id: this.#generateId(),
            code: item.codigoProduto,
            description: msg
        })
    }

    addItem(code, amount){ // Adds n itens on stock.
        const item = this.#getItem(code);
        if(!item){return}

        item.estoque += amount;
        this.#setLog(item, `Adicionado ${amount}x "${item.descricaoProduto}" ao estoque.`);

        return item.estoque;
    }

    removeItem(code, amount){ // Removes n itens from stock.
        const item = this.#getItem(code);
        if(!item){return}
        
        if(item.estoque >= amount){
            item.estoque -= amount;
        }else{
            amount = item.estoque
            item.estoque -= amount;
        }
        
        this.#setLog(item, `Removido ${amount}x ${item.descricaoProduto} do estoque.`);

        return item.estoque;
    }

    registerItem(code, description){ // Registers a new item on stock.
        let item = this.#getItem(code);
        if(item){return item};

        item = {
            "codigoProduto": code,
            "descricaoProduto": description,
            "estoque": 0
        };

        this.#stockData.estoque.push(item);
        this.#setLog(item, `Registrado "${description}" no estoque.`);

        return item;
    }

    getLogs(){
        return this.#stockData.log;
    }
}



const register = new Register();

console.log(register.registerItem(106, "Liquid Paper"));
console.log(register.addItem(106, 10));
console.log(register.removeItem(106, 5));
console.log(register.removeItem(106, 100));

console.log(register.getLogs());