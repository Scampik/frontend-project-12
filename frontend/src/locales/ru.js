// eslint-disable-next-line import/no-anonymous-default-export
export default {
  translation: {
    siteName: 'FunTalk',
    loginPage: {
      enter: 'Войти',
      regLink: 'Регистрация',
      invite: 'Нет аккаунта?',
    },
    signupPage: {
      registration: 'Зарегистрироваться',
      regTitle: 'Регистрация',
      username: {
        required: 'Обязательное поле',
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
      },
      password: {
        required: 'Обязательное поле',
        min: 'Не менее 6 символов',
        oneof: 'Пароли должны совпадать',
      },
    },
    modal: {
      required: 'Обязательное поле',
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
      notoneof: 'Должно быть уникальным',
    },
    toast: {
      createChannel: 'Канал создан',
      renameChannel: 'Канал переименован',
      removeChannel: 'Канал удалён',
      networkProblem: 'Ошибка соединения',
      duplicateUser: 'Такой пользователь уже существует',
    },
    addChannel: 'Добавить канал',
    channels: 'Каналы',
    cancel: 'Отменить',
    confirm: 'Уверены?',
    delete: 'Удалить',
    deleteChannel: 'Удалить канал',
    exit: 'Выйти',
    failedLogin: 'Неверные имя пользователя или пароль',
    inviteLogin: 'Уже есть аккаунт?',
    login: 'Авторизация',
    noPageSelected: 'No page is selected.',
    menu: 'Управление каналом',
    nameChannel: 'Имя канала',
    renameChannel: 'Переименовать канал',
    password: 'Пароль',
    passwordConfirm: 'Подтвердите пароль',
    send: 'Отправить',
    rename: 'Переименовать',
    yourNickname: 'Ваш ник',
    username: 'Имя пользователя',
    dataLoadFail: 'Что-то пошло не так',
    refreshMsg1: 'Но вы можете',
    refreshMsg2: 'обновить страницу',

    pageNotFound: {
      msg1: 'Страница не найдена',
      msg2: 'Но вы можете перейти',
      msg3: 'на главную страницу',
    },

    messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
  },
};
