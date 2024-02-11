from backend import create_app
from .models import *
from datetime import datetime, timedelta  
from flask_restful import Api
from .views import *

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

api = Api(app)
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<int:task_id>')