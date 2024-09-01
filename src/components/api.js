const config = {
  baseURL: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: '145c40d0-c9ce-49f6-8809-5db7c0434961',
    'Content-Type': 'application/json'
  }
}
//  console.log(config);

const handleResponse = (res) => {
  if(res.ok){
    return res.json()
  }

  return Promise.reject(`Ошибка: ${res.status}`)
}
//Функция для получения данных о пользователе с сервера
 export const getInfo = () => {
    return fetch(`${config.baseURL}/users/me`, {
      headers: config.headers
    })
    .then(handleResponse)
} 
  //Функция загрузки карточек с сервера
 export const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
} 
//Редактирование данных профиля для сохранения на сервере
export const editInfoUser = (name, about) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(handleResponse)
} 
 //функция добавления новой карточки на сервер
 export const addNewCard = (cardDate) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardDate)
 })
 .then(handleResponse)
 }

 //функция удаления карточки с сервера
export const delCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//Поставить лайк на карточку
export const addLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
}

//Удаление лайка
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//смена аватара
export const changeAvatar = (delAvatar) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: delAvatar
  })
})
.then(handleResponse)
}