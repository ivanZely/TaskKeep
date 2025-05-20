# backend/Dockerfile

FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app
# backend/Dockerfile

FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instala dependencias del sistema, incluyendo psql
RUN apt-get update && \
    apt-get install -y --no-install-recommends postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Instala dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia la aplicación
COPY . .

# Da permisos al script de espera
RUN chmod +x ./wait_for_db.sh

EXPOSE 8000

# Espera a que esté la base de datos y lanza Flask
CMD ["./wait_for_db.sh", "db", "python", "app.py"]
