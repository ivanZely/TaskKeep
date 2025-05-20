# ✅ TaskKeep – Plataforma de Gestión de Tareas Diarias

![GitHub repo size](https://img.shields.io/github/repo-size/tuusuario/taskkeep)
![GitHub last commit](https://img.shields.io/github/last-commit/tuusuario/taskkeep)
![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)
![License](https://img.shields.io/github/license/tuusuario/taskkeep)

**TaskKeep** es una aplicación SaaS moderna y segura para la gestión diaria de tareas. Permite a los usuarios crear, visualizar, completar y eliminar tareas de forma eficiente, desde una interfaz web intuitiva.

---

## 🧩 Características

- ✏️ Gestión de tareas (CRUD completo)
- 👤 Autenticación segura con JWT
- 📦 Despliegue mediante contenedores Docker
- 🔒 Seguridad integrada: rate limiting, validación de entrada, HTTPS
- 🛠️ Código modular y mantenible (Flask + React)
- ☁️ Listo para producción y escalado

---

## 🚀 Demo
![image](https://github.com/user-attachments/assets/c0d4e6b9-ada9-4dcf-8355-263f926ba33c)


![image](https://github.com/user-attachments/assets/653a9780-dfae-4e96-a470-be5047d84296)



---

## 📁 Estructura del Proyecto

TaskKeep/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── wait_for_db.sh
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── postgres/
│   ├── Dockerfile
│   ├── init.sql
│   └── pg_hba.conf
│
├── certs/
│   ├── fullchain.pem
│   └── privkey.pem
│
├── backup_script.sh
├── docker-compose.yml
├── .env
├── .gitignore
├── README.md
└── LICENSE
