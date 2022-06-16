"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token 
from werkzeug.security import generate_password_hash, check_password_hash
import os
import sys
import datetime


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST']) 
def create_register():
    # obteniendo los datos del body
    email = request.json.get('email')
    password = request.json.get('password')


    # validaciones
    # si el email ya se encuentra registrado
    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify(message=f'El usuario con el email {email} ya existe'), 409 

    # creo el objeto User
    user = User()
    user.email = email
    user.password = generate_password_hash(password)

    #agregar el usuario a db y guardos los cambios
    db.session.add(user)
    db.session.commit()
    
    # retornar los datos del usuario registrado
    return jsonify(user.serialize()), 201   

@api.route('/users', methods=['GET'])
def all_user():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))

    return jsonify(users), 200

@api.route('/login', methods=['POST'])
def login_user():
    #validations
    if request.json.get('email') is None or request.json.get('email') == '':
        return jsonify(message='debes enviar un email'), 400
    if request.json.get('password') is None or request.json.get('password') == '':
        return jsonify(message='debes enviar un password'), 400
    # asignations
    email = request.json.get('email')
    password = request.json.get('password')

    mail = User.query.filter_by(email=email).first()
    if mail is None:
        return jsonify(message=f'el usuario {email} no existe'), 404
    
    if check_password_hash(mail.password, password) is True:
        sessiontime = datetime.timedelta(hours=2)
        access_token = create_access_token(identity=email, expires_delta=sessiontime)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(message='la contraseña o el email es incorrecto'),401