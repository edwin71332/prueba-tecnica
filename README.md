# Prueba

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.9.

 1. Requisitos previos
Node.js: Se recomienda la versión 20 o superior.  

2. Instalación de dependencias
Clona el repositorio o descarga la carpeta del proyecto y, desde la raíz, ejecuta el siguiente comando para instalar todas las librerías necesarias:  

npm install

3. Ejecución del servidor de desarrollo
Una vez finalizada la instalación, inicia el servidor local con el script de Angular:  

ng serve

4. Acceso a la aplicación
Abre tu navegador y navega a la siguiente dirección:  

http://localhost:4200/

La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.


La creación y actualización de registros utiliza new Date() para que la creacion de las fechas fuera mas consistente
con con el momento real de la acción.

Se implementaron formularios reactivos con controles estrictamente tipados (FormControl<string>) y 
la propiedad nonNullable: true para asegurar la integridad de los datos.

se reutiliza el componente del formulario para seguir el principio DRY