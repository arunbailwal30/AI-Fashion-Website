from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Fashion Try-On API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/try-on/realtime")
async def start_realtime_try_on(
    dress_name: str = Form(...),
    size: str = Form("M"),
) -> dict[str, str]:
    session_id = str(uuid4())
    return {
        "session_id": session_id,
        "dress_name": dress_name,
        "size": size,
        "message": "Realtime try-on session initialized.",
    }


@app.post("/api/try-on/upload")
async def generate_try_on_image(
    user_image: UploadFile = File(...),
    dress_image: UploadFile = File(...),
) -> dict[str, str]:
    output_name = f"try-on-{uuid4()}.png"
    return {
        "message": "Try-on image request accepted.",
        "user_image_name": user_image.filename or "user-image",
        "dress_image_name": dress_image.filename or "dress-image",
        "generated_image_url": f"/generated/{output_name}",
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
