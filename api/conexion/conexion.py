
import os

import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


def obtener_conexion():
    if not DATABASE_URL:
        raise RuntimeError("No se encontró DATABASE_URL")

    with psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row
    ) as conexion:
        yield conexion

