from app import db, login
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, index=True)
    email = db.Column(db.String(128), unique=True, index=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    done = db.Column(db.Boolean)
    text = db.Column(db.String(140))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
