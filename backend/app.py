
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory database for embeddings
embeddings_db = {}
next_id = 1

@app.route('/embed', methods=['POST'])
def embed():
    global next_id
    data = request.json
    text = data.get('text')
    if not text:
        return jsonify({'error': 'Text is required'}), 400

    # Mock embedding generation
    embedding = np.random.rand(1, 10).tolist()
    
    # Store the embedding
    embeddings_db[next_id] = {'text': text, 'embedding': embedding}
    response = {
        'id': next_id,
        'embedding': embedding
    }
    next_id += 1
    
    return jsonify(response)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Query is required'}), 400

    # Mock search logic
    results = []
    for id, data in embeddings_db.items():
        # A real implementation would use vector similarity search
        if query.lower() in data['text'].lower():
            results.append({'id': id, 'text': data['text'], 'score': np.random.rand()})
            
    return jsonify(results)

@app.route('/embeddings', methods=['GET'])
def get_embeddings():
    return jsonify(embeddings_db)

if __name__ == '__main__':
    app.run(debug=True)
