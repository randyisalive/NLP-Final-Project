from database import db_connection


def getModel():
    db = db_connection()
    cur = db.cursor()
    try:
        sql = "SELECT * FROM model_data"
        cur.execute(sql)
        model_data = cur.fetchall()
        model_list = [
            {
                "id": i[0],
                "title": i[1],
                "sub": i[2],
                "info_status": False if i[3] == 0 else True,
                "information": i[4],
            }
            for i in model_data
        ]
        return model_list
    except Exception as e:
        print(e)
