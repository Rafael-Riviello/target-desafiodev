class Calculator{
    calculateTaxes(value, endDate){
        const date0 = endDate.getTime();
        const date1 = Date.now();
        
        const diff = Math.abs(date1 - date0);
        const days = Math.floor(diff / 86400000)

        // About the tax, is it progressive or based on the provided value? I will consider it fixed.

        return (value*.025) * days;
    }
}



const calculator = new Calculator();
const value = 1000;
const endDate = new Date("November, 20, 2025");

const tax = calculator.calculateTaxes(value, endDate);
console.log(tax);