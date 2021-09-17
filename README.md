# Mongo Commands

## To show all the databases on the server
```
show databases
```

## To set the active database

```
use name_ofdb
```
Example:
```
use sample_airbnb
```
To show all collections:
```
show collections
```
Show the current active database
```
db
```
## Queries

To find/retrieve all the documents of a collection:
```
db.<name of collection>.find()
```
For example, to get all the listings and reviews from the 
`listingsAndReviews` collection, we type in:

```
db.listingsAndReviews.find()
```
To beautify (i.e format) to the output, we put a .pretty()

```
db.listingsAndReviews.find().pretty()
```

## Projection
Display only certain keys from the document

```
db.listingsAndReviews.find({}, {
    "name":1,
    "address":1
}).pretty()
```

How to project by a field inside a nested object
```
db.listingsAndReviews.find({},{
    'name':1,
    'address.country':1,
    'beds':1
}).pretty()
```
## Limit
Show only the first five results:

```
db.listingsAndReviews.find({},{
    "name":1,
    "address.country":1,
    "beds":1
}).pretty().limit(5)
```

## Filtering

Specify critera in the first argument of `find`

Find all documents where a specific key has a specific value.

Example: find all the listings that has exactly 2 beds
```
db.listingsAndReviews.find({
    "beds":2
},{
    'name':1,
    'beds':1
}).pretty()
```
Searching by multiple criteria -- find all the listings that has 2 beds and 2 bedrooms

```
db.listingsAndReviews.find({
    'beds':2,
    'bedrooms':2
}, {
    'name':1,
    'beds':1,
    'bedrooms':1
})
```

Query by a key in embededd document

```
db.listingsAndReviews.find({
    "beds":2,
    "bedrooms":2,
    "address.country":"Brazil"
},{
    "name":1,
    "beds":1,
    "bedrooms":2,
    "address.country":1
}).pretty()
```

## Finding by inequality

We have to use the special operators `$gt` for greater than

```
db.listingsAndReviews.find({
    'beds': {
        '$gte': 3
    }
},{
    'name':1,
    'beds':1
})
```
* `$lt` - lesser than
* `$lte` - lesser than or equal
* `$gt` - greater than
* `$gte` - greater than equal
* `$ne` - not equal

Find all the listings that have between 3 to 6 beds:
```
db.listingsAndReviews.find({
    'beds':{
        '$gte':3,
        '$lte':6
    }
},{
    'name':1,
    'beds':1
})
```

Find all listings that have between 3 to 6 beds and are in Brazil:

```
db.listingsAndReviews.find({
    'beds':{
        '$gte':3,
        '$lte':6
    },
    'address.country':'Brazil'
},{
    'beds':1,
    'bedrooms':1,
    'address.country':1
}).pretty()
```

## Filtering by a key that is an array

If we are only interested if an array contains a certain value:

```
db.listingsAndReviews.find({
    'amenities':'Oven'
},{
    'name':1,
    'amenities':1
}).pretty()
```

We use `$in` if we want match just one of multiple values in an array:

```
db.listingsAndReviews.find({
    'amenities':{
        '$in':['Oven', 'Microwave', 'Stove']
    }
},{
    'name':1,
    'amenities':1
}).pretty()
```

Find all the listings that have *all* of the following: Oven, Stove, Microwave, Dishes and silverware:

```
db.listingsAndReviews.find({
    'amenities':{
        '$all':['Oven', 'Stove', 'Microwave', 'Dishes and silverware']
    }
},{
    'amenities':1
}).pretty()
```

## Select by ObjectID

**The examples below uses the `sample_mflix` database**

```
use sample_mflix;
```

To find a document by its ObjectId:
```
db.movies.find({
    '_id':ObjectId("573a1390f29313caabcd5b9a")
}).pretty()
```

## Search by regular expressions
We are using back the `sample_airbnb` database for the examples below.

* Find all the listings that the word `spacious` in the name. To do so, we use the `$regex` operator
```
db.listingsAndReviews.find({
    'name': {
        '$regex':'spacious',
        '$options':'i'
    }
},{
    'name':1
})
```
* Find all the listings where the name includes the phrae 'apartment for x', where x is a number between 1 to 9.

```
db.listingsAndReviews.find({
    "name":{
        '$regex':"apartment for \[1-9]",
        '$options':'i'
    }
},{
    'name':1
})
```

## Logical operators
We want to find listings that are either in Brazil or Canada.

```
db.listingsAndReviews.find({
    "$or":[
        {
            'address.country':"Brazil"
        },
        {
            'address.country':"Canada"
        }
    ]
}, {
    'name':1,
    'address.country':1
})
```
Find all the listings that are from Brazil and has at least 2 bedrooms or listings that are from Canada.

```
db.listingsAndReviews.find({
    "$or":[
        {
            "address.country":"Brazil",
            "bedrooms":{
                "$gte":3
            }
        },
        {
            "address.country":"Canada",
        }
    ]
},{
    'name':1,
    'address.country':1,
    'bedrooms':1
})
```

Use `$not` to do the inverse. Example: Show all the listings that are not from Brazil.

```
db.reviewAndListings.find({
   'address.country':{
       '$not':{
           '$in':['Brazil', 'Canada']
       }
   }
},{
    'name':1,
    'address.country':1
})
```

## Find by dates

Dates in Mongo are stored using `ISODate` objects.  The parameter used to create a `ISODate` object is the date in the `YYYY-MM-DD` format.
```
db.listingsAndReviews.find({
    'first_review':{
        '$gte':ISODate('2018-01-01')
    }
},{
    'name':1,
    'first_review':1
})
```

# Creating your own database

1. Attempt to `use` the new database as if a database with that name already exists

```
use tgc14_animal_shelter
```

2. The new database is not permanet
until we add a document to it.

3. To add a document to a new collection - just assume the collection exists and try to adding to it

```
db.animals.insert({
    "name":"Fluffy",
    "age":3,
    "breed":"Golden Retriever",
    "type":"Dog"
})
```

4. Insert many at one go:

```
db.animals.insertMany([
    {
        "name":"Dazzy",
        "age":3,
        "breed":"Greyhound",
        "type":"Dog"
    },
    {
        "name":"Timmy",
        "age":1,
        "breed":"Border Collie",
        "type":"Dog"
    }
]);
```

5. How to enter with date:
```
db.animals.insert({
    "name":"Teacup",
    "breed":"Persian Cat",
    "age":9,
    "type":"Cat",
    "date_enrolled":ISODate()
})
```

6. To give a document a fixed date:
```
db.animals.insert({
    "name":"Miranda",
    "breed":"Long-tailed Monkey",
    "age":3,
    "type":"Monkey",
    "date_enrolled":ISODate("2021-02-28")
});
```
# Inserting many records
1. `use` the database that we want to create
```
use fake_school
```
2. Insert the records using `insertMany`

```
db.students.insertMany([
    {
        "name":"Jane Doe",
        "age":13,
        "subjects":["Defense against the Dark Arts", "Charms", "History of Magic"],
        "date_enrolled": ISODate("2016-05-13")
    },
    {
        "name":"James Verses",
        "age":14,
        "subjects":["Transfiguration", "Alchemy"],
        "date_enrolled": ISODate("2015-06-15")
    },
    {
        "name":"Jonathan Goh",
        "age":12,
        "subjects":["Divination", "Study of Ancient Runes"],
        "date_enrolled":ISODate("2017-04-16")
    }
])
```
## Updating existing document

1. Select the document(s)

2. Specify the changes

### Find a document by its _id and update it

The `update` function has two parametes:
* first argument: the selection criteria
* second argument: what to update

Technique 1: Update a specific field (only or more fields only)
```
db.animals.update({
    "_id":ObjectId("61443eee5786cff39cf56450")
},{
    "$set":{
        "age":1.5
    }
})
```

Set "Timmy" as adopted:
```
db.animals.update({
    "_id":ObjectId("61443eee5786cff39cf56450")
},{
    "$set":{
        "status":"adopted"
    }
})
```

Technique 2: update by providing a new document
```
db.animals.update({
    "_id":ObjectId("61443eee5786cff39cf56450")
},{
    "name":"Timmy",
    "age": 1.5,
    "breed":"German Shepherd",
    "type":"Dog"
})
```



## Delete
```
db.animals.delete({
    '_id':ObjectId('61443f5f5786cff39cf56451')
})
```
Delete `Teacup` from the system:

## Embedded collections/documents

```
db.animals.insert({
    "name":"Frenzy",
    "age":1,
    "breed":"Wild Cat",
    "type":"Cat",
    "checkups":[
        {
            "id":ObjectId(),
            "name":"Dr. Chua",
            "diagnosis":"Heartworms",
            "treatment":"Steriods"
        }
    ]
})

db.animals.insert({
    "name":"Cookie",
    "age":3,
    "breed":"Lab Retriever",
    "type":"Dog"
})
```

## Add a new object (i.e, a sub-document) to an array within a document

Add a new checkup to Cookie the dog:
```
db.animals.update({
    "_id":ObjectId("61444e765786cff39cf56458")
},{
    "$push":{
        "checkups":{
            "id":ObjectId(),
            "name":"Dr. Tan",
            "diagnosis":"Diabetes",
            "treatment":"Medication"
        }
    }
})
```

Add a new checkup to Frenzy the cat:
```
db.animals.update({
    "_id":ObjectId("61444dfd5786cff39cf56457")
},{
    "$push":{
        "checkups":{
            "id":ObjectId(),
            "name":"Dr Tan",
            "diagnosis":"Stomach upset",
            "treatment":"Dewormer"
        }
    }
})
```

## Remove an element from an array
We use `$pull`

```
db.animals.update({
    "_id":ObjectId("61444dfd5786cff39cf56457")
}, {
    '$pull':{
        'checkups':{
            'id':ObjectId("61444f7f5786cff39cf5645a")
        }
    }
})
```

## Update an existing sub-document in an array
Change the vet's name from 'Dr Tan' to 'Dr Su':

```
db.animals.update({
    'checkups.id':ObjectId("61444ee15786cff39cf56459")
},{
    '$set':{
        'checkups.$.name':'Dr Su'
    }
})
```