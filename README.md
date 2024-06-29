# Three-Tier Flask Application Example

### Tiers:
  - Frontend: `./frontend/` A React application that runs in the browser, retrieving data from the backend, and showing a chart with that data.
  - Backend: `./app.py` A Flask application that runs as a server. Has two endpoints:
    - `/`: the homepage, a dashboard that serves the React application to the browser.
    - `/api/data`: the data, in JSON format.
  - Database: Postgres. Not used yet. The Backend currently returns hard-coded data.

### Getting Started

Make sure you have the following pre-installed:

```
Node.JS
Python
```

Read the `./.tool-versions` file for known-good working versions of these dependencies.

Recommended: https://github.com/asdf-vm/asdf

Run:

```
npm install
python -m ensurepip
python -m pip install -U pip uv
npm run pip:install
```

### Development

Run each command in a separate CLI tab:
```
npm run start:watch
npm run webpack:watch
```

The app will now be running on:
```
http://localhost:8080
```