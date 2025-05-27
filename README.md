## TODO

-   запустить rabbitMQ с помощью docker compose
-   на nest js написать 2 сервиса которые будут использовать golevelup/nestjs-rabbitmq
    дока <a href="https://golevelup.github.io/nestjs/modules/rabbitmq.html" target="_blank">https://golevelup.github.io/nestjs/modules/rabbitmq.html</a>
-   1 сервис должен посылать сообщения в rabbitmq при вызове эндпоинта (например POST /message)
-   2 сервис получать эти сообщения из rabbitmq и просто логать

-retry x3
-difference between send to queue и publish to exchange
publish a message onto a RabbitMQ exchange (Fire and Forget)
amqpConnection.publish('some-exchange', 'routing-key', { msg: 'hello world' });

#### https://www.rabbitmq.com/tutorials/tutorial-three-javascript#the-default-exchange

messages are routed to the queue with the name specified as first parameter, if it exists
channel.sendToQueue('hello', Buffer.from('Hello World!'));

The empty string as second parameter means that we don't want to send the message to any specific queue.
We want only to publish it to our 'logs' exchange.
channel.publish('logs', '', Buffer.from('Hello World!'));
