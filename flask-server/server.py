from flask import Flask, jsonify, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from models import *
#from models import db, User, Material, MaterialSchema, Projeto, ProjetoSchema, Requisitar_Devolver, Requisitar_DevolverSchema, Tipo_Material, Tipo_MaterialSchema, Kit_Material, Kit_MaterialSchema
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from datetime import datetime

# .\venv\Scripts\activate -> activate virtual envirement
# pip install -r .\requirements.txt

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

server_session = Session(app)
db.init_app(app)
with app.app_context():
    db.create_all()

# Get current user
@app.route("/@me")
def get_curretn_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })

# Get Materials By Name
@app.route("/showmaterialsbyname", methods=["GET", "POST"])
def materials_list():
    materials_list = Material.query.filter_by(nome=request.json["search"]).first()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(materials_list)

    return jsonify({ "materials_list" : result })

# Get All Materials
@app.route("/stock", methods=["GET", "POST"])
def view_stock():
    stock = Material.query.all()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(stock)

    return jsonify({ "stock" : result })

# Get All Projects
@app.route("/showprojects", methods=["GET", "POST"])
def show_projects():
    projects = Projeto.query.all()
    project_schema = ProjetoSchema(many=True)
    result = project_schema.dump(projects)

    return jsonify({ "projects" : result })

# Get All types of materials
@app.route("/showtypesmaterials", methods=["GET", "POST"])
def show_types_materials():
    types = Tipo_Material.query.all()
    materials_type_schema = Tipo_MaterialSchema(many=True)
    result = materials_type_schema.dump(types)

    return jsonify({ "types" : result })

# Add new material
@app.route("/addmaterial", methods=["GET", "POST"])
def add_material():
    nome = request.json["nome"]
    quantidade = request.json["quantidade"]
    observacao = request.json["observacao"]
    data = datetime.now()
    # FKs
    type = Tipo_Material.query.filter_by(id=request.json["tipo_material"]).first()
    # verifies if the material is associated with a project
    if request.json["projeto"] == "0":
        project = None
    else:
        project = Projeto.query.filter_by(id=request.json["projeto"]).first().id

    new_material = Material(nome=nome,
                            quantidade=quantidade,
                            observacao=observacao,
                            data=data,
                            id_tipo_material=type.id,
                            id_kit_material=None,
                            id_projeto=project)
    
    db.session.add(new_material)
    db.session.commit()

    return jsonify({
        "id": new_material.id,
        "nome": new_material.nome,
        "quantidade": new_material.quantidade,
        "observacao": new_material.observacao,
        "data": new_material.data,
        "tipo_material": new_material.id_tipo_material,
        "kit_material": new_material.id_kit_material,
        "projeto": new_material.id_projeto
    })

# Add new material type
@app.route("/addmaterialtype", methods=["POST"])
def add_material_type():
    tipo = request.json["tipo"]

    new_material_type = Tipo_Material(tipo=tipo)
    db.session.add(new_material_type)
    db.session.commit()

    return jsonify({
        "id": new_material_type.id,
        "name": new_material_type.tipo,
    })

# Update Stocks
@app.route("/updatestock", methods=["POST"])
def update_stock():
    nome = request.json["nome"]
    quantidade = request.json["quantidade"]

    new_stock = Material.query.filter_by(nome=nome).first()
    new_stock.quantidade = int(quantidade)
    db.session.commit()

    return jsonify({
        "id": new_stock.id,
        "name": new_stock.nome,
        "quantity": new_stock.quantidade
    })

# Add new project
@app.route("/addproject", methods=["POST"])
def add_project():
    nome = request.json["nome"]
    observacoes = request.json["observacoes"]
    # convert string to date #
    #data_inicio = request.json["data_inicio"]
    data_inicio = datetime.strptime(request.json["data_inicio"], '%d-%m-%Y')
    #data_fim = request.json["data_fim"]
    data_fim = datetime.strptime(request.json["data_fim"], '%d-%m-%Y')

    new_project = Projeto(nome=nome, observacoes=observacoes, data_inicio=data_inicio, data_fim=data_fim)
    db.session.add(new_project)
    db.session.commit()

    return jsonify({
        "id": new_project.id,
        "nome": new_project.nome,
        "observacoes": new_project.observacoes,
        "data_inicio": new_project.data_inicio,
        "data_fim": new_project.data_fim,
    })

# Register route
@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    nome = request.json["nome"]
    telefone = request.json["telefone"]
    tipo_utilizador = "normal"

    # Verifies if user exists
    user_exist = User.query.filter_by(email=email).first() is not None
    if user_exist:
        return jsonify({"error": "User already exist"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(nome=nome, email=email, telefone=telefone, tipo_utilizador=tipo_utilizador, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # SAVE SESSION
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "nome": new_user.nome,
        "telefone": new_user.telefone,
        "tipo_utilizador": new_user.tipo_utilizador
    })

# Login route
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    # Verifies if user exists
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    # SAVE SESSION
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

# Logout
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

# Main
if __name__ == "__main__":
    app.run(debug=True)
