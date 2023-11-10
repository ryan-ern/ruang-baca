const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ruang Baca',
      version: '1.0.0',
      description: 'Dokumentasi untuk Ruang Baca',
    },
    paths:{
        "/login":{
            "post" : {
                "tags" : [
                    "users"
                ],
                "summary" : "login User"
            }
        }
    }
  },
  apis: ['swagger/document.js'],
  
};

const swaggerSpec = swaggerJSDoc(options);



module.exports = swaggerSpec;