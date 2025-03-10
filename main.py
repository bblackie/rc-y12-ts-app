from flask import Flask,g, render_template
import sqlite3

app = Flask(__name__)

DATABASE = 'dgt_term_1_internal.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(expection):
    db = getattr(g, '_database' , None)
    if db is not None:
        db.close()

app.route("/")
def home():
    return render_template("home.html")

@app.route("/Mission")
def mission():
    cursor = get_db().cursor()
    sql = "SELECT * FROM Mission"
    cursor.execute(sql)
    results = cursor.fetchall()
    return results

if __name__ == "__main__":
    app.run(debug=True)