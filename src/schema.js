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
db.createCollection("usergroup", {
    validator: {
        bsonType: "object",
        required: [ "groupid" ],
        properties: {
            Name: {
                bsonType: "string",
                maxlenght: 50,
                description: "Group Name"
            },

            groupid: {
                bsonType: "int",
                unique: "true",
                index: "true",
                description: "Primary Key"
            }
        }
    }
})

db.createCollection("Tag", {
    validator: {
        bsonType: "object",
        required: [ "tagid" ],
        properties: {
            Name: {
                bsonType: "string",
                maxlenght: 50,
                description: "Tagname"
            },

            tagid: {
                bsonType: "int",
                unique: "true",
                index: "true",
                description: "Primary Key"
            }
        }
    }
})
db.createCollection("Data", {
    validator: {
        bsonType: "object",
        required: [ "digest" ],
        properties: {
            digest: {
                bsonType: "string",
                maxlenght: 30,
                unique: "true",
                index: "true",
                description: "Primary Key"
            },
              
             content: {
                bsonType: "string",
                description: "content"
            },
             
             size: {
                bsonType: "int",
                description: "groesse"
            },
             compression: {
                bsonType: "int",
                description: "Rate der Datenkompression"
            },

        }
    }
})

db.createCollection("Import", {
    validator: {
        bsonType: "object",
        properties: {
            digest: {
                bsonType: "string",
                maxlenght: 35,
                description: "Digest"
            },

            path: {
                bsonType: "string",
                description: "Path"
            },

             size: {
                bsonType: "int",
                description: "groesse"
            },

              Type: {
                bsonType: "string",
                description: "Datentyp"
            },

             mode: {
                bsonType: "int",
                description: "mode"
            },

             uid: {
                bsonType: "int",
                description: "UID"
            },

            user: {
                bsonType: "string",
                maxlenght: 50,
                description: "Username"
            },

            gid: {
                bsonType: "int",
                description: "GID"
            },

            group: {
                bsonType: "string",
                description: "Gruppe"
            },

            Time: {
                bsonType: "int",
                maxlenght: 12,
                description: "Zeit"
            },

            compression: {
                bsonType: "int",
                description: "compression"
            },

            Data: {
                bsonType: "string",
                description: "Data"
            },
        }
    }
})
