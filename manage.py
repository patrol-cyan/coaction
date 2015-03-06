#!/usr/bin/env python
import os

from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean

from coaction import create_app, db
from coaction.models import Task


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
    task1 = Task(title="Write Docs")
    task2 = Task(title="Debug API")
    task3 = Task(title="Buy groceries")

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.commit()

if __name__ == '__main__':
    manager.run()
