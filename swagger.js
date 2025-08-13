const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Users Api'
  },
  host: 'localhost:3002',
  schemes: ['http']
};
const outputFile = './swagger.json';
const endpointsFiles= ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);