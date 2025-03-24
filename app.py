from flask import Flask, render_template, jsonify, request
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('dgt_term_1_internal.db')
    conn.row_factory = sqlite3.Row  # Enables column name access
    return conn

# 🏠 **Homepage**
@app.route('/')
def home():
    return render_template('index.html')

# 🌍 **Serve Static Pages Correctly**
@app.route('/missions.html')
def missions_page():
    return render_template('missions.html')

@app.route('/astronauts.html')
def astronauts_page():
    return render_template('astronauts.html')

@app.route('/spacecraft.html')
def spacecraft_page():
    return render_template('spacecraft.html')

# 🚀 **Get All Missions**
@app.route('/api/missions')
def missions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT m.Mission_ID, m.Mission_Name, m.Year, m.Destination, m.Outcome, 
               i.images_mission_url AS Mission_Img
        FROM Mission m
        LEFT JOIN images_Mission i ON m.Mission_ID = i.Mission_ID
    """)
    missions = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in missions])

# 👨‍🚀 **Get All Astronauts**
@app.route('/api/astronauts')
def astronauts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.Astronaut_ID, a.Name, a.Role, 
               i.image_people_url AS Astronaut_Img
        FROM Astronaut a
        LEFT JOIN images_Astronaut i ON a.Astronaut_ID = i.Astronaut_ID
    """)
    astronauts = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in astronauts])

# 🛰 **Get All Spacecraft**
@app.route('/api/spacecraft')
def spacecraft():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT s.Spacecraft_ID, s.Spacecraft_Name, s.Launch_Vehicle, 
               i.image_spacecraft_url AS Spacecraft_Img
        FROM Spacecraft s
        LEFT JOIN images_spacecraft i ON s.Spacecraft_ID = i.Spacecraft_ID
    """)
    spacecraft = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in spacecraft])

# 🌍 **Serve Dynamic Mission Details**
@app.route('/mission/<int:mission_id>')
def mission_details(mission_id):
    return render_template('mission.html', mission_id=mission_id)

# 👨‍🚀 **Serve Dynamic Astronaut Details**
@app.route('/astronaut/<int:astronaut_id>')
def astronaut_details(astronaut_id):
    return render_template('astronaut.html', astronaut_id=astronaut_id)

# 🚀 **Serve Dynamic Spacecraft Details**
@app.route('/spacecraft/<int:spacecraft_id>')
def spacecraft_details(spacecraft_id):
    return render_template('spacecraft.html', spacecraft_id=spacecraft_id)

# 🔎 **Search API (For Homepage)**
@app.route('/api/search')
def search():
    query = request.args.get('q', '').strip().lower()
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    results = []

    if query:
        # Search Missions
        cursor.execute("SELECT Mission_ID, Mission_Name FROM Mission WHERE LOWER(Mission_Name) LIKE ?", ('%' + query + '%',))
        missions = cursor.fetchall()
        for mission in missions:
            results.append({"type": "mission", "id": mission["Mission_ID"], "name": mission["Mission_Name"]})

        # Search Astronauts
        cursor.execute("SELECT Astronaut_ID, Name FROM Astronaut WHERE LOWER(Name) LIKE ?", ('%' + query + '%',))
        astronauts = cursor.fetchall()
        for astro in astronauts:
            results.append({"type": "astronaut", "id": astro["Astronaut_ID"], "name": astro["Name"]})

        # Search Spacecraft
        cursor.execute("SELECT Spacecraft_ID, Spacecraft_Name FROM Spacecraft WHERE LOWER(Spacecraft_Name) LIKE ?", ('%' + query + '%',))
        spacecrafts = cursor.fetchall()
        for sc in spacecrafts:
            results.append({"type": "spacecraft", "id": sc["Spacecraft_ID"], "name": sc["Spacecraft_Name"]})

    conn.close()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
