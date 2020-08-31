mongoimport \
  -u root -p pass \
  --db bookshelf --collection books \
  --drop \
  --file /docker-entrypoint-initdb.d/books.json --jsonArray
