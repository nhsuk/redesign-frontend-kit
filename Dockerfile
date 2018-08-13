FROM node:8

# Copy source code
COPY . /code

# Change working directory
WORKDIR /code

# Install dependencies
RUN npm install

# Expose port to the outside
EXPOSE 3000

# Launch application
CMD [ "node", "app.js" ]
