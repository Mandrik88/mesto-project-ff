
export {openPopup, closePopup}
//Функиця открытия модального окна
const openPopup = (popup) => {
    popup.classList.add('popup_is-opened')
    // popup.classList.add('popup_is-animated')
    document.addEventListener('keydown', handleCloseEsc)
    popup.addEventListener('click', closeModal)
    }

//Функция закрытия модального окна
  const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleCloseEsc)
  popup.removeEventListener('click', closeModal)
  }

  //Функция закрытия по клавише Escape
const handleCloseEsc = (evt) => {
    if (evt.key === 'Escape') {
      const popupActive = document.querySelector('.popup_is-opened')
      closePopup(popupActive)
    }
  }
  
  const closeModal = (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    };
  };