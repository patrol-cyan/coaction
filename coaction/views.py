import datetime
from flask import Blueprint, jsonify, request
from .models import Task, TaskSchema, User, Comment, UserSchema, CommentSchema
from .forms import RegistrationForm, LoginForm
from .extensions import db, login_manager, bcrypt
from flask.ext.login import login_required, login_user, logout_user, \
    current_user
from sqlalchemy import or_
coaction = Blueprint("coaction", __name__, static_folder="./static")
task_schema = TaskSchema()


@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")


@coaction.route("/api")
def api():
    return ""


@coaction.route("/api/tasks", methods=["GET"])
def view_tasks():
    serializer = TaskSchema(many=True)
    if not current_user.is_authenticated():
        tasks = Task.query.all()
        result = serializer.dump(tasks)
        return jsonify({"tasks": result.data})
    else:
        user = User.query.get_or_404(current_user.id)
        tasks = Task.query.filter(or_(Task.owner == user.id, Task.assignee == user.id))
        result = serializer.dump(tasks)
        return jsonify({"tasks": result.data})


@coaction.route("/api/tasks", methods=["POST"])
def add_task():
    if not request.get_json():
        return jsonify({'message': 'No input data provided'}), 400
    task_data = request.get_json()
    if "due_date" in task_data and task_data["due_date"]:
        task_data["due_date"] = datetime.datetime.strptime(task_data["due_date"], "%m/%d/%y")
    errors = task_schema.validate(task_data)
    if errors:
        return jsonify(errors), 400
    task = Task(**task_data)
    db.session.add(task)
    db.session.commit()
    result = task_schema.dump(Task.query.get(task.id))
    return jsonify({"message": "Created new task.",
                    "task": result.data})


@coaction.route("/api/tasks/<int:id>", methods=["PUT", "PATCH"])
def update_task(id):
    if not request.get_json():
        return jsonify({'message': 'No input data provided'}), 400
    task = Task.query.get_or_404(id)
    task_data = request.get_json()
    if "due_date" in task_data and task_data["due_date"]:
        task_data["due_date"] = datetime.datetime.strptime(task_data["due_date"], "%m/%d/%y")
    for key, value in task_data.items():
            setattr(task, key, value)
    input_data = task.to_dict()
    errors = task_schema.validate(input_data)
    if errors:
        return jsonify(errors), 400
    db.session.add(task)
    db.session.commit()
    result = task_schema.dump(Task.query.get(task.id))
    return jsonify({"message": "Updated current task.",
                    "updatetask": result.data})


@coaction.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"deleted": "true"})


@coaction.route("/api/tasks/<int:id>", methods=["GET"])
def get_task(id):
    task = Task.query.get_or_404(id)
    serializer = TaskSchema()
    result = serializer.dump(task)
    return jsonify(result.data)


@coaction.route("/api/tasks/<int:id>/comments", methods=["GET"])
def get_comments(id):
    if not request.get_json():
        return jsonify({"message": 'No input data provided'}), 400

    pass


@coaction.route("/api/tasks/<int:id>/comments", methods=["POST"])
def add_comments(id):
    if not request.get_json():
        return jsonify({"message": 'No input data provided'}), 400
    comment_data = request.get_json()
    comment_serializer = CommentSchema()
    result = comment_serializer.dump(comment_data)

    return jsonify({"message": "Comment added.",
                    "comment": result.data})


    pass


@coaction.route("/api/tasks/<int:id>/comments/<int:comment_id>", methods=["DELETE"])
def delete_comments(id, comment_id):
    comment = Comment.query.get_or_404(comment_id)


    pass


@coaction.route("/api/register", methods=["POST"])
def register():
    if not request.get_json():
        return jsonify({'message': 'No input data provided'}), 400
    data = request.get_json()
    form = RegistrationForm(data=data, formdata=None, csrf_enabled=False)
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        name = User.query.filter_by(name=form.name.data).first()
        if user:
            return jsonify({"message": "User with that email already exists."}), 400
        elif name:
            return jsonify({"message": "User with that name already exists."}), 400
        else:
            user = User(name=form.name.data,
                        email=form.email.data,
                        password=form.password.data)
            db.session.add(user)
            db.session.commit()
            login_user(user, remember=True)
            return jsonify({"message": "Registered user."})


@coaction.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    serializer = UserSchema(many=True)
    result = serializer.dump(users)
    return jsonify({"users": result.data})


@coaction.route("/api/users/current", methods=["GET"])
def get_current_user():
    if current_user.is_authenticated():
        user_id = current_user.id
        user = User.query.get_or_404(user_id)
        serializer = UserSchema()
        result = serializer.dump(user)
        return jsonify({"current_user": result.data})
    else:
        return jsonify({"message": "User not logged in."})


@coaction.route("/api/login", methods=["POST"])
def login():
    if not request.get_json():
        return jsonify({'message': 'No input data provided'}), 400
    data = request.get_json()
    form = LoginForm(data=data, formdata=None, csrf_enabled=False)
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            print(user.encrypted_password, form.password.data)
            if bcrypt.check_password_hash(user.encrypted_password, form.password.data):
                user.authenticated = True
                db.session.add(user)
                db.session.commit()
                login_user(user, remember=True)
                return jsonify({"message": "Logged in successfully."})
            else:
                return jsonify({"message": "Incorrect password"}), 400
        else:
            return jsonify({"message": "No user with that email."}), 400



@coaction.route("/api/logout", methods=["POST"])
@login_required
def logout():
    """Logout the current user."""
    user = current_user
    user.authenticated = False
    db.session.add(user)
    db.session.commit()
    logout_user()
    return jsonify({"message": "logout successful."})


@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.
    :param unicode user_id: user_id (email) user to retrieve
    """
    return User.query.get(user_id)

