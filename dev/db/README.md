1. Build docker image from this location:  
   `docker build -t akaeigenspace/postgres-hackathon .`
2. Push docker image into the repository:  
   `docker push akaeigenspace/postgres-hackathon`
   
# Run container locally

If you want to run container on your machine, do it with this command:  
`docker run -d --name hackathon -e POSTGRES_PASSWORD=000000 -p 5432:5432 akaeigenspace/postgres-hackathon`

# Run postgres container locally for testing

You can run it by this command replacing path to dump folder:
`docker run -d --name postgres -e POSTGRES_PASSWORD=000000 -v C:\Users\NikitaSergeev\Desktop\gitlab\data-synchronizer\dev\db\dump:/docker-entrypoint-initdb.d/ -p 5432:5432 postgres`
