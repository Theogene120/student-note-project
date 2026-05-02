from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 3307)),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "student_notes")
    )

# GET all notes
@app.route("/notes", methods=["GET"])
def get_notes():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM notes ORDER BY created_at DESC")
        notes = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(notes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# POST create a note
@app.route("/notes", methods=["POST"])
def create_note():
    try:
        data = request.get_json()
        title = data.get("title", "").strip()
        content = data.get("content", "").strip()

        if not title or not content:
            return jsonify({"error": "Title and content are required"}), 400

        db = get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO notes (title, content) VALUES (%s, %s)", (title, content))
        db.commit()
        new_id = cursor.lastrowid
        cursor.close()
        db.close()
        return jsonify({"id": new_id, "title": title, "content": content}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# PUT update a note
@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    try:
        data = request.get_json()
        title = data.get("title", "").strip()
        content = data.get("content", "").strip()

        if not title or not content:
            return jsonify({"error": "Title and content are required"}), 400

        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE notes SET title=%s, content=%s WHERE id=%s",
            (title, content, note_id)
        )
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Note not found"}), 404
        cursor.close()
        db.close()
        return jsonify({"message": "Note updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE a note
@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM notes WHERE id=%s", (note_id,))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Note not found"}), 404
        cursor.close()
        db.close()
        return jsonify({"message": "Note deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
