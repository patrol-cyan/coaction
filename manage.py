#!/usr/bin/env python
import os

from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean

from coaction import create_app, db
from coaction.models import Task, User


app = create_app()
manager = Manager(app)
manager.add_command('server', Server())
manager.add_command('db', MigrateCommand)
manager.add_command('show-urls', ShowUrls())
manager.add_command('clean', Clean())


@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """

    return dict(app=app, db=db)


@manager.command
def createdb():
    """Creates the database with all model tables. 
    Migrations are preferred."""
    db.create_all()

@manager.command
def fake_tasks():
    task1 = Task(title="Write Docs", owner=1)
    task2 = Task(title="Debug API", owner=1)
    task3 = Task(title="Buy groceries", owner=1)
    user = User(name="Clinton", email="email@email.com", password="pass")

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(user)
    db.session.commit()

if __name__ == '__main__':
    manager.run()
