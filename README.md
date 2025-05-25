## TODO

-   запустить rabbitMQ с помощью docker compose
-   на nest js написать 2 сервиса которые будут использовать golevelup/nestjs-rabbitmq
    дока <a href="https://golevelup.github.io/nestjs/modules/rabbitmq.html" target="_blank">https://golevelup.github.io/nestjs/modules/rabbitmq.html</a>
-   1 сервис должен посылать сообщения в rabbitmq при вызове эндпоинта (например POST /message)
-   2 сервис получать эти сообщения из rabbitmq и просто логать
