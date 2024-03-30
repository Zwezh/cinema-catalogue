#!/bin/bash

# go to the dist/yourProjectName folder
cd ./dist

# make a new directory named 'css' (you can name it anything)
mkdir css

# run PurgeCSS & make a new '.css' file inside the 'css' directory
#purgecss --css ./styles-7FE3XJNF.css --content ./index.html ./*.js ./css/
purgecss --css ./styles-*.css --content ./index.html ./*.js --output ./

# replace the 'dist/yourProjectName/styles.css' file with the 'dist/yourProjectName/css/styles.css' file
#mv ./css/styles.css ./styles-7FE3XJNF.css

# delete the previously created 'css' directory
#rm -r css
