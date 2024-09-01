// const formElement = document.querySelector('.popup__form')
// const formInput = formElement.querySelector('.popup__input')
// const formError = formElement.querySelector(`.${inputElement.id}-error`);

export const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// Функция добавления класса с ошибкой//
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

//Функция удаления класса с ошибкой//
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

//Проверяем валидность
const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };

  const hasInputValid = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Работа с кнопкой
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInputValid(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
  }
}
//Добавляем обработчики всем полям формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)

   toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);

       toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};
  
  //Добавляем обработчики всем формам
  export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    }); 
    };


  export const clearValidation = (formElement, validationConfig) => {
    // formElement.reset()

    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig)
    })

   
    buttonElement.disabled = true
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
  // enableValidation();
  // formInput.addEventListener('input', isValid);

  