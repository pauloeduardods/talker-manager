#!/bin/bash

echo "Check if directory exists"

DIR="/home/ec2-user/talker-manager-api"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
  echo "Create a backup of the directory"
  echo "Check if backup directory exists"

  BAK_DIR="/home/ec2-user/backup"
  if [ -d "$BAK_DIR" ]; then
    echo "${BAK_DIR} exists"
  else
    echo "Creating ${BAK_DIR} directory"
    mkdir ${BAK_DIR}
  fi

  echo "Removing the last backup"

  cd ${BAK_DIR}
  rm -rf talker-manager-api*

  echo "Backuping ${DIR} to ${BAK_DIR}"

  BACKUP_FILE="${BAK_DIR}/talker-manager-api$(date +%Y-%m-%d-%Hh%Mm)"
  cp -rf ${DIR} ${BACKUP_FILE}

  echo "Backup created on: ${BACKUP_FILE}"

else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi