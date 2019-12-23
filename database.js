
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sam:sam@freecodecamp-b21le.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
var _db;

module.exports = {
    connectToServer: function( callback ) {
        MongoClient.connect( uri,   { useNewUrlParser: true, useUnifiedTopology: true  }, function( err, client ) {
            _db  = client.db('QuizGame');
            return callback( err );
        } );
    },

    getDb: function() {
        return _db;
    }
};