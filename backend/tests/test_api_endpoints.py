from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.config import settings

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "model_loaded" in data
    assert data["config_loaded"] is True
    assert data["model"] == "OpenGVLab/InternVL2_5-2B"
    assert data["upload_limit_mb"] == 100
    print("Health check endpoint passed: ", data)

def test_analyze_empty_file():
    response = client.post(
        "/api/analyze",
        data={"query": "Describe this image."}
    )
    assert response.status_code == 400
    assert "No image file provided" in response.json()["detail"]
    print("Empty file rejection passed ✅")

def test_analyze_empty_query():
    with open("photo.jpg", "rb") as f:
        response = client.post(
            "/api/analyze",
            files={"image": ("photo.jpg", f, "image/jpeg")},
            data={"query": ""}
        )
    assert response.status_code == 400
    assert "No question provided" in response.json()["detail"]
    print("Empty query rejection passed ✅")

def test_analyze_file_size_exceeded():
    oversized = b"0" * (101 * 1024 * 1024)
    response = client.post(
        "/api/analyze",
        files={"image": ("oversized.jpg", oversized, "image/jpeg")},
        data={"query": "Analyze this."}
    )
    assert response.status_code == 413
    assert "File size exceeds the 100 MB limit." in response.json()["detail"]
    print("100 MB size limit enforcement passed ✅")

def test_analyze_model_unloaded_503_no_mock():
    # Model is not yet loaded in environment -> MUST return 503, NO MOCK AI
    with open("photo.jpg", "rb") as f:
        response = client.post(
            "/api/analyze",
            files={"image": ("photo.jpg", f, "image/jpeg")},
            data={"query": "How many people are visible in this photo?"}
        )
    assert response.status_code == 503
    assert "Model is not loaded" in response.json()["detail"]
    print("Model unloaded 503 response (NO MOCK AI) passed ✅")

if __name__ == "__main__":
    test_health_endpoint()
    test_analyze_empty_file()
    test_analyze_empty_query()
    test_analyze_file_size_exceeded()
    test_analyze_model_unloaded_503_no_mock()
    print("\nAll API Endpoint integration tests passed with 100% compliance! 🚀")
