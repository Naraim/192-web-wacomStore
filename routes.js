const assert = require("assert");
const ObjectID = require('mongodb').ObjectID;

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

    app.get("/exitoso", (request, response) =>{
        response.sendFile(`${__dirname}/public/succesful.html`);
    });

    app.get("/producto", (request, response) =>{
        response.sendFile(`${__dirname}/public/product.html`);
    });

    app.get('/producto/:id', (request, response) => {
        const products = db.collection('products');

        products.find({ _id: new ObjectID(request.params.id)}).toArray((err, result) => {
            assert.equal(null, err);

            var context = {
                product: result[0]
            };

            response.render('product', context);
        });
    });

    app.get("/api/products", (request, response) =>{
        const products = db.collection('products');
       
        var filters = {};
        
        if(request.query.price != undefined){
            filters.price = {$lte: parseInt(request.query.price)};
        }

        if(Array.isArray(request.query.type)) {
            filters.type = { $in: request.query.type };
        } else if(request.query.type != undefined) {
            filters.type = request.query.type;
        }

        if(request.query.stock != undefined) {
            filters.stock = request.query.stock;
        }
        console.log(filters);

        var cursor = products.find(filters);
       
       cursor.toArray((err, result) =>{
            assert.equal(null, err);

            response.send(result);
        });
    });
}

    module.exports = createRoutes;