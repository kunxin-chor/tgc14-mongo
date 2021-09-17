let db;

/* the find function takes argument4
the first arg - search critera
the second arg- projection critera
*/
db.listingsAndReviews.find({
    "beds": 2,
    "bedrooms": 2
},{
    "name":1,
    "beds":1,
    "bedrooms":1,
    "address.country": 1
}).pretty()