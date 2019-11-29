function handleLoad(){

    function getItems(route){
        fetch('/api/products'+ route).then((raw) =>{

            return raw.json();
        }).then((info) =>{
            var container = document.querySelector('.store__products');
    
            container.innerHTML = '';
    
            info.forEach(element => {
                var item = document.createElement('div');
                item.classList.add('item');
    
                var link = document.createElement('a');
                link.setAttribute('href', '/producto/'+element._id);
                
                var img = document.createElement('img');
                img.classList.add('item__img');
                img.setAttribute('src', element.images[0]);
    
                var data = document.createElement('div');
                data.classList.add('item__data');
    
                var name = document.createElement('p');
                name.classList.add('text', 'text--storeName');
                name.innerHTML = element.name;
    
                var price = document.createElement('p');
                price.classList.add('text', 'text--storePrice');
                price.innerHTML = '€'+element.price;
    
                var add = document.createElement('a');
                add.classList.add('buttonPay',  'buttonPay--add');
                add.innerHTML = 'Añadir al carrito';
    
                link.appendChild(img);
                item.appendChild(link);
                data.appendChild(name);
                data.appendChild(price);
                item.appendChild(data);
                item.appendChild(add);
    
                container.appendChild(item);
            });
        });
    }

    getItems('');

    var range = document.querySelector('.filters__range');
    var check = document.querySelectorAll('.filters__box');

    function handleChange(){
        var route = '?price=' + range.value;
        check.forEach((checkBox, index) =>{
            if(checkBox.checked) {
                if(index == check.length-1) {
                    route = route.concat('&stock='+checkBox.value);
                 }else {
                     route = route.concat('&type='+checkBox.value);
                 }                
            }
        });

        getItems(route); 
    }
    range.addEventListener('change', handleChange);

    check.forEach((checkBox) => {
        checkBox.addEventListener('change', handleChange);
    });
}

window.addEventListener('load', handleLoad);