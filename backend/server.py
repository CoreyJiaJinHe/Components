from fastapi import FastAPI, Response

app = FastAPI()


@app.get('/')
def root():
    return {
        'message': 'Components backend is running.',
        'health': '/api/health',
        'docs': '/docs',
    }


@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    return Response(status_code=204)

@app.get('/api/health')
def health():
    return {'status': 'ok'}
