const assert = require("assert");

function createRoutes( app, db){
    app.get("/", (request, response) =>{
        response.sendFile(`${__dirname}/public/index.html`);
    });
    
    app.get("/tienda", (request, response) =>{
        response.sendFile(`${__dirname}/public/store.html`);
    });
    
    app.get("/comprar", (request, response) =>{
        response.sendFile(`${__dirname}/public/shoppingCar.html`);
    });
   
    app.get("/pagar", (request, response) =>{
        response.sendFile(`${__dirname}/public/checkout.html`);
    });
}

module.exports = createRoutes;