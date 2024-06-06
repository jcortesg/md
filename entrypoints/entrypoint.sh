#!/bin/bash

# Wait for MongoDB to be ready

mongosh <<EOF
use admin
db.createUser({ user: "mongoUser", pwd: "mongoPass", roles: [{ role: "clusterMonitor", db: "dbApp" }] })
exit
EOF

# Connect to MongoDB and create the user and database
mongosh --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin <<EOF
use dbApp
db.createUser({ user: "mongoUser", pwd: "mongoPass", roles: [{ role: "readWrite", db: "dbApp" }] })
EOF

