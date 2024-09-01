
// import { event } from 'jquery';
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeOnCard } from './components/card.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getInfo, getInitialCards, editInfoUser, addNewCard, changeAvatar } from './components/api.js';
//import { data, error } from 'jquery';


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button')
const popupTpEdit = document.querySelector('.popup_type_edit')
const popupTpNewCard = document.querySelector('.popup_type_new-card')
const popupImage = document.querySelector('.popup__image')
const popupTpImage = document.querySelector('.popup_type_image')
const popupCaption = document.querySelector('.popup__caption')
// const editSaveBtn = document.querySelector('.popup__button')

const profileTitle = document.querySelector('.profile__title')
const profileImg = document.querySelector('.profile__image')
const profileDescription = document.querySelector('.profile__description')
const formEditProfile = document.forms['edit-profile']
const editProfileSaveBtn = formEditProfile.querySelector('.popup__button')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const popupCloseBtns = document.querySelectorAll('.popup__close')
const popup = document.querySelector('.popup')
const linkInput = document.querySelector('.popup__input_type_url')
const formNewPlace = document.forms['new-place']
const saveBtnNewCard = formNewPlace.querySelector('.popup__button')
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardLinkInput =  document.querySelector('.popup__input_type_url')

const changeAvatarPopup = document. querySelector('.popup__change-avatar')
const avatarButton = document.querySelector('.profile__image')
const formChangeAvatar = changeAvatarPopup.querySelector('.popup__form')
const avatarFormInput = formChangeAvatar.querySelector('.popup__input_type_url_avatar')
const avatarSaveBtn = formChangeAvatar.querySelector('.popup__button')


enableValidation(validationConfig);

//вывожу карточки на страницу
// initialCards.forEach(function (element) {
//    const newCard = createCard(element, deleteCard, likeOnCard, openPopupImage) 
//    placesList.append(newCard)
//  })
let userId

// @todo: Вывести карточки на страницу (теперь с сервера)
function getInfoAndCards () {
  return Promise.all([getInfo(), getInitialCards()])
  .then(([userData, cardsData] ) => {
  console.log({userData, cardsData})
  
  profileTitle.textContent =  userData.name;
  profileDescription.textContent = userData.about;
  profileImg.style.backgroundImage = `url(${userData.avatar})`;

  userId = userData._id

  cardsData.forEach((element) => {
    const newCard = createCard(element, userId, deleteCard, likeOnCard, openPopupImage) 
    placesList.append(newCard)
  }) 
  })
  .catch((err) => {
    console.log(err)
  })
}

getInfoAndCards()

  //функция октрытия попапа по клику на картинку
  function openPopupImage (item) {
    popupImage.src = item.link
    popupImage.alt = item.name
    popupCaption.textContent = item.name
    openPopup(popupTpImage)
  }
//Обработчик по клику на аватар (для смены)
avatarButton.addEventListener ('click', () => {

  avatarFormInput.value = '';
  
  clearValidation(changeAvatarPopup, validationConfig)
  openPopup(changeAvatarPopup);
  })
  
  //меняем аватар (функция)
  formChangeAvatar.addEventListener('submit', () => {
    
    changeBtnText(avatarSaveBtn, true)
    changeAvatar(avatarFormInput.value)
    .then((res) => {
      console.log(res)
      avatarButton.style.backgroundImage = `url(${res.avatar})`
      console.log(`url(${res.avatar})`)
      closePopup(changeAvatarPopup)
    })
    .catch((err) => {
      console.log(err)
    })
  
    .finally(() => {
      changeBtnText(avatarSaveBtn, false)
    })
  })
  
  
  //обработчик открытия модального окна по кнопке (редактирование профиля)
  profileEditBtn.addEventListener('click', () => {
    openPopup(popupTpEdit)
    clearValidation(popupTpEdit, validationConfig)

    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
  })

  //функция  отправки формы "редкатировать профиль"
  function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    changeBtnText(editProfileSaveBtn, true)
    editInfoUser(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name
      profileDescription.textContent = data.about
      closePopup(popupTpEdit)
     })

    .catch((err) => {
      // console.log(err)
    })

    .finally(() => {
      changeBtnText(editProfileSaveBtn, false)
    })
}

formEditProfile.addEventListener('submit', handleFormSubmitProfile);

//обработчик открытия модального окна по кнопке добавить (добвление карточки)
profileAddBtn.addEventListener('click', () => {
  openPopup(popupTpNewCard)
  clearValidation(popupTpNewCard, validationConfig)
} )

   //добавление новой карточки в начало и очистка формы
   function createNewCard (event) {
    event.preventDefault();

    changeBtnText(saveBtnNewCard, true)
    const element = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    }

    addNewCard(element)
    .then((data) => {
      const newCardPopup = createCard(data, userId, deleteCard, likeOnCard, openPopupImage)

      placesList.prepend(newCardPopup)
      closePopup(popupTpNewCard)
      event.target.reset()
    })
    .catch((err) => {
      console.log(err)
    })
  
    .finally(() => {
      changeBtnText(saveBtnNewCard, false)
    })
  }
  
formNewPlace.addEventListener('submit', createNewCard)


//обработчик закрытия попапов по нажатию на крестик
popupCloseBtns.forEach(event => {
  const popup = event.closest('.popup')
 event.addEventListener('click', () => {
   closePopup(popup)
 })
});


//Функция смены статуса кнопки

function changeBtnText (buttonElement, status) {
  
  buttonElement.textContent = status ? 'Сохранение...' : 'Сохранить'
}