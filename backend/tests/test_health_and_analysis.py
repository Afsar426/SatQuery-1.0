from fastapi import HTTPException
from backend.app.models.loader import model_loader
from backend.app.services.analysis_service import AnalysisService

def test_model_config_loaded():
    config = model_loader.load_config()
    assert config is not None
    assert "model_path" in config
    assert config["model_path"] == "OpenGVLab/InternVL2_5-2B"
    assert config["image_size"] == 448

def test_model_unloaded_raises_503_no_mock():
    # When model is not loaded, verify HTTP 503 is returned with exact instructions
    model_loader.is_loaded = False
    model_loader.load_error = "Model weights not found."
    
    import asyncio
    
    with open("photo.jpg", "rb") as f:
        real_image_bytes = f.read()
    
    try:
        asyncio.run(AnalysisService.process_analysis(real_image_bytes, "photo.jpg", "What is this?"))
        assert False, "Should have raised 503 when model is not loaded"
    except HTTPException as e:
        assert e.status_code == 503
        assert "Model is not loaded" in e.detail
        assert "OpenGVLab/InternVL2_5-2B" in e.detail

if __name__ == "__main__":
    test_model_config_loaded()
    test_model_unloaded_raises_503_no_mock()
    print("All health & analysis tests passed! ✅")
