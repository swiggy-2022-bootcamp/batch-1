const config = require('config');
const app = require('./app');

async function bootstrap() {
  app.listen(config.APP_PORT, () => {
    console.log(`Server running on PORT: ${config.APP_PORT}`);
  });
}

bootstrap();
