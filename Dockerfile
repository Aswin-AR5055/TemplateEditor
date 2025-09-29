FROM python:3.11-slim

WORKDIR /app


COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . /app/

RUN python manage.py collectstatic --noinput


RUN mkdir certs && \
    openssl req -x509 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/CN=localhost"


EXPOSE 5000


CMD ["daphne", "-e", "ssl:5000:privateKey=/app/certs/key.pem:certKey=/app/certs/cert.pem", "-p", "5000", "-w", "1", "TemplateEditor.asgi:application"]