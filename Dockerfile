FROM python:3.12-alpine
WORKDIR /app

RUN pip install --upgrade pip && \
    pip install commentjson flask requests \
                Flask-Caching

CMD ["flask", "run", "--host=0.0.0.0"]