import io
from fastapi import HTTPException, UploadFile, status
from PIL import Image
from ..core.config import settings
from ..core.logging import logger

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".tif", ".tiff"}
SUPPORTED_FORMATS = {"JPEG", "PNG", "TIFF", "MPO"}

class ImageService:
    @staticmethod
    def validate_file_size(content: bytes, filename: str = "upload"):
        """
        Enforces the strict 100 MB file size upload limit.
        Returns HTTP 413 if the payload exceeds 100 MB.
        """
        size = len(content)
        if size > settings.MAX_UPLOAD_SIZE_BYTES:
            logger.warning(
                f"File '{filename}' ({size / (1024 * 1024):.1f} MB) exceeds "
                f"the {settings.MAX_UPLOAD_SIZE_MB} MB limit."
            )
            raise HTTPException(
                status_code=status.HTTP_413_CONTENT_TOO_LARGE,
                detail="File size exceeds the 100 MB limit."
            )

    @staticmethod
    def validate_and_open_image(content: bytes, filename: str = "upload") -> Image.Image:
        """
        Verifies that the file content represents a valid, uncorrupted image.
        Supports JPG, JPEG, PNG, and TIFF formats.
        """
        if not content:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty."
            )

        try:
            image = Image.open(io.BytesIO(content))
            image.verify()  # Verify integrity
            
            # Reopen after verify()
            image = Image.open(io.BytesIO(content))
            
            if image.format not in SUPPORTED_FORMATS:
                raise HTTPException(
                    status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                    detail=f"Unsupported image format: {image.format}. Supported formats are JPG, JPEG, PNG, and TIFF."
                )
            
            return image
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Failed to open image '{filename}': {e}")
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail="The uploaded file is not a valid or readable image."
            )
