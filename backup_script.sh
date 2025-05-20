#!/bin/bash
# Script de backup cifrado de la base de datos

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups"
FILENAME="taskkeep_backup_$TIMESTAMP.sql"
ENCRYPTED_FILE="$FILENAME.gpg"

# Crear backup de la base de datos
pg_dump -U taskkeep -h db taskkeep > $FILENAME

# Cifrar el backup con GPG (clave pública preinstalada)
gpg --yes --batch --encrypt --recipient "backup@taskkeep.local" -o $ENCRYPTED_FILE $FILENAME

# Mover a directorio de backups y limpiar
mkdir -p $BACKUP_DIR
mv $ENCRYPTED_FILE $BACKUP_DIR/
rm $FILENAME

echo "Backup realizado y cifrado en $BACKUP_DIR/$ENCRYPTED_FILE"
