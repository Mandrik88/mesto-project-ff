
 const cardTemplate = document.querySelector('#card-template').content

// //@todo: Функция создания карточки
function createCard(element, deleteCard, likeOnCard, openPopupImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)

    const cardDelete = cardElement.querySelector('.card__delete-button')
    const cardLike = cardElement.querySelector('.card__like-button')
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')

    cardImage.src = element.link;
    cardTitle.textContent = element.name;
    cardImage.alt = `Изображение ${element.name}`;

    cardImage.addEventListener('click', () => {
        openPopupImage(element)
    })
    cardDelete.addEventListener('click', deleteCard)
    cardLike.addEventListener('click', likeOnCard) 
     
   
return cardElement
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.card')
    card.remove()
}

//функция лайка на карточке
function likeOnCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
  }

  export {createCard, deleteCard, likeOnCard}