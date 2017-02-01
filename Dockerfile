FROM ruby:2.3.1-slim

RUN apt-get update -qq  \
&& apt-get install -y build-essential libpq-dev nodejs \
&& apt-get install -y sqlite3 libsqlite3-dev \
&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Gemfile /app/
COPY Gemfile.lock /app/

RUN bundle install -j4
