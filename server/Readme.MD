1. docker build -f Dockerfile -t snapshot-server:1.0 .

2. docker run --name=snapshot-server --rm -p 8080:8080 snapshot-server:1.0

3. docker login --username kalog --password #P@ssw0rd#

4. docker tag snapshot-server:1.0 kalog/snapshot-server

3. docker push kalog/snapshot-server
