
 const cardTemplate = document.querySelector('#card-template').content
import { addLikeCard, deleteLikeCard } from "./api.js"
import { openPopup, closePopup } from "./modal.js"
// //@todo: Функция создания карточки
function createCard(element, userId, openPopupToDelCard, likeOnCard, openPopupImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardDelete = cardElement.querySelector('.card__delete-button')
    const cardLike = cardElement.querySelector('.card__like-button')
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const likeCont = cardElement.querySelector('.card__like-button-count')

const cardId = element._id

    cardImage.src = element.link;
    cardTitle.textContent = element.name;
    cardImage.alt = `Изображение ${element.name}`;
    likeCont.textContent = element.likes.length

    cardImage.addEventListener('click', () => {
        openPopupImage(element)
    })
    // cardDelete.addEventListener('click', deleteCard)
    // cardLike.addEventListener('click', likeOnCard) 
    if (element.likes.some((like) => like._id == userId)) {
        cardLike.classList.add('card__like-button_is-active');
      }
    
      if (userId != element.owner._id) {
        cardDelete.remove();
      } else {
        cardDelete.addEventListener('click', () => {
          openPopupToDelCard(cardElement, cardId);
        });
      }
    
      cardLike.addEventListener('click', (evt) => {
        likeOnCard(evt, cardId, likeCont)
      })
    
   
return cardElement
}


//функция лайка на карточке
function likeOnCard(evt, cardId, likeCont) {
    const likeButton = evt.target;
    if (!likeButton.classList.contains('card__like-button_is-active')) {
      // console.log(cardId)
      addLikeCard(cardId)
      .then((res) => {
        likeButton.classList.add('card__like-button_is-active')
        likeCont.textContent = res.likes.length
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
  } else {
    deleteLikeCard(cardId)
    .then((res) => {
      likeButton.classList.remove('card__like-button_is-active')
      likeCont.textContent = res.likes.length
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
  });
  }

}
 

  export {createCard, likeOnCard}