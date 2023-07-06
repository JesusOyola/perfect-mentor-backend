import { Sequelize } from "sequelize";

class MySqlConnection{
     sequelize = new Sequelize('thePerfectMentor', 'root', 'jesus36341423', {
        host: 'localhost',
        dialect: 'mysql',
      });

      async conectionDb(){
        try {
            await this.sequelize.authenticate();
            console.log('CONEXION CON LA BASE DE DATOS EXITOSA!');
          } catch (error) {
            console.error('ERROR AL CONECTARSE CON LA BASE DE DATOS', error);
          }
      }
}

export default MySqlConnection;