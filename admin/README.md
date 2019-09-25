https://material-ui.com/components/material-icons/

1. docker build -f Dockerfile -t snapshot-coin-admin:1.0 .

2. docker run --name=snapshot-coin-admin --rm -p 80:3000 snapshot-coin-admin:1.0

3. docker push kalog/snapshot-coin-admin:1.0
