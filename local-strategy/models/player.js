'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { password } = require('pg/lib/defaults');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    //encripsi password yang di input
    static #encript = (password) => bcrypt.hashSync(password, 10);

    //register
    static register = ({namaplayer, password}) =>{
      const encriptedPassword = this.#encript(password);
      return this.create({namaplayer, password: encriptedPassword});
    }
    //compare password
    comparePassword = (password) => bcrypt.compareSync(password, this.password);
    //login
    static authenticate = async ({namaplayer, password}) => {
      try {
        console.log(namaplayer)
        const user = await this.findOne({where:{namaplayer}});
        if(!user) return Promise.reject("User not found!");
        const isPasswordValid = user.comparePassword(password);
        if(!isPasswordValid) return Promise.reject("Password Invalid!");
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error)
      }
    }


  }
  Player.init({
    namaplayer: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};