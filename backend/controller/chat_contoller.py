from database import db_connection
import datetime


def get_chat(user_id):
    db = db_connection()
    cur = db.cursor()
    try:
        sql = f"SELECT * FROM chat_data WHERE user_id = ? ORDER BY date"
        params = (user_id,)
        cur.execute(sql, params)
        chats = cur.fetchall()
        chat_data = [
            {
                "id": i[0],
                "text": i[1],
                "summary": i[2],
                "date": i[4],
            }
            for i in chats
        ]
        return chat_data
    except Exception as e:
        print(e)


def get_chat_by_id(id):
    db = db_connection()
    cur = db.cursor()
    try:
        sql = f"SELECT * FROM chat_data WHERE id = ? ORDER BY date"
        params = (id,)
        cur.execute(sql, params)
        chats = cur.fetchall()
        chat_data = [
            {
                "id": i[0],
                "text": i[1],
                "summary": i[2],
                "date": i[4],
            }
            for i in chats
        ]
        return chat_data[0]
    except Exception as e:
        print(e)


def add_chat(text, summary, user_id, model_id):
    db = db_connection()
    cur = db.cursor()
    dateNow = datetime.datetime.now()
    try:
        sql = f"INSERT INTO chat_data (text, summary, user_id, date,model_id) VALUES (?,?,?,?,?)"
        params = (text, summary, user_id, dateNow, model_id)
        cur.execute(sql, params)
        db.commit()
    except Exception as e:
        print(e)


def delete_chat(id):
    db = db_connection()
    cur = db.cursor()
    try:
        sql = f"DELETE FROM chat_data WHERE id = ?"
        params = (id,)
        cur.execute(sql, params)
        db.commit()
    except Exception as e:
        print(e)
