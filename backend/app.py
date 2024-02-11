from backend import create_app
from .models import *
from datetime import datetime, timedelta  

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

with app.app_context():
    t = Task(
    text="Finish the report",
    deadline=datetime.utcnow() + timedelta(days=7), 
    status=StatusEnum.NOT_STARTED, 
    user=1,
)
    t2 =  Task(
    text="Finishasd the report",
    deadline=datetime.utcnow() + timedelta(days=7), 
    status=StatusEnum.NOT_STARTED, 
    user=1,
)
    db.session.add(t)
    db.session.add(t2)
    db.session.commit()
    print([TaskSchema().dump(task) for task in Task.query.all()])