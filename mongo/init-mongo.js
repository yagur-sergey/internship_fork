db.createUser(
    {
        user  : "root",
        pwd   : "root",
        roles : [
            {
                role : "readWrite",
                db   : "realties"
            }
        ]
    }
)

db.realty.insert(
    {
        "price" : 25000.0,
        "square" : 137.5,
        "dateOfCreation" : ISODate("2020-01-15T21:00:00.000Z"),
        "type" : "HOUSE",
        "description" : "This is house with price 25000 $ and square 137.5. Build at 10/16/2001",
        "isDeleted" : false,
        "ownerEmail" : "yagursergeymail@gmail.com",
        "dateOfBuilding" : ISODate("2001-10-15T21:00:00.000Z"),
        "city" : "Minsk",
        "street" : "Veselaya",
        "house" : "37",
        "_class" : "com.syagur.resourceserver.realty.Realty"
    }
)
