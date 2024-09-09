FROM python:3.12
WORKDIR /app

RUN apt-get install git && \
    git clone https://github.com/ihatespawn/instances .

RUN pip install --upgrade pip && \
    pip install commentjson flask requests \
                Flask-Caching

CMD ["flask", "run", "--host=0.0.0.0"]