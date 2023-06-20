# Realtime Social app

## Запуск приложения

С рабочей версией проекта можно ознакомиться по ссылке: https://kdarenskii.github.io/react-social-app/  
(приложение было опубликовано с помощью сервиса [GitHub Pages](https://pages.github.com/))

Сервер был размещен с помощью сервиса [Glitch](https://glitch.com/)

#### Чтобы локально запустить приложение, необходимо:

1. Открыть папку с проектом.
2. Перейти в папку `client`.
3. В файле `./.env` заменить значения переменных `REACT_APP_API_URL` и `REACT_APP_SERVER_URL` на `http://localhost:8000/api` и `http://localhost:8000` соответственно.
4. В файле `./index.tsx` убрать атрибут `basename` у компонента `BrowserRouter`.
5. C помощью терминала и команды `npm i` установить все необходимые зависимости.
6. Командой `npm start` произвести запуск приложения.
7. Перейти в папку `server`, c помощью терминала и команды `npm i` установить все необходимые зависимости.
8. Командой `npm run start` произвести запуск приложения.

## Разработанный функционал

### Авторизация/Регистрация

На страницах авторизации и регистрации у пользователя есть возможность либо создать новый аккаунт либо войти в уже существующий. Данный функционал разрабатывался по принципу JWT авторизации с использованием access и refresh токенов. Access токен хранится в local storage, а refresh в cookie.

В текущей версии проекта есть недоработка, которая заключается в том, что сервис, используемый для размещения серверной части, не работает с cookie. Из-за чего при перезагрузке страницы, запрос на проверку access токена всегда заканчивается ошибкой, так как сервер не может получить доступа к refresh токену. Если запустить приложение локально, то ошибки не будет и всё будет работать правильно!

### Страница с новостной лентой

На новостной странице пользователь может просматривать посты, которые делал либо он сам, либо его друзья. Также есть возможность ставить лайки и видеть их текущее количество. При клике на лайк, автору поста будет отправлено realtime уведомление об этом.

При добавлении нового поста, можно добавить одну картинку и какой-либо текст.

У пользователя с ролью администратора есть дополнительная возможность удалять посты из ленты.

Также реализован бесконечный скролл, т.е. новые посты подгружаются при прокрутке страницы.

### Страница профиля

У каждого пользователя есть свой профиль, который он может просматривать и редактировать на соответствующей странице. В профиле отображается следующая информация: имя, фамилия, фотография, город, место учебы и возраст. Есть возможность добавить новый пост в своем профиле.

При входе в профиль других пользователей, можно добавить их в друзья или написать сообщение, нажав на соответствующие кнопки.

### Страница с сообщениями

На данной странице отображены все переписки пользователя. При переходе в какую-либо из них, можно отправить сообщение другому пользователю, и он увидит его в realtime режиме.

### Страница с друзьями

На странице с друзьями пользователь может просмотреть списки своих подписок, запросов в друзья и текущих друзей. Также можно перейти в раздел поиска новых друзей, увидеть список всех существующих пользователей и отправить им заявку в друзья. Чтобы найти конкретного пользователя, нужно воспользоваться поиском.

При отправке запроса на добавление в друзья, этому пользователю будет отправлено realtime уведомление.

## Используемые технологии и инструменты

### Клиентская часть

-   React JS
-   TypeScript
-   Redux Toolkit
-   Socket.io-client
-   Formik
-   SASS + CSS Modules

### Серверная часть

-   Node JS
-   Express
-   Socket.io
-   JsonWebToken
-   Firebase/Firstore database
## Demo:
## Страница новостей
![social1](https://github.com/KDarenskii/react-social-app/assets/111995279/f2480437-7675-49f5-bd3e-4a52d1dfdaf0)

## Страница профиля
![social2](https://github.com/KDarenskii/react-social-app/assets/111995279/95201502-f95e-4692-a5a6-7f88a1953a02)

## Страница друзей
![social3](https://github.com/KDarenskii/react-social-app/assets/111995279/b02c01a1-1afc-4233-af4a-909c5d447824)

![social4](https://github.com/KDarenskii/react-social-app/assets/111995279/fc417536-e937-44c0-bb50-0db5e3a6978a)

## Страница сообщений
![social5](https://github.com/KDarenskii/react-social-app/assets/111995279/04b6cd60-2134-44c0-83d5-56ff23808f0e)
