from fastapi import HTTPException
from backend.app.services.image_service import ImageService
from backend.app.services.query_service import QueryService
from backend.app.core.config import settings

def test_100mb_limit_exceeded():
    # 101 MB payload
    oversized_bytes = b"x" * (101 * 1024 * 1024)
    try:
        ImageService.validate_file_size(oversized_bytes, "large.jpg")
        assert False, "Should have raised HTTPException 413"
    except HTTPException as e:
        assert e.status_code == 413
        assert e.detail == "File size exceeds the 100 MB limit."

def test_100mb_limit_allowed():
    # 5 MB payload
    valid_bytes = b"x" * (5 * 1024 * 1024)
    # Should not raise
    ImageService.validate_file_size(valid_bytes, "valid.jpg")

def test_empty_query():
    try:
        QueryService.validate_query("")
        assert False, "Should have raised HTTPException 400"
    except HTTPException as e:
        assert e.status_code == 400
        assert "question" in e.detail

def test_multilingual_queries():
    # Hindi
    hindi = "इस इमेज में क्या दिख रहा है?"
    assert QueryService.validate_query(hindi) == hindi
    # Hinglish
    hinglish = "Is image me kitne buildings hain?"
    assert QueryService.validate_query(hinglish) == hinglish
    # English
    english = "Identify water bodies and coastlines."
    assert QueryService.validate_query(english) == english

if __name__ == "__main__":
    test_100mb_limit_exceeded()
    test_100mb_limit_allowed()
    test_empty_query()
    test_multilingual_queries()
    print("All validation tests passed! ✅")
