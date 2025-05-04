import sqlite3
import os
from flask import current_app


DATABASE = "./database.db"


def db_connection():
    db = sqlite3.connect(DATABASE)
    if not db:
        return print("DB Not Exist in env path")
    else:
        return db
