'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {

    static associate(models) {}

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = ({username, password}) => {
      const passwordTerenkripsi = this.#encrypt(password);
      return this.create({username, password: passwordTerenkripsi});
    };

    comparePassword = (password) => bcrypt.compareSync(password, this.password)

    static login = async ({username, password}) =>{
      try {
        const user = await this.findOne({where:{username}})
        if(!user) return Promise.reject("Username or Password Invalid!!!")
        
        const checkPassword = user.comparePassword(password)
        if(!checkPassword) return Promise.reject("Username or Password Invalid!!!")
        
        return Promise.resolve(user)

      } catch (error) {
        Promise.reject(error);
      }
    }

  }
  Player.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};