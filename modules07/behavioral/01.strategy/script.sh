# postgres

docker run \
  --name jsExpert \
  -e POSTGRES_USER=andreazoDev \
  -e POSTGRES_PASSWORD="123321abc" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker logs postgres
docker exec -it jsExpert psql --username andreazoDev --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);

SELECT * FROM warriors;

# mongodb
docker run \
--name mongodb \
-e MONGO_INITDBROOT_USERNAME=andreazoDev \
-e MONGO_INITDBROOT_PASSWORD=123321a \
-p 27017:27017 \
-d \
mongo:4