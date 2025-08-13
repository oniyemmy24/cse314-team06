const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Users Api'
  },
  host: 'cse341-team06.onrender.com',
  schemes: ['https','http']
};
const outputFile = './swagger.json';
const endpointsFiles= ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);