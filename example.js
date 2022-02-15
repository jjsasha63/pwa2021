const db = require("./db")

const example = module.exports = {

    persons: [{
        "_id": db.ObjectId("618be4ba6b0df02e94319c15"),
        "firstName": "Johnny",
        "lastName": "Walker",
        "year": 1969,
        "group_id": db.ObjectId("61bf984cawbcftedt55e493c")
    }, {
        "_id": db.ObjectId("618beab56b0df02e94319c18"),
        "firstName": "Jim",
        "lastName": "Beam",
        "year": 1684,
        "group_id": db.ObjectId("61bf984cawbcftedt55e493c")
    }, {
        "_id": db.ObjectId("618bed4bdad4eb43c178c7b4"),
        "firstName": "Jack",
        "lastName": "Daniels",
        "year": 1886,
        "group_id": db.ObjectId("61bf984faaacfgedd45e421l")
    }],

    users: [{
        "_id": db.ObjectId("61af980faabcf8eda55e491c"),
        "login": "admin",
        "password": "admin1",
        "role": "admin"
      },{
        "_id": db.ObjectId("61af9854aabcf8eda55e491e"),
        "login": "user",
        "password": "user1",
        "role": "user"
    }],

    groups: [{
        "_id": db.ObjectId("61bf984cawbcftedt55e493c"), 
        "name": "First"
    }, {
        "_id": db.ObjectId("61bf984faaacfgedd45e421l"), 
        "name": "Second"
    }],

    chats: [{
        "_id": db.ObjectId("61bf98ffaabcj3eda55e491c"),
        "group_id": db.ObjectId("61bf984faaacfgedd45e421l"),
        "sender_id": db.ObjectId("618beab56b0df02e94319c18"),
        "when": "11/02/2022 18:21:11",
        "content": "Hello world"
    }],
 
    initialize: function() {
        db.persons.count(function(err, n) {
            if(n == 0) {
                console.log('No persons, example data will be used')
                example.persons.forEach(function(person) {
                    db.persons.insertOne(person, function(err, result) {})    
                    console.log('db.persons.insertOne(' + JSON.stringify(person) + ')')
                })
            }
        })
        db.users.count(function(err, n) {
            if(n == 0) {
                console.log('No users, example data will be used')
                example.users.forEach(function(user) {
                    db.users.insertOne(user, function(err, result) {})    
                    console.log('db.users.insertOne(' + JSON.stringify(user) + ')')
                })
            }
        })
        
        db.groups.count(function(err,n){
            if(n == 0){
                console.log('No groups, example data will be used')
                example.groups.forEach(function(group){
                    db.groups.insertOne(group, function(err,res){})
                    console.log('db.groups.insertOne(' + JSON.stringify(group) + ')')
                })
            }
        })

        db.chats.count(function(err,n){
            if(n == 0){
                console.log('No chats, example data will be used')
                example.chats.forEach(function(chat){
                    db.chats.insertOne(chat, function(err,res){})
                    console.log('db.chats.insertOne(' + JSON.stringify(chat) + ')')
                })
            }
        })
    }
    
}