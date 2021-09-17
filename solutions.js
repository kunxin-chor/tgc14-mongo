let db;

db.inspections.find({
    'address.city':"RIDGEWOOD",
    'result':{
        '$ne':'Violation Issued'
    }
}).pretty();