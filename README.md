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