from flask import Flask, render_template, jsonify # type: ignore
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
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Mission;")  # Ensure table name is correct
        missions = cursor.fetchall()
        conn.close()

        if not missions:
            return jsonify({"error": "No missions found"}), 404

        return jsonify([{
            "Mission_ID": row[0],  # Ensure indexes match database columns
            "Mission_Name": row[1],
            "Year": row[2],
            "Destination": row[3],
            "Outcome": row[4],
            "Mission_Img": row[5]
        } for row in missions])

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return exact error for debugging


@app.route('/api/astronauts')
def astronauts():
    conn = get_db_connection()
    astronauts = conn.execute('SELECT * FROM Astronaut').fetchall()
    conn.close()
    return jsonify([{
        "Astronaut_ID": row["Astronaut_ID"],
        "Name": row["Name"],
        "Role": row["Role"],
        "Astronaut_Img": row["Astronaut_Img"] or "static/placeholder.jpg"
    } for row in astronauts])

@app.route('/api/spacecraft')
def spacecraft():
    conn = get_db_connection()
    spacecraft = conn.execute('SELECT * FROM Spacecraft').fetchall()
    conn.close()
    return jsonify([{
        "Spacecraft_ID": row["Spacecraft_ID"],
        "Spacecraft_Name": row["Spacecraft_Name"],
        "Launch_Vehicle": row["Launch_Vehicle"],
        "Spacecraft_Img": row["https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2025/03/ariane_6_va263_liftoff/26605833-2-eng-GB/Ariane_6_VA263_liftoff_pillars.jpg"] or "static/placeholder.jpg"
    } for row in spacecraft])

if __name__ == '__main__':
    app.run(debug=True)
