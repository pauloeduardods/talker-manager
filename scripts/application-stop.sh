
#!/bin/bash

echo "Stopping application..."

docker container stop "$(docker ps --filter name=talker-manager_back-end_* -aq)"
docker container prune -f
docker image prune -af