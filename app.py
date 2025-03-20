from flask import Flask, render_template, jsonify, request, send_from_directory  # type: ignore
import sqlite3
import os

app = Flask(__name__, static_folder="static")

def get_db_connection():
    conn = sqlite3.connect('dgt_term_1_internal.db')
    conn.row_factory = sqlite3.Row  # Allows access via column names
    return conn

# 🏠 Homepage Route (Serves index.html)
@app.route('/')
def home():
    return render_template('index.html')

# 🚀 API: Get All Missions (Searchable)
@app.route('/api/missions')
def missions():
    try:
        search_query = request.args.get('search', '').strip().lower()
        conn = get_db_connection()
        cursor = conn.cursor()

        if search_query:
            cursor.execute("SELECT * FROM Mission WHERE LOWER(Mission_Name) LIKE ?", ('%' + search_query + '%',))
        else:
            cursor.execute("SELECT * FROM Mission;")

        missions = cursor.fetchall()
        conn.close()

        return jsonify([{
            "Mission_ID": row["Mission_ID"],  
            "Mission_Name": row["Mission_Name"],
            "Year": row["Year"],
            "Destination": row["Destination"],
            "Outcome": row["Outcome"],
            "Mission_Img": row["Mission_Img"] or "static/placeholder.jpg"
        } for row in missions])

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 👨‍🚀 API: Get All Astronauts
@app.route('/api/astronauts')
def astronauts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Astronaut")
    astronauts = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Astronaut_ID": row["Astronaut_ID"],
        "Name": row["Name"],
        "Role": row["Role"],
        "Astronaut_Img": row["Astronaut_Img"] or "static/placeholder.jpg"
    } for row in astronauts])

# 🛰 API: Get All Spacecraft
@app.route('/api/spacecraft')
def spacecraft():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Spacecraft")
    spacecraft = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Spacecraft_ID": row["Spacecraft_ID"],
        "Spacecraft_Name": row["Spacecraft_Name"],
        "Launch_Vehicle": row["Launch_Vehicle"],
        "Spacecraft_Img": row["Spacecraft_Img"] or "static/placeholder.jpg"
    } for row in spacecraft])

# 🌍 API: Get Specific Mission Details
@app.route('/mission/<int:id>')
def mission_details(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Mission WHERE Mission_ID = ?", (id,))
    mission = cursor.fetchone()
    conn.close()

    if mission:
        return render_template('mission.html', mission=mission)
    return "Mission not found", 404

# 👨‍🚀 API: Get Specific Astronaut Details
@app.route('/astronaut/<int:id>')
def astronaut_details(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Astronaut WHERE Astronaut_ID = ?", (id,))
    astronaut = cursor.fetchone()
    conn.close()

    if astronaut:
        return render_template('astronaut.html', astronaut=astronaut)
    return "Astronaut not found", 404

# 🚀 API: Get Specific Spacecraft Details
@app.route('/spacecraft/<int:id>')
def spacecraft_details(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Spacecraft WHERE Spacecraft_ID = ?", (id,))
    spacecraft = cursor.fetchone()
    conn.close()

    if spacecraft:
        return render_template('spacecraft.html', spacecraft=spacecraft)
    return "Spacecraft not found", 404

# 🖼 Serve Images Correctly (if stored in static/img/)
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
