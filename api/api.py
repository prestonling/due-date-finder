import os, time
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadfile', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
        if file and allowed_file(file.filename):
            dirname = os.path.dirname(__file__)
            filename = secure_filename(file.filename)
            file.save(os.path.join(dirname, app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('download_file', name=filename))
@app.route('/download/<name>', methods=['GET'])
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)
