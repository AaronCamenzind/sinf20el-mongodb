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
