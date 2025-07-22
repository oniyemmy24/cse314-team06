const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Users Api'
  },
  host: 'localhost:3002',
  schemes: ['https', 'http']
};
const outputFile = './swagger.json';
const endpointsFiles= ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);