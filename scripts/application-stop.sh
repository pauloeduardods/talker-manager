
#!/bin/bash

echo "Stopping application..."

docker container stop "$(docker ps --filter name=talker-manager-api-back-end-* -aq)"
docker container prune -f
docker image prune -af