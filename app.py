from time import strftime
from flask import Flask, jsonify, request, render_template, send_from_directory
import logging


logger = logging.getLogger("waitress")
logger.setLevel(logging.INFO)

app = Flask(__name__)


@app.route("/")
def dashboard():
    return render_template("dashboard.html.j2")


@app.route("/api/data")
def api_data():
    return jsonify(
        {
            "results": [
                {"id": "1", "value": 4},
                {"id": "2", "value": 7},
                {"id": "3", "value": 4},
                {"id": "4", "value": 1},
            ]
        }
    )


@app.route("/static/<path:path>")
def send_report(path):
    return send_from_directory("static", path)


# This logs each request made to the server
@app.after_request
def after_request(response):
    timestamp = strftime("[%Y-%b-%d %H:%M]")
    logger.info(
        "%s %s %s %s %s %s",
        timestamp,
        request.remote_addr,
        request.method,
        request.scheme,
        request.full_path,
        response.status,
    )
    return response


if __name__ == "__main__":
    from waitress import serve

    serve(app, host="0.0.0.0", port=8080)
