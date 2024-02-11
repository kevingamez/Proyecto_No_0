from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields

db = SQLAlchemy()

class StatusEnum(Enum):
    NOT_STARTED = 'Not Started'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'
    
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(128), nullable=False)
    creationDate = db.Column(db.DateTime, default=db.func.current_timestamp())
    deadline = db.Column(db.DateTime, default=False) 
    status = db.Column(db.Enum(StatusEnum))
    user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    Category = db.Column(db.Integer, db.ForeignKey('category.id'))
    __table_args__ = (db.UniqueConstraint('text', 'user', name='unique_task'),)

    def __repr__(self):
        return f'<Task {self.text}>'
    
    
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False) 
    taskList = db.relationship('Task',cascade='all, delete, delete-orphan')


    def __repr__(self):
        return f'<Category {self.name}>'
    
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    profileImage = db.Column(db.String(100), nullable=False)
    taskList = db.relationship('Task',cascade='all, delete, delete-orphan')

    def __repr__(self):
        return f'<User {self.name}>'
    
    
class EnumToDict(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        print(value)
        return {'key': value.name, 'value': value.value}
    
class TaskSchema(SQLAlchemyAutoSchema):
    status = EnumToDict(attribute=("status"))
    class Meta:
        model = Task
        include_relationships = True
        load_instance = True
        
class CategorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        include_relationships = True
        load_instance = True
        
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True