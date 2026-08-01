FROM nginx:alpine

ARG PORT=8004
ENV PORT=${PORT}

COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
RUN chmod 644 /usr/share/nginx/html/index.html
EXPOSE ${PORT}
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
