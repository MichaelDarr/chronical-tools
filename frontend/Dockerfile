FROM node:12.16-buster

RUN wget https://golang.org/dl/go1.14.4.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.14.4.linux-amd64.tar.gz \
    && rm go1.14.4.linux-amd64.tar.gz
ENV PATH $PATH:/usr/local/go/bin

# bake entrypoint into the image
COPY entrypoint.sh /usr/local/bin/

# set default entrypoint and run npm's "start" command by default
ENTRYPOINT [ "entrypoint.sh" ]
CMD [ "npm", "start" ]
