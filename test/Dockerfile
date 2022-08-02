FROM harbor.i.wxblockchain.com/acd/frontend:prod-base
WORKDIR /root
COPY . .
RUN yarn install && yarn build

FROM openresty/openresty:1.15.8.3-2-buster-nosse42
COPY --from=0 /root/build /usr/local/openresty/build
