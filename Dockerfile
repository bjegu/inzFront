# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY /dist/inz2 /usr/share/nginx/html

#COPY ./default.conf /etc/nginx/conf.d/default.conf

# expose port 8081
EXPOSE 8081

# run nginx
COPY nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

#COPY docker-entrypoint.sh /
#ENTRYPOINT ["/docker-entrypoint.sh"]
#CMD ["nginx", "-g", "daemon off;"]
#CMD  sh -c "envsubst '$${API_HOST} $${API_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"