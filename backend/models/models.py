from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class StatusEnum(db.Enum):
    NOT_STARTED = 'Not Started'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'
    
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(128), nullable=False)
    creationDate = db.Column(db.DateTime, default=db.func.current_timestamp())
    deadline = db.Column(db.Boolean, default=False)
    status = db.Column(db.Enum(StatusEnum), default=StatusEnum.NOT_STARTED)
    user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    Category = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    __table_args__ = (db.UniqueConstraint('text', 'user', name='unique_task'),)

    def __repr__(self):
        return f'<Task {self.title}>'
    
    
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
        return f'<User {self.username}>'