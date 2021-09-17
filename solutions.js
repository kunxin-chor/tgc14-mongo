let db;

// q2.5
db.inspections.find({
    'address.city':"RIDGEWOOD",
    'result':{
        '$ne':'Violation Issued'
    }
}).count()

// Solutons for slide 7
// 1.
db.students.updateMany({},{
    '$inc':{
        'age':1
    }
})

// 2.
db.students.update({
    "_id":ObjectId("6144486e5786cff39cf56454")
},{
    "$set":{
        'date_enrolled':ISODate("2018-05-14")
    }
})

// 4.
db.students.update({
    'name':'Jane Doe'
},{
    '$set':{
        'name':'Jane Doe Jr',
        'age': 11
    }
})

//  slide 9
// 1.
db.animals.update({
    "_id":ObjectId("ID of carrot")
},{
    "$set":{
        'age': 2.5
    }
})

// 2
db.animals.update({
    '_id':ObjectId("ID of Dash")
},{
    "name":"Dash",
    "age":4.5,
    "breed":"Winter White",
    "species":"Hamster"
})

// 3
db.animals.remove({
    '_id':ObjectId("ID of Jorden")
})

db.animals.removeMany({})