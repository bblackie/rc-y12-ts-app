from flask import Flask, render_template, jsonify, request, send_from_directory, url_for  # Added url_for for static images
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
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT m.Mission_ID, m.Mission_Name, m.Year, m.Destination, m.Outcome, i.images_mission_url
        FROM Mission m
        LEFT JOIN images_Mission i ON m.Mission_ID = i.Mission_ID
    """)
    missions = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Mission_ID": row["Mission_ID"],
        "Mission_Name": row["Mission_Name"],
        "Year": row["Year"],
        "Destination": row["Destination"],
        "Outcome": row["Outcome"],
        "Mission_Img": row["images_mission_url"] if row["images_mission_url"] else "static/images/placeholder.jpg"
    } for row in missions])


# 👨‍🚀 API: Get All Astronauts
@app.route('/api/astronauts')
def astronauts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.Astronaut_ID, a.Name, a.Role, i.image_people_url
        FROM Astronaut a
        LEFT JOIN images_Astronaut i ON a.Astronaut_ID = i.Astronaut_ID
    """)
    astronauts = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Astronaut_ID": row["Astronaut_ID"],
        "Name": row["Name"],
        "Role": row["Role"],
        "Astronaut_Img": row["image_people_url"] if row["image_people_url"] else "static/images/placeholder.jpg"
    } for row in astronauts])


# 🛰 API: Get All Spacecraft
@app.route('/api/spacecraft')
def spacecraft():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT s.Spacecraft_ID, s.Spacecraft_Name, s.Launch_Vehicle, i.image_spacecraft_url
        FROM Spacecraft s
        LEFT JOIN images_spacecraft i ON s.Spacecraft_ID = i.Spacecraft_ID
    """)
    spacecraft = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Spacecraft_ID": row["Spacecraft_ID"],
        "Spacecraft_Name": row["Spacecraft_Name"],
        "Launch_Vehicle": row["Launch_Vehicle"],
        "Spacecraft_Img": row["image_spacecraft_url"] if row["image_spacecraft_url"] else "static/images/placeholder.jpg"
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

# 🖼 Serve Images Correctly (if stored in static/images/)
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
