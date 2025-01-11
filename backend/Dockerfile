FROM python:3.12

RUN mkdir CareCompanion

WORKDIR /CareCompanion/

RUN pip install pipenv

COPY ../Pipfile ../Pipfile.lock ./

RUN mkdir backend

COPY backend/ backend/

WORKDIR /CareCompanion/backend/

RUN pipenv install --ignore-pipfile

EXPOSE 8000

CMD ["pipenv", "run", "sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]