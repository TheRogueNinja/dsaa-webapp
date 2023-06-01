# Pull the official base image
FROM node:19.7.0
# Set working directory
WORKDIR /crisp-frontend

# Add `/forecast-ui/node_modules/.bin` to $PATH
ENV PATH node_modules/.bin:$PATH

# Install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --legacy-peer-deps

# Clone app files to image
COPY . .

RUN chown -R root /crisp-frontend/node_modules
USER root

# Start app
CMD ["npm", "start"]