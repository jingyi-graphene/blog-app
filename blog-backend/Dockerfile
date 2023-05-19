FROM python:3.9-slim
COPY ./blog /app/blog
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
EXPOSE 8000
CMD [ "uvicorn", "blog.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]