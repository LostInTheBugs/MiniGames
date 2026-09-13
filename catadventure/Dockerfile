FROM nginx:alpine

ARG PORT=8004
ENV PORT=${PORT}

COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
RUN chmod 644 /usr/share/nginx/html/index.html

# Generate version.json from VERSION file (build-time)
COPY VERSION /tmp/VERSION
RUN printf '{"version":"%s"}\n' "$(cat /tmp/VERSION)" > /usr/share/nginx/html/version.json

EXPOSE ${PORT}
# Runtime: inject PORT into nginx config + regenerate version.json from VERSION file
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && printf '{\"version\":\"%s\"}\\n' \"$(cat /tmp/VERSION)\" > /usr/share/nginx/html/version.json && nginx -g 'daemon off;'"]
