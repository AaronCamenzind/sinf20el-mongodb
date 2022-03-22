db.createCollection("Type", {
    validator: {
        bsonType: "object",
        required: [ "TypeId", "Name" ],
        properties: {
            Name: {
                bsonType: "string",
                description: "Dateityp der Daten"
            },

            // Primary Key TypeID
            TypeId: {
                bsonType: "int",
                unique: "true",
                index: "true",
                description: "Primary Key"
            }
        }
    }
})
db.createCollection("Systemuser", {
    validator: {
        bsonType: "object",
        required: [ "userid", "Name" ],
        properties: {
            Name: {
                bsonType: "string",
                maxlenght: 50,
                description: "Name Systemuser"
            },

            userid: {
                bsonType: "int",
                unique: "true",
                index: "true",
                description: "Primary Key"
            }
        }
    }
})
