# coin98 
The opensource using react-admin. Login with admin/123456 at link: http://138.197.63.39:3000/
### How to start the development
- Make sure docker-compose.yml match with you enviroment development.
- Use docker-compose up -d to setup enviroment. To update application remmember to yarn build before docker-compose up -d --build.
### Modify frontend
- After run docker-compose up -d, you can go to admin folder and run yarn start to start the development.
### Modify backend
- Run docker-compose up -d --build to modify backend.
- Debug using vs-code.
### How to deploy to digitalocean
- Config docker-machine on digitalocean follow this link: https://docs.docker.com/machine/examples/ocean/
- Deploy application by command: docker-compose up -d
- Server api: http://<docker-machine-ip>:8080/
- Front-end: http://<docker-machine-ip>:3000/
- Postgresql database: postgresql://postgres:postgres@<docker-machine-ip>:5432/mydb

