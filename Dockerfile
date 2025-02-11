FROM python:3.12-alpine
WORKDIR /app

COPY . /app

RUN apk add git && \
    pip install --upgrade pip && \
    pip install commentjson flask requests \
                Flask-Caching

CMD ["flask", "run", "--host=0.0.0.0"]