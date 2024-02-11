from flask_restful import Resource
from ..models import *
from flask import request

taskSchema = TaskSchema()
categorySchema = CategorySchema()
userSchema = UserSchema()

class TaskListResource(Resource):
    def get(self):
        return [taskSchema.dump(task) for task in Task.query.all()]
    
    def post(self):
        new_task = Task(text=request.json['text'], creationDate=request.json['creationDate'], deadline=request.json['deadline'], status=request.json['status']['value'], user=request.json['user'], Category=request.json['Category'])
        db.session.add(new_task)
        db.session.commit()
        return taskSchema.dump(new_task), 201
    
class TaskResource(Resource):
    def get(self, task_id):
        return taskSchema.dump(Task.query.get_or_404(task_id))
    
    def put(self, task_id):
        task = Task.query.get_or_404(task_id)
        task.text = request.json.get('text', task.text)
        task.creationDate = request.json.get('creationDate', task.creationDate)
        task.deadline = request.json.get('deadline', task.deadline)
        task.status = request.json.get('status', task.status)
        task.user = request.json.get('user', task.user)
        task.Category = request.json.get('Category', task.Category)
        db.session.add(task)
        db.session.commit()
        return taskSchema.dump(task)
    
    def delete(self, task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return 'Success', 204
    
class CategoryListResource(Resource):
    def get(self):
        return [categorySchema.dump(category) for category in Category.query.all()]
    
    def post(self):
        new_category = Category(name=request.json['name'], description=request.json['description'])
        db.session.add(new_category)
        db.session.commit()
        return categorySchema.dump(new_category), 201
    
class CategoryResource(Resource):
    def get(self, category_id):
        return categorySchema.dump(Category.query.get_or_404(category_id))
    
    def put(self, category_id):
        category = Category.query.get_or_404(category_id)
        category.name = request.json.get('name', category.name)
        category.description = request.json.get('description', category.description)
        db.session.add(category)
        db.session.commit()
        return categorySchema.dump(category)
    
    def delete(self, category_id):
        category = Category.query.get_or_404(category_id)
        db.session.delete(category)
        db.session.commit()
        return 'Success', 204
    
class UserListResource(Resource):
    def get(self):
        return [userSchema.dump(user) for user in User.query.all()]
    
    def post(self):
        new_user = User(name=request.json['name'], email=request.json['email'], password=request.json['password'], profileImage=request.json['profileImage'])
        db.session.add(new_user)
        db.session.commit()
        return userSchema.dump(new_user), 201
    
class UserResource(Resource):
    def get(self, user_id):
        return userSchema.dump(User.query.get_or_404(user_id))
    
    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        user.name = request.json.get('name', user.name)
        user.email = request.json.get('email', user.email)
        user.password = request.json.get('password', user.password)
        user.profileImage = request.json.get('profileImage', user.profileImage)
        db.session.add(user)
        db.session.commit()
        return userSchema.dump(user)
    
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return 'Success', 204