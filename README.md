# Framevuerk Builder

## How to Use
Framevuerk can have different configs, direction, and colors based on the user's taste. To setup your custom version, you should install **framevuerk-builder** package on your project (next to **framevuerk** package).

```terminal
npm i framevuerk-builder -D
```

And your config or list of configs array in `.json` file. (Also you can deliver same content via `.js` file and `module.exports` format)


```json
{
    "config-name": "foobar",
    "direction": "ltr",
    "primary-color": "#41b883",
    "secondary-color": "#35485d",
    "danger-color": "#dd4b39",
    "warning-color": "#ef8f00",
    "info-color": "#14b0cf",
    "bg-color": "#fff",
    "header-bg-color": "#35485d",
    "sidebar-bg-color": "#3a3a3a",
    "footer-bg-color": "#3a3a3a",
    "padding": "1em",
    "transition-speed": "0.35s",
    "border-radius": "2px",
    "shadow-size": "1px"
}
```

Finally you can build framevuerk by this cli command. Don't forgot to put your builder command to your `build` or `postinstall` scripts. Note that use **./node_modules/.bin/framevuerk-builder** instead of **framevuerk-builder** if you run this command manually in terminal

```terminal
framevuerk-builder -d "path/to/framevuerk/source/dir" -o "path/to/receive/builded/files" -c "path/to/config/file"

# --dir, -d         path to framevuerk source folder. default: "./node_modules/framevuerk"
# --output-dir, -o  path to output files. default: "./node_modules/framevuerk/dist"
# --config, -c      path to config file. used default config if not set.
```

And output files goes to *--output-dir* directory:

- framevuerk-foobar.js
- framevuerk-foobar.min.js
- framevuerk-foobar.css
- framevuerk-foobar.min.css
    
You are now config your app to use `Framevuerk`!

