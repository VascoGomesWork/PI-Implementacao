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
    # How to get Parameters out of URL -> https://stackoverflow.com/questions/24892035/how-can-i-get-the-named-parameters-from-a-url-using-flask
    print("REQUEST = ", request.args.get("search"))
    # How to check if a column contains substring -> https://stackoverflow.com/questions/4926757/sqlalchemy-query-where-a-column-contains-a-substring
    materials_list = Material.query.filter(
        Material.nome.contains(request.args.get("search"))).all()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(materials_list)

    return jsonify({"materials_list": result})

# Get All Materials


@app.route("/stock", methods=["GET", "POST"])
def view_stock():
    stock = Material.query.all()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(stock)

    return jsonify({"stock": result})

# Get All Projects


@app.route("/showprojects", methods=["GET", "POST"])
def show_projects():
    projects = Projeto.query.all()
    project_schema = ProjetoSchema(many=True)
    result = project_schema.dump(projects)

    return jsonify({"projects": result})

# Get All types of materials


@app.route("/showtypesmaterials", methods=["GET", "POST"])
def show_types_materials():
    types = Tipo_Material.query.all()
    materials_type_schema = Tipo_MaterialSchema(many=True)
    result = materials_type_schema.dump(types)

    return jsonify({"types": result})


# Get All Materials By Their types of materials

@app.route("/showmaterialsbynamebytype", methods=["GET", "POST"])
def show_materials_types_materials():
    #If type is Kit calls the function bellow
    if request.args.get("search_type") == "Kit":
        return jsonify({"types": search_by_kit()})

    # How to get Parameters out of URL -> https://stackoverflow.com/questions/24892035/how-can-i-get-the-named-parameters-from-a-url-using-flask
    print("NAO E KIT ")
    print("REQUEST SEARCH= ", request.args.get("search"))
    print("REQUEST TYPE= ", request.args.get("search_type"))

    #How to get data from multiple tables -> https://stackoverflow.com/questions/65642421/how-to-get-data-from-multiple-tables-using-flask-sqlalchemy
    materials_list = (db.session.query(Material).filter(
        Material.nome.contains(request.args.get("search")), Material.id_tipo_material==int(request.args.get("search_type")))
    ).all()

    #materials_list = (Material.query
    #    .filter(Material.nome.contains(request.args.get("search")))
    #    .filter(Material.id_kit_material==int(request.args.get("search_type")))).all()

    #materials_list = Material.query.filter((
    #        Material.nome.contains(request.args.get("search")) & (Material.id_kit_material==int(request.args.get("search_type")))
    #        )).all()

    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(materials_list)

    print("QUERY RESULT = ", result)
    return jsonify({"types": result})

def search_by_kit():

    print("Search By Kit ")
    # How to get Parameters out of URL -> https://stackoverflow.com/questions/24892035/how-can-i-get-the-named-parameters-from-a-url-using-flask
    print("REQUEST SEARCH= ", request.args.get("search"))
    print("REQUEST TYPE= ", request.args.get("search_type"))
    # How to check if a column contains substring -> https://stackoverflow.com/questions/4926757/sqlalchemy-query-where-a-column-contains-a-substring
    materials_list = Material.query.filter(
          Material.nome.contains(request.args.get("search"))).all()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(materials_list)

    return result

# Add new materials kit


@app.route("/addmaterialskit", methods=["GET", "POST"])
def add_kits_material():
    nome = request.json["nome"]
    kit_id_material = request.json["materialsKitList"]
    observacao = request.json["observacoes"]

    # Inserts Data in Kit Table
    print("NOME SERVER = ", nome)
    print("OBSERVACAO SERVER = ", observacao)
    new_kit = Kit(nome=nome, observacao=observacao)

    db.session.add(new_kit)
    db.session.commit()

    print("LENGH ID MATERIAL = ", len(kit_id_material))

    # Loops through kit_id_material list
    for i in range(len(kit_id_material)):
        print("ID MATERIAL SERVER = ", kit_id_material[i].get('id'))
        new_kit_material = Kit_Material(
            quantidade=kit_id_material[i].get('quantidade'),
            id_kit=new_kit.id,
            id_material=kit_id_material[i].get('id'))

        db.session.add(new_kit_material)
        db.session.commit()

    return jsonify({
        "kit_id": new_kit.id,
        "kit_nome_material": new_kit.nome,
        "kit_observacoes": new_kit.observacao,
        "kit_material_id": new_kit_material.id,
        "kit_id_fk": new_kit_material.id_kit,
        "material_id_fk": new_kit_material.id_material,
    })


# Add new Kit
@app.route("/addkit", methods=["POST"])
def add_kit():
    kit = request.json["kitMaterialsList"]
    nomeKit = request.json["nomeKit"]
    observacao = request.json["observacao"]

    # Adds a new kit
    new_kit = Kit(nome=nomeKit, observacao=observacao)
    db.session.add(new_kit)
    db.session.commit()

    # Adds new kit matrial
    for item in kit:
        print(item)
        new_kit_material = Kit_Material(
            quantidade=item["quantidade"],
            id_kit=new_kit.id,
            id_material=item["id"])

        db.session.add(new_kit_material)
        db.session.commit()

    return jsonify({})


# Add new material
@app.route("/addmaterial", methods=["GET", "POST"])
def add_material():
    nome = request.json["nome"]
    quantidade = request.json["quantidade"]
    observacao = request.json["observacao"]
    data = datetime.now()
    # FKs
    type = Tipo_Material.query.filter_by(
        id=request.json["tipo_material"]).first()
    # verifies if the material is associated with a project
    if request.json["projeto"] == "0":
        project = None
    else:
        project = Projeto.query.filter_by(
            id=request.json["projeto"]).first().id

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
    id = request.json["id"]
    quantidade = request.json["quantidade"]

    new_stock = Material.query.filter_by(id=id).first()
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
    data_inicio = datetime.strptime(request.json["data_inicio"], '%Y-%m-%d')
    #data_fim = request.json["data_fim"]
    data_fim = datetime.strptime(request.json["data_fim"], '%Y-%m-%d')

    new_project = Projeto(nome=nome, observacoes=observacoes,
                          data_inicio=data_inicio, data_fim=data_fim)
    db.session.add(new_project)
    db.session.commit()

    return jsonify({
        "id": new_project.id,
        "nome": new_project.nome,
        "observacoes": new_project.observacoes,
        "data_inicio": new_project.data_inicio,
        "data_fim": new_project.data_fim,
    })

# Get all kits names


@app.route("/getkitsnames", methods=["GET", "POST"])
def get_kits_names():
    kits_list = Kit_Material.query.filter_by().all()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(kits_list)

    return jsonify({"kits_names": result})

# Get all kits


@app.route("/getkits", methods=["GET", "POST"])
def get_kits():

    # Get Kit Data
    kits_material_list = Kit_Material.query.all()
    kit_material_schema = Kit_MaterialSchema(many=True)
    result_kit_material = kit_material_schema.dump(kits_material_list)

    print("RESULT KIT MATERIAL = ", result_kit_material)

    # Uses Kit Data to Search Material Data
    data_array = []
    counter = 0

    for i in range(len(result_kit_material)):
        print("ID KIT = ", result_kit_material[i]['id_kit'])
        kit_list = Kit.query.filter_by(id=result_kit_material[i]['id_kit'])
        kit_schema = KitSchema(many=True)
        result_kit = kit_schema.dump(kit_list)
        # Adds the Item result_kit to the array that contains all the kits
        # array_kit.push(result_kit)
        print("RESULT KIT = ", result_kit)

        material_list = Material.query.filter_by(
            id=result_kit_material[i]['id_material'])
        material_schema = MaterialSchema(many=True)
        result_material = material_schema.dump(material_list)
        # Adds the Item result_material to the array that contains all the materials
        # array_materials.push(result_material)

        data_array.append({
            "id": result_kit_material[i]['id'],
            "nome_kit_material": result_kit[counter]['nome'],
            "nome_material": result_material[counter]['nome'],
            "quantidade": result_kit_material[i]['quantidade'],
            "observacoes": result_kit[counter]['observacao']
        })

        counter += 1

        if counter <= len(result_kit) or counter <= len(result_material):
            counter = 0

    # Returns it
    # Creates Array with Info from Kit and Material
    #print("DATA ARRAY = ", data_array)
    return jsonify({
        "data_array": data_array
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
    new_user = User(nome=nome, email=email, telefone=telefone,
                    tipo_utilizador=tipo_utilizador, password=hashed_password)
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
