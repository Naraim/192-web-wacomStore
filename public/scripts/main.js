function handleLoad(){
  //-------------------------------------------Gallery ----------------------------------------
  var buttonR = document.querySelector('.button__right');
  var buttonL = document.querySelector('.button__left');
  var slider = document.querySelector('.gallery');
  var tape = slider.querySelector('.gallery__tape');
  var count = 0;

  var firstImg = document.querySelector('.gallery_image');
  var lastItem = document.querySelector('.gallery__item:nth-of-type(6)'); //Aquí seleccionamos al item #6 de .gallery__item
  console.log(lastItem);
  var lastImg = lastItem.querySelector('.gallery_image');

// Creo el último item COPIA del primero
  var newLast = document.createElement('div');
  newLast.classList.add('gallery__item');
  var newLastImg = document.createElement('img');
  newLastImg.setAttribute('src', firstImg.getAttribute('src'));
  newLastImg.classList.add('gallery_image');

  // Añado el div y el img a la cinta de imágenes. Los VINCULO :3
  newLast.appendChild(newLastImg);
  tape.appendChild(newLast); //Inserta al final de los hijos

// Creo el primer Item COPIA del último
  var newFirst = document.createElement('div');
  newFirst.classList.add('gallery__item');
  var newFirstImg = document.createElement('img');
  newFirstImg.setAttribute('src', lastImg.getAttribute('src'));
  newFirstImg.classList.add('gallery_image');

  newFirst.appendChild(newFirstImg);
  tape.insertBefore(newFirst, tape.firstChild); //(elElementoAPoner, Punto de Referencia (Si es el primer item, lo pone antes de ese item :v)

  function handleLast(){
    tape.classList.add('gallery__tape--inactive');
    tape.style.transform = 'translate(-80vw,0px)';
    count = 1;
  }

  function handleFirst(){
    tape.classList.add('gallery__tape--inactive');
    tape.style.transform = 'translate(-480vw,0px)';
    count = 6;
  }

  function handleClick(event){
      if(event.srcElement.classList.contains('btnR')){
          count++;
      }else if(event.srcElement.classList.contains('btnL') && count > 0){
          count--;
      }
      console.log(count);
      tape.style.transform = 'translate('+ (-1*80*count) +'vw, 0)';

      if(count == 2 || count == 0 || count == 5 || count == 7) {
        tape.classList.remove('gallery__tape--inactive');
      }

      if(count > tape.childElementCount - 2){
          setTimeout(handleLast, 300);
      }

      if(count < 1) {
        setTimeout(handleFirst, 300);
      }
  }

  buttonR.addEventListener('click', handleClick);
  buttonL.addEventListener('click', handleClick);

  // ----------------------------------- Bamboo paper ---------------------

  var rangeSlider = document.querySelector('.mainText__range');
  var paperImages = document.querySelector('.mainImage__paper');
  var source = paperImages.getAttribute("src");



   function handleRange() {
     var rangeValue = rangeSlider.value;
     var floatValue = rangeValue/9;
     var indexValue = Math.floor(floatValue);
       paperImages.setAttribute( 'src', "./img/paper_"+indexValue+".png" ) ;
     console.log(source);
     console.log(indexValue);
   }

   rangeSlider.addEventListener('input', handleRange);


}

window.addEventListener('load', handleLoad);
