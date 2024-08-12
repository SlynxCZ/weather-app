FROM ubuntu:latest
LABEL authors="michalprikryl"

ENTRYPOINT ["top", "-b"]