# chat
Web app for chatting with Eve



## Build Instructions
1. From the root directory, delete the docs/ directory.
2. From the chat/ directory, `ng build --prod --output-path docs --base-href /chat/`
3. Step 2 generates chat/docs/ directory. `cp docs/ -r ..; rm docs -r`
4. `cd ../docs; cp index.html 404.html`
