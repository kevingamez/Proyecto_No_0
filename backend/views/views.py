from sqlite3 import IntegrityError
from flask_restful import Resource
from ..models import *
from flask import request
from flask_jwt_extended import jwt_required, create_access_token
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from datetime import datetime


taskSchema = TaskSchema()
categorySchema = CategorySchema()
userSchema = UserSchema()

class TaskListResource(Resource):
    def get(self):
        return [taskSchema.dump(task) for task in Task.query.all()]
    
    def post(self):
        creation_date_str = request.json['creationDate']
        deadline_str = request.json['deadline']
  
        creation_date = datetime.strptime(creation_date_str, "%Y-%m-%dT%H:%M:%S")
        deadline = datetime.strptime(deadline_str, "%Y-%m-%dT%H:%M:%S")
        new_task = Task(
            text=request.json['text'],
            creationDate=creation_date,
            deadline=deadline,
            status=request.json['status'],
            user=request.json['user'],
            Category=request.json['Category']
        )
        db.session.add(new_task)
        db.session.commit()
        return taskSchema.dump(new_task), 201
    
class TaskResource(Resource):
    @jwt_required()
    def get(self, task_id):
        return taskSchema.dump(Task.query.get_or_404(task_id))
    @jwt_required()
    def put(self, task_id):
        task = Task.query.get_or_404(task_id)
        task.text = request.json.get('text', task.text)
        task.creationDate = request.json.get('creationDate', task.creationDate)
        task.deadline = request.json.get('deadline', task.deadline)
        task.status = request.json.get('status', task.status)
        task.user = request.json.get('user', task.user)
        task.Category = request.json.get('Category', task.Category)
        db.session.add(task)

        try: 
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return {"message": "Task already exists"}, 400
        return taskSchema.dump(task)
    @jwt_required()
    def delete(self, task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return 'Success', 204
    
class CategoryListResource(Resource):
    @jwt_required()
    def get(self):
        return [categorySchema.dump(category) for category in Category.query.all()]
    @jwt_required()
    def post(self):
        new_category = Category(name=request.json['name'], description=request.json['description'])
        db.session.add(new_category)
        db.session.commit()
        return categorySchema.dump(new_category), 201
    
class CategoryResource(Resource):
    @jwt_required()
    def get(self, category_id):
        return categorySchema.dump(Category.query.get_or_404(category_id))
    
    @jwt_required()
    def put(self, category_id):
        category = Category.query.get_or_404(category_id)
        category.name = request.json.get('name', category.name)
        category.description = request.json.get('description', category.description)
        db.session.add(category)
        db.session.commit()
        return categorySchema.dump(category)
    
    @jwt_required()
    def delete(self, category_id):
        category = Category.query.get_or_404(category_id)
        db.session.delete(category)
        db.session.commit()
        return 'Success', 204
    
class LoginResource(Resource):
    def post(self):
        # Buscar el usuario por email
        user = User.query.filter_by(email=request.json['email']).first()
        if user and check_password_hash(user.password, request.json['password']):
            access_token = create_access_token(identity=user.user_id)
            return {'Message': "Login successful", "access_token": access_token, 'user_id': user.user_id}, 200
        else:
            return {'Message': "Invalid email or password"}, 401
    
class RegisterResource(Resource):
    def post(self):
        hashed_password = generate_password_hash(request.json['password'])
        new_user = User(name=request.json['name'], email=request.json['email'], password=hashed_password, profileImage=request.json['profileImage'])

        access_token = create_access_token(identity=new_user.user_id)
        db.session.add(new_user)
        db.session.commit()
        return {'Message': "User created successfully", "access_token":access_token, 'user_id':userSchema.dump(new_user)['user_id']}, 201
    
    def put(self):
        user = User.query.get_or_404(request.json['user_id'])
        user.name = request.json.get('name', user.name)
        user.email = request.json.get('email', user.email)
        user.password = request.json.get('password', user.password)
        user.profileImage = request.json.get('profileImage', user.profileImage)
        db.session.add(user)
        db.session.commit()
        return userSchema.dump(user)
    
class UserListResource(Resource):
    def get(self):
        return [userSchema.dump(user) for user in User.query.all()]


class UserResource(Resource):
    @jwt_required()
    def get(self, user_id):
        return userSchema.dump(User.query.get_or_404(user_id))
    
    @jwt_required()
    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        user.name = request.json.get('name', user.name)
        user.email = request.json.get('email', user.email)
        user.password = request.json.get('password', user.password)
        user.profileImage = request.json.get('profileImage', user.profileImage)
        db.session.add(user)
        db.session.commit()
        return userSchema.dump(user)
    
    @jwt_required()
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return 'Success', 204