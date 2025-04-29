from flask import Blueprint, request, jsonify, render_template

home_views = Blueprint("home_views", __name__)


@home_views.route("/")
def index():
    return render_template("index.html")
