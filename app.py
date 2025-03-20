from flask import Flask, render_template, jsonify, request, send_from_directory
import sqlite3

app = Flask(__name__, static_folder="static")

def get_db_connection():
    conn = sqlite3.connect('dgt_term_1_internal.db')
    conn.row_factory = sqlite3.Row  # Enables column name access
    return conn

# 🛰 API: Get Missions (with images)
@app.route('/api/missions')
def missions():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """
    SELECT m.Mission_ID, m.Mission_Name, m.Year, m.Destination, m.Outcome, 
           i.images_mission_url 
    FROM Mission m
    LEFT JOIN images_Mission i ON m.Mission_ID = i.Mission_ID
    """
    cursor.execute(query)
    missions = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Mission_ID": row["Mission_ID"],
        "Mission_Name": row["Mission_Name"],
        "Year": row["Year"],
        "Destination": row["Destination"],
        "Outcome": row["Outcome"],
        "Mission_Img": row["images_mission_url"] or "static/placeholder.jpg"
    } for row in missions])

# 👨‍🚀 API: Get Astronauts (with images)
@app.route('/api/astronauts')
def astronauts():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """
    SELECT a.Astronaut_ID, a.Name, a.Role, i.image_people_url 
    FROM Astronaut a
    LEFT JOIN images_Astronaut i ON a.Astronaut_ID = i.Astronaut_ID
    """
    cursor.execute(query)
    astronauts = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Astronaut_ID": row["Astronaut_ID"],
        "Name": row["Name"],
        "Role": row["Role"],
        "Astronaut_Img": row["image_people_url"] or "static/placeholder.jpg"
    } for row in astronauts])

# 🚀 API: Get Spacecraft (with images)
@app.route('/api/spacecraft')
def spacecraft():
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    SELECT s.Spacecraft_ID, s.Spacecraft_Name, s.Launch_Vehicle, 
           i.image_spacecraft_url 
    FROM Spacecraft s
    LEFT JOIN images_spacecraft i ON s.Spacecraft_ID = i.Spacecraft_ID
    """
    cursor.execute(query)
    spacecraft = cursor.fetchall()
    conn.close()

    return jsonify([{
        "Spacecraft_ID": row["Spacecraft_ID"],
        "Spacecraft_Name": row["Spacecraft_Name"],
        "Launch_Vehicle": row["Launch_Vehicle"],
        "Spacecraft_Img": row["image_spacecraft_url"] or "static/placeholder.jpg"
    } for row in spacecraft])

# 🖼 Serve Static Images
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
