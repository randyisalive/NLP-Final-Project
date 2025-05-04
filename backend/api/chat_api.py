from controller.chat_contoller import add_chat, get_chat, get_chat_by_id, delete_chat
from controller.mt5_controller import generate_mt5_summary
from flask import Blueprint, request, jsonify, current_app

chat_api = Blueprint("chat_api", __name__)


@chat_api.route("/api/chat/get", methods=["POST", "GET"])
def get():
    user_id = 1
    try:
        chats = get_chat(user_id)
        return jsonify({"data": chats, "status": 200})
    except Exception as e:
        return jsonify({"e": e, "api": "/api/chat/add", "status": 400})


@chat_api.route("/api/chat/get_id", methods=["POST", "GET"])
def get_id():
    data = request.json
    id = data.get("id")
    try:
        chats = get_chat_by_id(id)
        return jsonify({"data": chats, "status": 200})
    except Exception as e:
        return jsonify({"e": e, "api": "/api/chat/add", "status": 400})


@chat_api.route("/api/chat/add", methods=["POST", "GET"])
def add():
    if request.method == "POST":
        data = request.json
        print(data)
        text = data.get("text")
        summary = generate_mt5_summary(text)
        user_id = 1
        add_chat(text, summary, user_id)
        return jsonify(
            {"summary": summary, "message": "add chat successfully", "status": 200}
        )
    return jsonify({"api": "/api/chat/add", "status": 200})


@chat_api.route("/api/chat/delete", methods=["POST"])
def delete():
    if request.method == "POST":
        data = request.json
        id = data.get("id")
        delete_chat(id)
        return jsonify({"message": f"delete chat with id:{id}"})
    return jsonify({"api": "/api/chat/delete", "status": 200})
