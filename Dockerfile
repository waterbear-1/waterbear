FROM    node
MAINTAINER      Zuaa    zuaa@163.com
RUN mkdir /home/zuaa
RUN cd /home/zuaa
RUN git clone https://github.com/waterbear-1/waterbear.git  /home/zuaa
RUN dir  /home/zuaa
RUN cd /home/zuaa ;npm install
EXPOSE  18080
CMD ["node", "/home/zuaa/server.js"]

