FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 6000

CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]


