
// import { event } from 'jquery';
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeOnCard } from './components/card.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button')
const popupTpEdit = document.querySelector('.popup_type_edit')
const popupTpNewCard = document.querySelector('.popup_type_new-card')
const popupImage = document.querySelector('.popup__image')
const popupTpImage = document.querySelector('.popup_type_image')
const popupCaption = document.querySelector('.popup__caption')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const formdEditProfile = document.forms['edit-profile']
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const popupCloseBtns = document.querySelectorAll('.popup__close')
const popup = document.querySelector('.popup')
const linkInput = document.querySelector('.popup__input_type_url')
const formNewPlace = document.forms['new-place']
const cardNameInput = document.querySelector('.popup__input_type_card-name')



//вывожу карточки на страницу
initialCards.forEach(function (element) {
  const newCard = createCard(element, deleteCard, likeOnCard, openPopupImage) 
  placesList.append(newCard)
})


  //обработчик открытия модального окна по кнопке (редактирование профиля)
  profileEditBtn.addEventListener('click', () => {
    openPopup(popupTpEdit)
    clearValidation(popupTpEdit, validationConfig)

    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
  })

  //обработчик открытия модального окна по кнопке добавить
  profileAddBtn.addEventListener('click', () => {
    openPopup(popupTpNewCard)
    clearValidation(popupTpNewCard, validationConfig)
  } )


  //функция октрытия попапа по клику на картинку
  function openPopupImage (item) {
    popupImage.src = item.link
    popupImage.alt = item.name
    popupCaption.textContent = item.name
    openPopup(popupTpImage)
  }

  //функция отмены стандартной отправки формы
  function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value

    closePopup(popupTpEdit)
  }
  formdEditProfile.addEventListener('submit', handleFormSubmitProfile); 

  
  //обработчик закрытия попапов по нажатию на крестик
  popupCloseBtns.forEach(event => {
     const popup = event.closest('.popup')
    event.addEventListener('click', () => {
      closePopup(popup)
    })
  });
 
   //добавление новой карточки в начало и очистка формы
   function createNewCard (event) {
    event.preventDefault();

    const element = {
      name: cardNameInput.value,
      link: linkInput.value,
    }
    const newCardPopup = createCard(element, deleteCard, likeOnCard, openPopupImage)

    placesList.prepend(newCardPopup)
    closePopup(popupTpNewCard)
    event.target.reset()
   }


formNewPlace.addEventListener('submit', createNewCard)

enableValidation(validationConfig);