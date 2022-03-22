db.createCollection("Type", {
    validator: {
        bsonType: "object",
        required: [ "TypeId" ],
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
        required: [ "userid" ],
        properties: {
            Name: {
                bsonType: "string",
                maxlength: 50,
                description: "Name Systemuser"
            },

            UserID: {
                bsonType: "int",
                unique: "true",
                index: "true",
                description: "Primary Key"
            }
        }
    }
})

db.createCollection("Meta", {
    validator: {
        bsonType: "object",
        required: [],
        properties: {
            Path: {
                bsonType: "string",
                maxlength: 100,
                description: "Pfad"
            },
            
            Perm: {
                bsonType: "int",
                description: "Perm",
            },
            
            Time: {
                bsonType: "timestamp",
                description: "Aktuelle Zeit",
            },
            
            MetaId: {
                bsonType: "int",
                unique: "true",
                description: "Primary Key"
            }
        }
    }
})
