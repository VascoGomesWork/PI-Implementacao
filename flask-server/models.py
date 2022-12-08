from uuid import uuid4
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()


def get_uuid():
    return uuid4().hex

# TABLES
# User Table
class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    nome = db.Column(db.String(345), unique=True)
    email = db.Column(db.String(345), unique=True)
    telefone = db.Column(db.String(345), unique=True)
    tipo_utilizador = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text(), nullable=False)

class UsersSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

# Material Table
class Material(db.Model):
    __tablename__ = "material"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    nome = db.Column(db.String(345), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    observacao = db.Column(db.String(345), nullable=False)
    data = db.Column(db.DateTime, nullable=False)
    # FK Tipo Material
    id_tipo_material = db.Column(db.Integer, db.ForeignKey('tipo_material.id'))
    #tipo_material = db.relationship('Tipo_Material', backref='material')
    # FK Kit Material
    id_kit_material = db.Column(db.Integer, db.ForeignKey('kit_material.id'))
    #kit_material = db.relationship('Kit_Material', backref='material')
    # FK Projeto
    id_projeto = db.Column(db.Integer, db.ForeignKey('projeto.id'))
    #projeto = db.relationship('Projeto', backref='material')

class MaterialSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Material

# Projeto Table
class Projeto(db.Model):
    __tablename__ = "projeto"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    nome = db.Column(db.String(345), nullable=False)
    observacoes = db.Column(db.String(345), nullable=False)
    data_inicio = db.Column(db.DateTime, nullable=False)
    data_fim = db.Column(db.DateTime, nullable=False)
    materials = db.relationship('Material', backref='projeto')

class ProjetoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Projeto

# Tipo Material Table
class Tipo_Material(db.Model):
    __tablename__ = "tipo_material"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    tipo = db.Column(db.String(345))
    materials = db.relationship('Material', backref='tipo_material')

class Tipo_MaterialSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tipo_Material

# Kit_Material Table
class Kit_Material(db.Model):
    __tablename__ = "kit_material"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    nome = db.Column(db.String(345), nullable=False)
    observacao = db.Column(db.String(345), nullable=False)
    materials = db.relationship('Material', backref='kit_material')

class Kit_MaterialSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Kit_Material

# Requisitar_Devolver Table
class Requisitar_Devolver(db.Model):
    __tablename__ = "requisitar_devolver"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    nome_pessoa_requisitar = db.Column(db.String(345), nullable=False)
    boolean_projeto = db.Column(db.Boolean, nullable=False)
    nome_projeto = db.Column(db.String(345), nullable=False)
    esta_requisitado = db.Column(db.Boolean, nullable=False)
    esta_devolvido = db.Column(db.Boolean, nullable=False)
    quantidade_requisitada = db.Column(db.Integer, nullable=False)
    data_requisicao = db.Column(db.DateTime, nullable=False)
    data_devolucao_prevista = db.Column(db.DateTime, nullable=False)
    data_devolucao_real = db.Column(db.DateTime, nullable=False)
    # FK User
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='user')
    # FK Material
    id_material = db.Column(db.Integer, db.ForeignKey('material.id'))
    material = db.relationship('Material', backref='material')
    # FK Kit Material
    id_kit_material = db.Column(db.Integer, db.ForeignKey('kit_material.id'))
    kit = db.relationship('Kit_Material', backref='kit_material')

class Requisitar_DevolverSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Requisitar_Devolver
