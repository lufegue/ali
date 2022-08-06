# Proyecto base

1. Crea la carpeta con el comando `sails new`

2. Crea las rutas

```Javascript
  '/': {
    view: 'pages/inicio'
  },

  '/acerca-de': {
    view: 'pages/acerca_de'
  },
```

3. Crea las vista en la carpeta views/pages

4. Recuerda usar archivos separados para las subvistas

5. Configura la base de datos

```Javascript
  adapter: require('sails-postgresql'),
  url: 'postgresql://user:pass@localhost:5432/ali',
```

