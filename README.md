## TODO

-   запустить rabbitMQ с помощью docker compose
-   на nest js написать 2 сервиса которые будут использовать golevelup/nestjs-rabbitmq
    дока <a href="https://golevelup.github.io/nestjs/modules/rabbitmq.html" target="_blank">https://golevelup.github.io/nestjs/modules/rabbitmq.html</a>
-   1 сервис должен посылать сообщения в rabbitmq при вызове эндпоинта (например POST /message)
-   2 сервис получать эти сообщения из rabbitmq и просто логать
-   обмежити швидкість / кількість повідомлень в консюмері на ітеррацію (set prefetchCount)
-   додати валідацію (класс валидатор) на дто

-   додати монго в докер, https://gist.github.com/maitrungduc1410/f2f7b34d2e736912471b006c6dba17e5
-   додати монго + монгус в consumer, записувати дані отримані від паблішера в БД
    модель: автор, меседж, дата (автор тут же, не окремий документ)
-   GET по id и имени автора

-   unit tests for publisher
-   add swagger for publisher & consumer

-   retry x3 -use ack / nack - should use decorator for requeue https://github.com/golevelup/nestjs/issues/660 ????
-   для докера в дев режиме переробити через volume

## RUN

#### dev

docker-compose -f docker/docker-compose.dev.yml up -d --build

#### prod

docker-compose -f docker/docker-compose.prod.yml up -d --build

docker-compose -f docker/docker-compose.prod.yml logs -f nest-app #logs

## Questions

-difference between send to queue и publish to exchange
publish a message onto a RabbitMQ exchange (Fire and Forget)
amqpConnection.publish('some-exchange', 'routing-key', { msg: 'hello world' });

https://www.rabbitmq.com/tutorials/tutorial-three-javascript#the-default-exchange

messages are routed to the queue with the name specified as first parameter, if it exists
channel.sendToQueue('hello', Buffer.from('Hello World!'));

The empty string as second parameter means that we don't want to send the message to any specific queue.
We want only to publish it to our 'logs' exchange.
channel.publish('logs', '', Buffer.from('Hello World!'));

-   health-check почитать https://docs.nestjs.com/recipes/terminus
