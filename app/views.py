from app import app, db
from app.forms import LoginForm, RegistrationForm
from app.models import User, Task
from flask import flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user


@app.route("/")
@app.route("/index")
def index():
    if current_user.is_authenticated:
        return redirect(url_for("cabinet"))
    return render_template("index.html")


@app.route("/login", methods=["POST", "GET"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("cabinet"))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash("Invalid username or password")
            return redirect(url_for("login"))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for("cabinet"))
    return render_template("login.html", form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))


@app.route("/register", methods=["POST", "GET"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("cabinet"))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash("Succsesfully registered")
        return redirect(url_for("login"))
    return render_template("register.html", form=form)


@app.route("/cabinet")
@login_required
def cabinet():
    user = User.query.filter_by(id=current_user.get_id()).first()
    tasks = user.get_tasks()
    return render_template("cabinet.html", username=user.username, tasks=tasks)


@app.route("/refresh", methods=["POST"])
@login_required
def refresh():
    data = request.get_json()
    to_do = data["to_do"]
    delete = data["delete"]
    if to_do:
        for i in to_do:
            current_user.add_task(i)

    if delete:
        for i in delete:
            current_user.delete_task(int(i))

    return "good"
