echo "Checking if application is running"

if [ "$( docker container inspect -f '{{.State.Status}}' talker-manager_back-end_1 )" == "running" ];
then
  echo "Container is running"
  docker container prune -f
  docker image prune -af
  exit 0
else 
  echo "Container is not running"
  echo "Restarting old version"
  cd $(ls | head -1)
  docker-compose up -d
  docker container prune -f
  docker image prune -af
  exit 1
fi