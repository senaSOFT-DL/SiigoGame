#Bajamos la imagen si no exite
FROM node:16.13.2-alpine
#Creamos el dir
WORKDIR /siigoGame
#Copiamos las depencencias y las pasamos al directorio
COPY ./package.json .
#Instalamos dependencias
RUN npm i 
#Descargamos depencencias 
COPY . . 
#Exponemos el puerto por el cual se va a compartir 
EXPOSE 3002
#Ejecutamos CMD en terminal
CMD ["npm","run","dev"]