import { formatCurrency } from "./money.js";

console.log(formatCurrency(19903))

if(formatCurrency(0) === '0.00'){
    console.log("passed")
} else{
    console.log("failed")
}