
import '../pages/index.css';
// import { initialCards } from './cards.js'

// @todo: Темплейт карточки
const cadrTemplate = document.querySelector('#card-template').content; 
const placeItem = document.querySelector('.places__item');



// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


//@todo: Функция создания карточки
function createCard(element, deleteCard) {
    const cardElement = cadrTemplate.querySelector('.places__item').cloneNode(true);
    const cardDelete = cardElement.querySelector('.card__delete-button');

    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')

    cardImage.src = element.link;
    cardTitle.textContent = element.name;
    cardImage.alt = `Изображение ${element.name}`;

    cardDelete.addEventListener('click', deleteCard) 
     
   
return cardElement
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    let card = event.target.closest('.card')
    card.remove()
    
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
const newCard = createCard(element, deleteCard)
placesList.append(newCard)
});
