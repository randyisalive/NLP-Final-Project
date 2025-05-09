from database import db_connection
import datetime


def add_rouge_data(r1, r2, rl, model_id, sample_size):
    db = db_connection()
    cur = db.cursor()
    dateNow = datetime.datetime.now()
    try:
        sql = "INSERT INTO rouge_score (rouge_1, rouge_2, rouge_L, model_id, date, sample_size) VALUES (?,?,?,?,?,?)"
        params = (r1, r2, rl, model_id, dateNow, sample_size)
        cur.execute(sql, params)
        db.commit()
    except Exception as e:
        print(e)


def get_rouge_data(model_id):
    db = db_connection()
    cur = db.cursor()
    try:
        sql = "SELECT * FROM rouge_score WHERE model_id = ? ORDER BY id DESC LIMIT 1"
        params = (model_id,)
        cur.execute(sql, params)
        rs_data = cur.fetchone()
        rs_data = {
            "id": rs_data[0],
            "rouge_1": rs_data[1],
            "rouge_2": rs_data[2],
            "rouge_L": rs_data[3],
            "model_id": rs_data[4],
        }
        return rs_data
    except Exception as e:
        print(e)
