const {generateToken} = require('../helper/jwt')
const {Player} = require('../models')
const {History} = require('../models')
const passport = require('../lib/passport')
const jwt = require('jsonwebtoken');

async function register(req, res){
    try {
        // console.log(req.body)
        let data = await Player.register(req.body);        
        res.status(201).json({message: "register sukses"})
    } catch (error) {
        console.log(error);
    }
}

async function viewUsers(req, res){
    console.log("masuk view")
    try {
        let data = await Player.findAll({attributes: ["id", "username"]})
        console.log(data)
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
}

async function login(req, res){
    // console.log("login mang");
    // try {
    //    let user = await Player.login(req.body);
    //    res.status(201).json({message: "login sukses"})
    // } catch (error) {
    //     console.log(error);
    // }
}

async function success(req, res){
    res.status(201).json({message: "login sukses"})
}

async function profile(req, res){
    // let data = `anda adalah ${req.user.dataValues.username}`
    // console.log(data)
    res.status(200).json({ 
        data:{
            id: req.user.dataValues.id,
            username: req.user.dataValues.username           
        }
    });
}

async function createRoom(req, res){
    console.log(req.body)
    let roomId = req.body;
    let token = generateToken(roomId)
    res.status(200) .json({
        data:{
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            accesToken: token
        }
    })
}
/*
-----------------untuk main game 

url: POST http://localhost:3000/api/v1/jwt/game/params => params berupa (gunting, batu atau kertas)

{
    "user": "user2", //=> user1 dan user2 diberbeda postman
    "token": "token yang digenerate di POST http://localhost:3000/api/v1/jwt/createRoom"
}

*/

let user2 = '';
let user1 = '';
let array = [];
let count = 0;
let sesi = 0;

dataSesiAkhir();
async function dataSesiAkhir(){
    let panjangData = await History.count();
    // console.log("panjangData", panjangData)
    sesi = panjangData + 1;
}

async function game(req, res){
    let data = {
        params: req.params,
        body: req.body
    }

    jwt.verify(data.body.token, 'bisaapaaja', (err, payload) => {
        if(err){
            res.status(400) .json("error")
        }else{

            if(data.body.user == 'user2'){
                user2 = data.params.params;
            }
            if(data.body.user == 'user1'){
                user1 = data.params.params;
            }

            if(user1 == null || user2 == null){
                console.log("salah satu player blm insert data")
            }


            let hasil = "";
            if(array.length < 3){  
                count++;          
                if(user1 === "batu"){
                    if(user2 === "batu"){
                        hasil = "draw"
                        array.push(hasil)
                    }else if(user2 === "gunting"){
                        hasil = "user1 menang"
                        array.push(hasil)
                    }else if(user2 === "kertas"){
                        hasil = "user2 menang" 
                        array.push(hasil)                       
                    }
                    
                }else if(user1 === "gunting"){
                    if(user2 === "batu"){
                        hasil = "user2 menang"
                        array.push(hasil)
                    }else if(user2 === "gunting"){
                        hasil = "draw"
                        array.push(hasil)
                    }else if(user2 === "kertas"){
                        hasil = "user1 menang"
                        array.push(hasil)
                    }  
                }else if (user1 === "kertas"){
                    if(user2 === "batu"){
                        hasil = "user1 menang"
                        array.push(hasil)
                    }else if(user2 === "gunting"){
                        hasil = "user2 menang"
                        array.push(hasil)
                    }else if(user2 === "kertas"){
                        hasil = "draw"
                        array.push(hasil)
                    }  
                }                
                
                console.log(hasil)
            }
            if(count == 4){
                console.log("data direcord setiap selesai 3 sesi permainan")
                sesi++;
                
                let dataSesi = "sesi" + sesi;
                ini();
                async function ini(){ 
                    await History.create(
                        {
                            sesi: dataSesi,
                            history: array.toString()
                        }
                    )
                }

                count = 0;
                array = [];
                user1 = "";
                user2 = "";
            }


            console.log('user1: ', user1)
            console.log('user2: ', user2)
            console.log('panjang array', array.length)
            console.log(array)
            res.status(200) .json(data)
        }

        
    })

    // res.status(200) .json(data)
    
}

async function history(req, res){
    try {
        let cek = req.user.dataValues.username;
        console.log(cek)
        let history = await History.findAll();
        console.log(history);
        res.status(200).json(history)
    } catch (error) {
        console.log("anda belum login")
    }

}

module.exports = {
     register, 
     login, 
     viewUsers,
     profile,
     createRoom,
     success,
     game,
     history
};