from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('dgt_term_1_internal.db')
    conn.row_factory = sqlite3.Row  # Allows access via column names
    return conn

@app.route('/')
def home():
    return render_template('index.html')  # Make sure index.html exists in 'templates' folder

@app.route('/api/missions')
def missions():
    conn = get_db_connection()
    missions = conn.execute('SELECT * FROM Mission').fetchall()
    conn.close()
    return jsonify([dict(row) for row in missions])

@app.route('/api/astronauts')
def astronauts():
    conn = get_db_connection()
    astronauts = conn.execute('SELECT * FROM Astronaut').fetchall()
    conn.close()
    return jsonify([dict(row) for row in astronauts])

@app.route('/api/spacecraft')
def spacecraft():
    conn = get_db_connection()
    spacecraft = conn.execute('SELECT * FROM Spacecraft').fetchall()
    conn.close()
    return jsonify([dict(row) for row in spacecraft])

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/api/missions')
def missions():
    conn = get_db_connection()
    missions = conn.execute('SELECT * FROM Mission').fetchall()
    conn.close()
    return jsonify([{
        "Mission_ID": row["Mission_ID"],
        "Mission_Name": row["Mission_Name"],
        "Year": row["Year"],
        "Destination": row["Destination"],
        "Outcome": row["Outcome"],
        "Mission_Img": row["Mission_Img"]  # Include image
    } for row in missions])
