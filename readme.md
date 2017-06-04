###### Локальная разработка
Переменные окружения:
| Переменные | Значения |
| ------ | ------ |
| `NODE_ENV` | [test \| development \| production] |
| `MONGODB_URI` | ConnectionString для mongo. Если не указана - выбирается исходя из `NODE_ENV ` в `/server/db/config` |
| `REFILL_DB` | Значение `refill` - перезапишет бд тестовыми данными из `/server/populationScript.js` |
| `PORT` | Порт для запуска. По умолчанию `4000` |
С использованием Docker compose (node + mongo):
```sh
$ docker-compose -f docker-compose-dev.yml up
```
Без использования Docker compose:
```sh
$ mongod
$ REFILL_DB=refill npm run watch
```
Запуск тестов:
```sh
$ npm run test
```

###### Deploy
С использованием Docker compose
```sh
$ docker-compose build
$ docker-compose -f docker-compose-production.yml build
```

### API
##### Events
 `GET /events`
```
[
  {
    "_id": "5933bb926d9e9f348be90ffc",
    "updatedAt": "2017-06-04T07:49:38.965Z",
    "createdAt": "2017-06-04T07:49:38.965Z",
    "name": "Event1",
    "organizer": "Org1",
    "description": "Description1",
    "what": "Free park",
    "when": "Now",
    "where": {
      "type": "Point",
      "coordinates": [
        56.826621,
        60.619419
      ]
    },
    "__v": 0
  },
  ...
```
`GET /events/:id`
```
{
  "_id": "5933bb926d9e9f348be90ffc",
  "updatedAt": "2017-06-04T07:49:38.965Z",
  "createdAt": "2017-06-04T07:49:38.965Z",
  "name": "Event1",
  "organizer": "Org1",
  "description": "Description1",
  "what": "Free park",
  "when": "Now",
  "where": {
    "type": "Point",
    "coordinates": [
      56.826621,
      60.619419
    ]
  },
  "__v": 0
}
```
`POST /events`
Поля в запросе
- (`name`) (Строка max 32 символа)
- (`organizer`) (Строка max 32 символа)
- [`logo`] (Строка для хранения base64 картинки)
- [`icons`] (Строка - выбор из ['outdoor', 'indoor'])
- (`description`) (Строка max 128)
- (`what`) (Строка max 32 символа)
- (`when`) (Строка max 32 символа)
- [`where`] (Массив из 2-ух элементов - [lat, lng])

##### AdvCampaign
`GET /advcampaign`
```
[
  {
    "_id": "5933bb926d9e9f348be91003",
    "updatedAt": "2017-06-04T07:49:38.984Z",
    "createdAt": "2017-06-04T07:49:38.984Z",
    "title": "advCampaign3",
    "eventId": "5933bb926d9e9f348be90ffe",
    "audience": {
      "updatedAt": "2017-06-04T07:49:38.984Z",
      "createdAt": "2017-06-04T07:49:38.984Z",
      "radius": 3000,
      "gender": "male",
      "_id": "5933bb926d9e9f348be91004",
      "age": [
        19,
        25
      ]
    },
    "date": "2017-06-02T08:18:02.660Z",
    "loc": {
      "type": "Point",
      "coordinates": [
        56.832114,
        60.592511
      ]
    },
    "__v": 0
  },
  ...
```
`GET /advcampaign/:id`
```
{
  "_id": "5933bb926d9e9f348be90fff",
  "updatedAt": "2017-06-04T07:49:38.977Z",
  "createdAt": "2017-06-04T07:49:38.977Z",
  "title": "advCampaign1",
  "eventId": "5933bb926d9e9f348be90ffc",
  "audience": {
    "updatedAt": "2017-06-04T07:49:38.977Z",
    "createdAt": "2017-06-04T07:49:38.977Z",
    "radius": 1000,
    "_id": "5933bb926d9e9f348be91000",
    "age": []
  },
  "date": "2017-06-02T08:18:02.660Z",
  "loc": {
    "type": "Point",
    "coordinates": [
      56.826621,
      60.619419
    ]
  },
  "__v": 0
}
```
`POST /advcampaign`
 - (`title`) (Строка)
 - (`eventId`) (Валидный id любого события)
 - (`audience.radius`) (Радиус рекламной кампании в метрах)
 - [`audience.gender`] (Строка - выбор из ['male', 'female'])
 - [`audience.age`] (Массив - диапазон возрастов [25, 30])
 - (`date`) (Дата проведения формата "2017-06-04T07:49:38.984Z")
 - [`loc`] (Массив из 2-ух элементов - [lat, lng])
 
##### User
`GET /users`
```
[
  {
    "_id": "5933bb926d9e9f348be90ff9",
    "updatedAt": "2017-06-04T07:49:38.955Z",
    "createdAt": "2017-06-04T07:49:38.955Z",
    "name": "User1",
    "gender": "male",
    "age": 20,
    "loc": {
      "type": "Point",
      "coordinates": [
        56.836466,
        60.595922
      ]
    },
    "__v": 0
  },
  ...
]
```
`GET /users/:id`
```
{
  "_id": "5933bb926d9e9f348be90ff9",
  "updatedAt": "2017-06-04T07:49:38.955Z",
  "createdAt": "2017-06-04T07:49:38.955Z",
  "name": "User1",
  "gender": "male",
  "age": 20,
  "loc": {
    "type": "Point",
    "coordinates": [
      56.836466,
      60.595922
    ]
  },
  "__v": 0
}
```
`POST /users`
 - (`name`) (Строка)
 - (`gender`) (Строка из списка ['male', 'female'])
 - (`age`) (Число)
 - (`loc`) (Массив из 2-ух элементов - [lat, lng])
 
`GET users/advcampaign/:id`
Выборка рекламных кампаний, подходящих для пользователя (по параметру audience)
Пример для пользователя
```
{
  "_id": "5933bb926d9e9f348be90ffa",
  "updatedAt": "2017-06-04T07:49:38.958Z",
  "createdAt": "2017-06-04T07:49:38.958Z",
  "name": "User2",
  "gender": "male",
  "age": 30,
  "loc": {
    "type": "Point",
    "coordinates": [
      56.838783,
      60.616779
    ]
  },
  "__v": 0
}
```
Выбрали одну рекламную кампанию поблизости
```
[
  {
    "_id": "5933bb926d9e9f348be90fff",
    "updatedAt": "2017-06-04T07:49:38.977Z",
    "createdAt": "2017-06-04T07:49:38.977Z",
    "title": "advCampaign1",
    "eventId": "5933bb926d9e9f348be90ffc",
    "audience": {
      "updatedAt": "2017-06-04T07:49:38.977Z",
      "createdAt": "2017-06-04T07:49:38.977Z",
      "radius": 1000,
      "_id": "5933bb926d9e9f348be91000",
      "age": []
    },
    "date": "2017-06-02T08:18:02.660Z",
    "loc": {
      "coordinates": [
        56.826621,
        60.619419
      ],
      "type": "Point"
    },
    "inCircle": true
  }
]
```