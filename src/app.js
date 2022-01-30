import images from './gallery-items.js';

    const ulOfImages = document.querySelector('.gallery');
    const imgLightBox = document.querySelector('.lightbox__image');
    const closeModalButton = document.querySelector('button[data-action="close-lightbox"]');
    const divLightBox = document.querySelector('.lightbox');
    const divLightBoxOverlay = document.querySelector('.lightbox__overlay');

    const galleryItemsRemastered = images.map( image =>{
        const liEl = document.createElement('li');
        const hrefEl = document.createElement('a');
        const imgEl = document.createElement('img');

        liEl.classList.add('.gallery__item');
        hrefEl.classList.add('.gallery__link');
        imgEl.classList.add('gallery__img');

        hrefEl.setAttribute('href', image.original);
        imgEl.setAttribute('src', image.preview);
        imgEl.setAttribute('alt', image.description);
        imgEl.setAttribute('data-source', image.original);

        hrefEl.append(imgEl);
        liEl.append(hrefEl);
        ulOfImages.append(liEl);
    });
    let thisImgSrc = '';
    const openModal = e =>{
        e.preventDefault();
        console.log(e.target);
        thisImgSrc = e.target.getAttribute('data-source');
        imgLightBox.setAttribute('src', thisImgSrc);
        divLightBox.classList.add('is-open');

        closeModalButton.addEventListener('click', closeModalByButton);
        divLightBoxOverlay.addEventListener('click', closeModalByLayout);
        window.addEventListener('keydown', escExit);

        window.addEventListener('keydown', rightArrow);
        window.addEventListener('keydown', leftArrow);
    }
    const justClose = () =>{
        imgLightBox.setAttribute('src', '');
        divLightBox.classList.remove('is-open');
    }
    const closeModalByButton = e =>{
        divLightBoxOverlay.removeEventListener('click', closeModalByLayout);
        window.removeEventListener('keydown', rightArrow);
        window.removeEventListener('keydown', leftArrow);
        window.removeEventListener('keydown', escExit);
        justClose();
    }

    const closeModalByLayout = e =>{
        closeModalButton.removeEventListener('click', closeModalByButton);
        window.removeEventListener('keydown', rightArrow);
        window.removeEventListener('keydown', leftArrow);
        window.removeEventListener('keydown', escExit);
        justClose();
    }

    const escExit = e =>{
        if(e.key === "Escape"){
            divLightBoxOverlay.removeEventListener('click', closeModalByLayout);
            closeModalButton.removeEventListener('click', closeModalByButton);
            window.removeEventListener('keydown', rightArrow);
            window.removeEventListener('keydown', leftArrow);
            justClose();
        }
    }

     const rightArrow = e =>{
         if(e.keyCode === 39){
            let currIndex = 0; 
             for(let i = 0; i < images.length; i += 1){
                 if(images[i].original.indexOf(thisImgSrc) != -1){
                     currIndex = i;
                     console.log(images[i]);
                     //break;
                 }
                 if(images[currIndex + 1] === undefined){
                     currIndex = -1;
                 }
             }
             thisImgSrc = images[currIndex + 1].original;
             imgLightBox.setAttribute('src', images[currIndex + 1].original);
             console.log('rightArr');
         }
     }
    
     const leftArrow = e =>{
        if(e.keyCode === 37){
           let currIndex = 0; 
            for(let i = 0; i < images.length; i += 1){
                if(images[i].original.indexOf(thisImgSrc) != -1){
                    currIndex = i;
                    console.log(images[i]);
                    //break;
                }
                if(images[currIndex - 1] === undefined){
                    currIndex = images.length;
                }
            }
            thisImgSrc = images[currIndex - 1].original;
            imgLightBox.setAttribute('src', images[currIndex - 1].original);
            console.log('leftArr');
        }
    }

    ulOfImages.addEventListener('click', openModal);
    //closeModalButton.addEventListener('click', closeModalByButton);

    // import images from './gallery-items.js';
    // const refs = {
    //     gallery: document.querySelector('.js-gallery'),
    //     modalBody: document.querySelector('.js-lightbox'),
    //     modalImg: document.querySelector('.lightbox__image'),
    //     modalBtn: document.querySelector('button[data-action="close-modal"]'),
    //     modalOverlay: document.querySelector('.lightbox__content'),
    //     btnModalLeft: document.querySelector('button[data-control="left"]'),
    //     btnModalRight: document.querySelector('button[data-control="right"]'),
    //   };
    //   const bigImgRefs = images.map(ref => ref.original);
    //   let imageUrl;
      
    //   function addGalleryItems(items) {
    //     items.forEach(item => {
    //       const galleryList = document.createElement('li');
    //       const galleryLink = document.createElement('a');
    //       const galleryImg = document.createElement('img');
    //       galleryList.classList.add('gallery__item');
    //       galleryLink.classList.add('gallery__link');
    //       galleryLink.setAttribute('href', item.original);
    //       galleryImg.classList.add('gallery__image');
    //       galleryImg.setAttribute('src', item.preview);
    //       galleryImg.setAttribute('data-source', item.original);
    //       galleryImg.setAttribute('alt', item.description);
    //       //galleryLink.append(galleryImg);
    //       galleryList.append(galleryImg);
    //       refs.gallery.append(galleryList);
    //     });
    //   }
      
    //   function openModal(event) {
    //     window.addEventListener('keydown', onPressEsc);
    //     window.addEventListener('keydown', handleArrowTap);
    //     if (event.target.tagName === 'IMG') {
    //       refs.modalBody.classList.add('is-open');
    //     }
    //   }
      
    //   function addImageModal(event) {
    //     const bigImgRef = event.target.getAttribute('data-source');
    //     const alt = event.target.getAttribute('alt');
    //     imageUrl = bigImgRef;
    //     refs.modalImg.setAttribute('src', bigImgRef);
    //     refs.modalImg.setAttribute('alt', alt);
    //   }
      
    //   function closeModal(event) {
    //     window.removeEventListener('keydown', handleArrowTap);
    //     if (event.target.nodeName === 'BUTTON') clearAributes();
    //     if (event.target === refs.modalOverlay) clearAributes();
    //   }
      
    //   function closeModalByEsc() {
    //     window.removeEventListener('keydown', toggleImg);
    //     window.removeEventListener('keydown', onPressEsc);
    //     clearAributes();
    //   }
      
    //   function onPressEsc(event) {
    //     if (event.code === 'Escape') {
    //       closeModalByEsc();
    //     }
    //   }
      
    //   function clearAributes() {
    //     refs.modalBody.classList.remove('is-open');
    //     refs.modalImg.removeAttribute('src');
    //     refs.modalImg.removeAttribute('alt');
    //   }
      
    //   function getImageUrl(value) {
    //     const newUrl = bigImgRefs.reduce((acc, item, index) => {
    //       if (item === imageUrl) {
    //         if (value === 'right') {
    //           acc = bigImgRefs[index + 1];
    //         }
    //         if (value === 'left') {
    //           acc = bigImgRefs[index - 1];
    //         }
    //       }
    //       return acc;
    //     }, '');
    //     if (newUrl !== undefined) {
    //       imageUrl = newUrl;
    //     }
    //     return imageUrl;
    //   }
      
    //   function handleArrowTap(event) {
    //     if (event.code === 'ArrowRight') {
    //       getImageUrl('right');
    //       changeModalImg();
    //     }
    //     if (event.code === 'ArrowLeft') {
    //       getImageUrl('left');
    //       changeModalImg();
    //     }
    //   }
      
    //   function handleButtonClick(event) {
    //     const currentButton = event.currentTarget.dataset.control;
    //     if (currentButton === 'right') {
    //       getImageUrl('right');
    //       changeModalImg();
    //     }
    //     if (currentButton === 'left') {
    //       getImageUrl('left');
    //       changeModalImg();
    //     }
    //   }
      
    //   function changeModalImg() {
    //     refs.modalImg.src = '';
    //     refs.modalImg.src = imageUrl;
    //   }
      
    //   addGalleryItems(images);
      
    //   refs.gallery.addEventListener('click', event => {
    //     event.preventDefault();
    //     openModal(event);
    //     addImageModal(event);
    //   });
      
    //   refs.modalBody.addEventListener('click', closeModal);
      
    //   //refs.btnModalLeft.addEventListener('click', handleButtonClick);
      
    //   //refs.btnModalRight.addEventListener('click', handleButtonClick);