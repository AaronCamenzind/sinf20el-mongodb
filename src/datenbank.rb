require 'mongo'

# Datenbank logging
Mongo::Logger.logger.level = ::Logger::FATAL

# Neue Datenbank erstellen und Verbinden
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'M141Test')
