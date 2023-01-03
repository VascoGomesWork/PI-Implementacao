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
        "nome": user.nome,
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


@app.route("/showstockbyname", methods=["GET", "POST"])
def materials_by_name_list():
    # search by name
    if request.args.get("search_type") == "nome_material":
        materials_list = Material.query.filter(
            Material.nome.contains(request.args.get("search"))).all()
        material_schema = MaterialSchema(many=True)
        result = material_schema.dump(materials_list)
        return jsonify({"materials_list": result})
    # search by quantity
    if request.args.get("search_type") == "quantidade" and request.args.get("search").isnumeric() or request.args.get("search")=="":
        if request.args.get("search")=="":
            materials_list = Material.query.all()
            material_schema = MaterialSchema(many=True)
            result = material_schema.dump(materials_list)
            return jsonify({"materials_list": result})

        materials_list = Material.query.filter(Material.quantidade.contains(int(request.args.get("search")))).all()
        material_schema = MaterialSchema(many=True)
        result = material_schema.dump(materials_list)
        return jsonify({"materials_list": result})
    # search by date
    if request.args.get("search_type") == "data_requisicao":
        materials_list = Material.query.filter(
            Material.data.contains(request.args["search"])).all()
        material_schema = MaterialSchema(many=True)
        result = material_schema.dump(materials_list)
        return jsonify({"materials_list": result})
    else:
        return jsonify({"materials_list": []})

# Get All Materials
@app.route("/stock", methods=["GET", "POST"])
def view_stock():
    stock = Material.query.all()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(stock)

    return jsonify({"stock": result})

# Get All Projects by name
@app.route("/showprojectbyname", methods=["GET", "POST"])
def show_projects_by_name():
    if request.args.get("search_type") == "nome_projeto":
        project_list = Projeto.query.filter(Projeto.nome.contains(request.args.get("search"))).all()
        project_schema = ProjetoSchema(many=True)
        result  = project_schema.dump(project_list)

        return jsonify({"projects": result})

    if request.args.get("search_type") == "data_inicio":
        project_list = Projeto.query.filter(Projeto.data_inicio.contains(request.args.get("search"))).all()
        project_schema = ProjetoSchema(many=True)
        result  = project_schema.dump(project_list)

        return jsonify({"projects": result})

    if request.args.get("search_type") == "data_fim":
        project_list = Projeto.query.filter(Projeto.data_fim.contains(request.args.get("search"))).all()
        project_schema = ProjetoSchema(many=True)
        result  = project_schema.dump(project_list)

        return jsonify({"projects": result})

# get all projects
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

# Get all in progress requests to return
@app.route("/showmaterialstoreturn", methods=["GET"])
def get_requests():

    #print("SEARCH = ", request.args["search"])
    #print("SEARCH_TYPE = ", request.args["search_type"])

    # verificar o search type com ifs para procurar na coluna certa
    #

    if request.args["search_type"] == "nome_projeto":
        print("NOME PROJETO = ", request.args["search"])
        returns_list = Requisitar_Devolver.query.filter(
            Requisitar_Devolver.esta_requisitado == True, Requisitar_Devolver.nome_projeto.contains(request.args["search"])).all()
    elif request.args["search_type"] == "data_requisicao":
        print("DATA REQUISICAO = ", request.args["search"])
        returns_list = Requisitar_Devolver.query.filter(
            Requisitar_Devolver.esta_requisitado == True, Requisitar_Devolver.data_requisicao.contains(request.args["search"])).all()
    elif request.args["search_type"] == "docente":
        print("DOCENTE = ", request.args["search"])
        returns_list = Requisitar_Devolver.query.filter(
            Requisitar_Devolver.esta_requisitado == True, Requisitar_Devolver.nome_pessoa_requisitar.contains(request.args["search"])).all()
    else:
        returns_list = Requisitar_Devolver.query.filter_by(
            esta_requisitado=True).all()
    requisitar_schema = Requisitar_DevolverSchema(many=True)
    result = requisitar_schema.dump(returns_list)

    # Searches by specific material
    list_request_material_result = []
    for item in result:
        # Get Materials
        # if item["id_material"] != None:
        #print("RETURNS LIST = ", item["id_material"], "\n")
        if request.args["search_type"] == "material":
            print("MATERIAL = ", request.args["search"])
            material_list = Material.query.filter(
                Material.id == item["id_material"], Material.nome.contains(request.args["search"])).all()
        else:
            material_list = Material.query.filter_by(
                id=item["id_material"]).all()
        material_schema = MaterialSchema(many=True)
        material_result = material_schema.dump(material_list)

        list_materials = []
        for material in material_result:
            list_materials.append(
                {
                    "id": material.get("id"),
                    "nome": material.get("nome")
                })

        # Get Users
        # if request.args["search_type"] == "docente" and item["nome_pessoa_requisitar"] == "":
        #    user_list = User.query.filter(
        #        User.id == item["id_user"], User.nome.contains(request.args["search"])).all()
        # else:
        user_list = User.query.filter_by(id=item["id_user"]).all()
        user_schema = UsersSchema(many=True)
        user_result = user_schema.dump(user_list)

        list_user = []
        for user in user_result:
            list_user.append(
                {
                    "id": user.get("id"),
                    "nome": user.get("nome")
                })

        # Get Kits
        kit_result = []
        if item["id_kit"] != None:
            if request.args["search_type"] == "kit":
                #print("KIT = ", request.args["search"])
                kits_list = Kit.query.filter(
                    Kit.id == item["id_kit"], Kit.nome.contains(request.args["search"])).all()
            else:
                kits_list = Kit.query.filter_by(id=item["id_kit"]).all()
            kit_schema = KitSchema(many=True)
            kit_result = kit_schema.dump(kits_list)
            #print("KIT RESULT = ", kit_result)

        list_kit = []
        if kit_result != None:
            for kit in kit_result:
                list_kit.append(
                    {
                        "id": kit.get("id"),
                        "nome": kit.get("nome")
                    })
        else:
            list_kit.append(
                {
                    "nome": None
                }
            )

        print("SEARCH_TYPE = ", request.args["search_type"])
        # if request.args["search_type"] == "nome_projeto" or request.args["search_type"] == "data_requisicao" or request.args["search_type"] == "docente" and item["nome_pessoa_requisitar"] != None:

        if request.args["search_type"] == "material":
            # If materials were choosen as searchtype execute the code above
            list_request_material_result = type_search_material(
                item, list_materials, list_user, list_kit, list_request_material_result, material_result, request.args["search"])

        # elif request.args["search_type"] == "docente" and item["nome_pessoa_requisitar"] == None:
            # list_request_material_result = type_search_docente(
            # item, list_materials, list_user, list_kit, list_request_material_result, user_result, request.args["search"])

        elif request.args["search_type"] == "kit":
            list_request_material_result = type_search_kit(
                item, list_materials, list_user, list_kit, list_request_material_result, kit_result, request.args["search"])

        else:
            # If materials were choosen as searchtype execute the code above
            list_request_material_result = type_search_nome_projeto_data_requisicao(
                item, list_materials, list_user, list_kit, list_request_material_result, request.args["search"])

    print("\n\nFINAL = ", list_request_material_result)

    return jsonify({
        "returns_list": [list_request_material_result]
    })


def type_search_nome_projeto_data_requisicao(item, list_materials, list_user, list_kit, list_request_material_result, search):

    list_materials_updated = list_request_material_result
    # Fazer append para dentro de -> list_request_material_result
    print("PESSOA A REQUISITAR = ", item["nome_pessoa_requisitar"], "\n\n")
    # Gets Name From Requesition, If there is None Uses the User Name
    if item["nome_pessoa_requisitar"] != "":
        list_user = [{"nome": item["nome_pessoa_requisitar"]}]
    list_materials_updated.append(
        {
            "id": item["id"],
            "nome_projeto": item["nome_projeto"],
            "quantidade": item["quantidade_requisitada"],
            "data_requisicao": item["data_requisicao"],
            "material": list_materials,
            "user": list_user,
            "kit": list_kit
        })

    return list_materials_updated


def type_search_material(item, list_materials, list_user, list_kit, list_request_material_result, material_result, search):

    list_materials_updated = list_request_material_result
    # Fazer append para dentro de -> list_request_material_result
    for material in material_result:
        print("MATERIAL = ", material)
        if material != []:
            print("MATERIAL NOME = ", material.get("nome"), "\n\n")
            # if material.get("nome") != None:
            # Gets Name From Requesition, If there is None Uses the User Name
            if item["nome_pessoa_requisitar"] != "":
                list_user = [{"nome": item["nome_pessoa_requisitar"]}]
            list_materials_updated.append(
                {
                    "id": item["id"],
                    "nome_projeto": item["nome_projeto"],
                    "quantidade": item["quantidade_requisitada"],
                    "data_requisicao": item["data_requisicao"],
                    "material": list_materials,
                    "user": list_user,
                    "kit": list_kit
                })

    return list_materials_updated


'''def type_search_docente(item, list_materials, list_user, list_kit, list_request_material_result, user_result, search):

    list_materials_updated = list_request_material_result
    # Fazer append para dentro de -> list_request_material_result
    for docente in user_result:
        print("DOCENTE = ", docente)
        if docente != []:
            #Gets Name From Requesition, If there is None Uses the User Name
            if item["nome_pessoa_requisitar"] != "":
                list_user = [{"nome": item["nome_pessoa_requisitar"]}]
            list_materials_updated.append(
                {
                    "id": item["id"],
                    "quantidade": item["quantidade_requisitada"],
                    "data_requisicao": item["data_requisicao"],
                    "material": list_materials,
                    "user": list_user,
                    "kit": list_kit
                })

    return list_materials_updated'''


def type_search_kit(item, list_materials, list_user, list_kit, list_request_material_result, kit_result, search):

    list_materials_updated = list_request_material_result
    # Fazer append para dentro de -> list_request_material_result
    for kit in kit_result:
        print("DOCENTE = ", kit)
        if kit != []:
            # Gets Name From Requesition, If there is None Uses the User Name
            if item["nome_pessoa_requisitar"] != "":
                list_user = [{"nome": item["nome_pessoa_requisitar"]}]
            list_materials_updated.append(
                {
                    "id": item["id"],
                    "quantidade": item["quantidade_requisitada"],
                    "data_requisicao": item["data_requisicao"],
                    "material": list_materials,
                    "user": list_user,
                    "kit": list_kit
                })

    return list_materials_updated

# Get All Materials By Their types of materials
@app.route("/showmaterialsbynamebytype", methods=["GET", "POST"])
def show_materials_types_materials():
    # If type is Kit calls the function bellow
    if request.args.get("search_type") == "Kit":
        return jsonify({"list_kit_mateirals": search_by_kit(request.args.get("search"))})

    materials_list = (db.session.query(Material).filter(
        Material.nome.contains(request.args.get("search")),
        Material.id_tipo_material == int(request.args.get("search_type")))
    ).all()

    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(materials_list)

    #print("QUERY RESULT = ", result)
    return jsonify({"list_kit_mateirals": result})


def search_by_kit(search):
    # gets all kits by search string
    kit_search_list = Kit.query.filter(
        Kit.nome.contains(request.args.get("search"))).all()
    kit_schema = KitSchema(many=True)
    kit_list = kit_schema.dump(kit_search_list)

    # get all information about the kits in the search result
    list_mats_in_kits = []  # contais each materials in each kit
    for kit in kit_list:
        kit_material_search = Kit_Material.query.filter_by(
            id_kit=kit.get("id")).all()
        kit_material_schema = Kit_MaterialSchema(many=True)
        kit_material_info = kit_material_schema.dump(kit_material_search)

        list_of_mats = []
        for material in kit_material_info:
            material_in_kit = Material.query.filter_by(
                id=material.get("id_material")).all()
            material_schema = MaterialSchema(many=True)
            material_info = material_schema.dump(material_in_kit)

            list_of_mats.append(
                {
                    "mat_id": material.get("id"),
                    "mat_quantidade_kit": material.get("quantidade"),
                    "mat_info": material_info
                }
            )
        list_mats_in_kits.append(
            {
                "kit_id": kit.get("id"),
                "kit_name": kit.get("nome"),
                "mat_list": list_of_mats
            }
        )

    return list_mats_in_kits

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
                            quantidade_disponivel=quantidade,
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
        # "kit_material": new_material.id_kit_material,
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


# makes a material request
@app.route("/makerequest", methods=["POST"])
def make_request():
    #request_variables = request.json["tipo"]
    print("REQUEST = ", request.json)
    for item in request.json["requisicaoMaterialsList"]:

        new_request = Requisitar_Devolver(
            nome_pessoa_requisitar=request.json["nome"],
            boolean_projeto=False if request.json["nome_projeto"] == "" else True,
            nome_projeto=request.json["nome_projeto"],
            esta_requisitado=True,
            esta_devolvido=False,
            quantidade_requisitada=item["quantidade"],
            data_requisicao=datetime.now(),
            data_devolucao_prevista=datetime.strptime(
                request.json["data_entrega_prevista"], '%Y-%m-%d'),
            data_devolucao_real=None,
            id_user=session.get("user_id"),
            id_material=item["id"],
            id_kit=None
        )
        db.session.add(new_request)
        db.session.commit()

    return jsonify({
        "": ""
    })


# makes a material return
@app.route("/makereturn", methods=["POST"])
def make_return():
    #request_variables = request.json["tipo"]
    print("REQUEST = ", request.json)
    for item in request.json["requisicaoMaterialsList"]:
        #print("ITEM = ", item,"\n\n\n\n\n")

        return_update = Requisitar_Devolver.query.filter_by(
            id=item["id"]).first()
        print("QUANTIDADE REQUISITADA = ",
              return_update.quantidade_requisitada, "\n\n\n\n\n")
        # Checks if Quantity is between baudaries
        if int(item["quantidade"]) > int(return_update.quantidade_requisitada):
            return jsonify({
                "error": "Quantidade Excede o Máximo"
            })
        elif int(item["quantidade"]) < int(return_update.quantidade_requisitada) and int(item["quantidade"]) >= 0:
            print("CARAI")
            return_update.quantidade_requisitada = int(
                return_update.quantidade_requisitada) - int(item["quantidade"])
        else:
            return_update.esta_requisitado = False
            return_update.esta_devolvido = True
            return_update.quantidade_requisitada = 0
            return_update.data_devolucao_real = datetime.now()

        db.session.commit()

    return jsonify({
        "": ""
    })

# makes a kit request
@app.route("/makekitsrequest", methods=["POST"])
def make_kits_request():
    # iterates over the kits
    for kit in request.json["requisicaoKitsList"]:
        list_mats_in_kit = Kit_Material.query.filter_by(id_kit=kit["id"]).all()
        kit_material_schema = Kit_MaterialSchema(many=True)
        result = kit_material_schema.dump(list_mats_in_kit)

        # iterates over the materials in each kit
        for mat in result:
            print("material =>", mat)
            new_material_kit_request = Requisitar_Devolver(
                nome_pessoa_requisitar=request.json["nome"],
                boolean_projeto=False if request.json["nome_projeto"] == "" else True,
                nome_projeto=request.json["nome_projeto"],
                esta_requisitado=True,
                esta_devolvido=False,
                # mateiral qty multiplied by kit qty
                quantidade_requisitada=(
                    mat["quantidade"] * int(kit["quantidade"])),
                data_requisicao=datetime.now(),
                data_devolucao_prevista=datetime.strptime(
                    request.json["data_entrega_prevista"], '%Y-%m-%d'),
                data_devolucao_real=None,
                id_user=session.get("user_id"),
                id_material=mat["id_material"],
                id_kit=mat["id_kit"]
            )
            db.session.add(new_material_kit_request)
            db.session.commit()

    return jsonify({
        "": ""
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

# Get all data from requisicoes
'''@app.route("/getrequisicaodata", methods=["GET", "POST"])
def get_kits_names():
    requisicoes_list = Requisitar_Devolver.query.all()
    requisicoes_schema = Requisitar_DevolverSchema(many=True)
    result = requisicoes_schema.dump(requisicoes_list)

    for item in result:

        #Gets Material
        material_list = Material.query.filter_by(id==item["id_material"])
        material_schema = MaterialSchema(many=True)
        material_result = material_schema.dump(material_list)

        #Gets Kit

    return jsonify({"requisicoes_data": result})'''

# Get all kits names
@app.route("/getkitsnames", methods=["GET", "POST"])
def get_kits_names():
    kits_list = Kit_Material.query.filter_by().all()
    material_schema = MaterialSchema(many=True)
    result = material_schema.dump(kits_list)

    return jsonify({"kits_names": result})

# Get kits by name
@app.route("/getkitsbyname", methods=["GET", "POST"])
def get_kits_by_name():

    # search kit by name
    if request.args.get("search_type") == "nome_kit":
        kits_by_name = Kit.query.filter(
            Kit.nome.contains(request.args.get("search"))).all()
        kit_list_by_name = []
        for kit in kits_by_name:
            mats_in_kit = Kit_Material.query.filter_by(id_kit=kit.id).all()
            kit_list_by_name.append(mats_in_kit)

        kit_list = []
        for mats in kit_list_by_name:
            mat_list = []
            kit_info = Kit.query.filter_by(id=mats[0].id_kit).first()
            for mat in mats:
                # gets material info
                mat_info = Material.query.filter_by(id=mat.id_material).first()
                # gets kit info
                #kit_info = Kit.query.filter_by(id=mat.id_kit).first()
                # add material to kit list
                mat_list.append({
                    "id": mat.id,
                    "nome_material": mat_info.nome,
                    "quantidade": mat.quantidade,
                })

            # adds info to the final list to send to front end
            kit_list.append({
                "id": mat.id,
                "nome_kit": kit_info.nome,
                "materiais": mat_list,
                "observacao": kit_info.observacao
            })

        return jsonify({
            "mat_list": kit_list
        })

    # search kit by material
    if request.args.get("search_type") == "nome_material":
        #kits_by_material = Kit_Material.query.filter(Kit_Material.material.has(Material.nome.contains(request.args.get("search")))).all()
        kits_by_material = Kit.query.filter(
            Kit.kit_material.any(
                Kit_Material.material.has(
                    Material.nome.contains(request.args.get("search"))
                )
            )
        ).all()

        kit_list_by_name = []
        for kit in kits_by_material:
            mats_in_kit = Kit_Material.query.filter_by(id_kit=kit.id).all()
            kit_list_by_name.append(mats_in_kit)

        kit_list = []
        for mats in kit_list_by_name:
            mat_list = []
            kit_info = Kit.query.filter_by(id=mats[0].id_kit).first()
            for mat in mats:
                # gets material info
                mat_info = Material.query.filter_by(id=mat.id_material).first()
                # gets kit info
                # add material to kit list
                mat_list.append({
                    "id": mat.id,
                    "nome_material": mat_info.nome,
                    "quantidade": mat.quantidade,
                })

            # adds info to the final list to send to front end
            kit_list.append({
                "id": mat.id,
                "nome_kit": kit_info.nome,
                "materiais": mat_list,
                "observacao": kit_info.observacao
            })

        #print("\n\n FINAL ANTES DO FRONTEND => ", kit_list)
        return jsonify({
            "mat_list": kit_list
        })


# Get all kits
@app.route("/getkits", methods=["GET", "POST"])
def get_kits():
    # Get Kit Data
    kits_material_list = Kit_Material.query.all()
    kit_material_schema = Kit_MaterialSchema(many=True)
    result_kit_material = kit_material_schema.dump(kits_material_list)

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
