from flask import Blueprint, flash, jsonify, request
from .models import Task, TaskSchema
from .forms import TodoForm
from .extensions import db
from marshmallow import Schema, fields, ValidationError
coaction = Blueprint("coaction", __name__, static_folder="./static")
task_schema = TaskSchema()



@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")


## Add your API views here


@coaction.route("/api")
def api():
    return ""

@coaction.route("/api/tasks", methods=["GET"])
def view_tasks():
    tasks = [task.to_dict() for task in Task.query.all()]
    return jsonify(tasks=tasks)

@coaction.route("/api/tasks", methods=["POST"])
def add_task():
    if not request.get_json():
        return jsonify({'message': 'No input data provided'}), 400
    task_title = request.get_json().get('title')
    task_data = request.get_json()
    input_data = dict(title=task_title)
    errors = task_schema.validate(input_data)
    if errors:
        return jsonify(errors), 400
    task = Task(title=task_title)
    db.session.add(task)
    db.session.commit()
    result = task_schema.dump(Task.query.get(task.id))
    return jsonify({"message": "Created new task.",
                    "task": result.data})


@coaction.route("/api/tasks/<int:id>/", methods=["PUT"])
def update_task(id):
    if not request.get_json():
        return jsonify({'message': 'No input data provided'}), 400
    task_title = request.get_json().get('title')
    task_data = request.get_json()
    input_data = dict(title=task_title)
    errors = task_schema.validate(input_data)
    if errors:
        return jsonify(errors), 400
    task = Task(title=task_title)
    db.session.add(task)
    db.session.commit()
    result = task_schema.dump(Task.query.get(task.id))
    return jsonify({"message": "Updated current task.",
                    "updatetask": result.data})
        db.session.commit()
        return jsonify(todo.to_dict())
    else:
        resp = jsonify(form.errors)
        resp.status_code = 400
        return resp

@coaction.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"deleted": "true"})

@coaction.route("/api/tasks/<int:id>/comments", methods=["GET"])
def get_comments(id):


@coaction.route("/api/tasks/<int:id>/comments", methods=["POST"])
def add_comments(id):


@coaction.route("/api/tasks/<int:id>/comments", methods=["DELETE"]
def delete_comments(id):

    





