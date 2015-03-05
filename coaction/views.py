from flask import Blueprint, flash, jsonify, request
from .models import Todo
from .forms import TodoForm
from .extensions import db
from marshmallow import Schema, fields, ValidationError
coaction = Blueprint("coaction", __name__, static_folder="./static")


@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")


## Add your API views here




coaction = Blueprint("coaction", __name__, static_folder="./static")


@coaction.route("/api")
def api():
    return ""

@coaction.route("/api/todos", methods=["GET"])
def todos():
    todos = [todo.to_dict() for todo in Todo.query.all()]
    return jsonify(todos=todos)

@coaction.route("/api/todos", methods=["POST"])
def add_todo():
    todo_data = request.get_json()
    form = TodoForm(data=todo_data)
    if form.validate():
        todo = Todo(**form.data)
        db.session.add(todo)
        db.session.commit()
        return jsonify(todo.to_dict())
    else:
        resp = jsonify(form.errors)
        resp.status_code = 400
        return resp

@coaction.route("/api/todos/<int:id>", methods=["PUT"])
def update_todo(id):
    todo = Todo.query.get_or_404(id)
    todo_data = request.get_json()
    form = TodoForm(data=todo_data)
    if form.validate():
        form.populate_obj(todo)
        db.session.commit()
        return jsonify(todo.to_dict())
    else:
        resp = jsonify(form.errors)
        resp.status_code = 400
        return resp

@coaction.route("/api/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"deleted": "true"})


