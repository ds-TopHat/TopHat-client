import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import {
  FaPen,
  FaEraser,
  FaRegImage,
  FaRegWindowClose,
  FaSave,
} from 'react-icons/fa';
import * as css from '@pages/simpleWhiteboard/simpleWhiteboard.css';

const SimpleWhiteboard = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const problemAreaRef = useRef<HTMLDivElement | null>(null);

  const [isPenActive, setIsPenActive] = useState(true);
  const [isEraser, setIsEraser] = useState(false);

  const [color, setColor] = useState('#000000');
  const [penSize, setPenSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(30);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const isDrawingActive = isPenActive || isEraser;

  const drawBackground = (canvas: fabric.Canvas) => {
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
  };

  useEffect(() => {
    if (!wrapperRef.current || !problemAreaRef.current) {
      return;
    }

    const currentWrapper = wrapperRef.current;
    const currentProblemArea = problemAreaRef.current;
    const canvasEl = document.createElement('canvas');
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.display = 'block';
    currentWrapper.appendChild(canvasEl);

    const canvas = new fabric.Canvas(canvasEl, {
      selection: false,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      isDrawingMode: isDrawingActive,
    });

    canvas.on('object:added', (e) => {
      const obj = e.target;
      if (obj) {
        obj.set({
          selectable: false,
          evented: false,
        });
        canvas.requestRenderAll();
      }
    });

    const resize = () => {
      if (!canvas || !currentWrapper || !currentProblemArea) {
        return;
      }
      const rect = currentWrapper.getBoundingClientRect();
      canvas.setWidth(Math.floor(rect.width));
      canvas.setHeight(Math.floor(rect.height));
      drawBackground(canvas);
    };
    resize();
    window.addEventListener('resize', resize);

    const brush = new fabric.PencilBrush(canvas);
    brush.width = penSize;
    brush.color = color;
    canvas.freeDrawingBrush = brush;
    canvasRef.current = canvas;

    return () => {
      window.removeEventListener('resize', resize);
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
      if (currentWrapper && currentWrapper.contains(canvasEl)) {
        currentWrapper.removeChild(canvasEl);
      }
      canvasRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const brush = canvas.freeDrawingBrush as fabric.PencilBrush;

    if (isEraser) {
      brush.width = eraserSize;
      brush.color = '#ffffff';
    } else {
      brush.width = penSize;
      brush.color = color;
    }

    canvas.isDrawingMode = isDrawingActive;
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }, [color, penSize, eraserSize, isEraser, isDrawingActive]);

  const togglePenMode = () => {
    if (isPenActive) {
      setIsPenActive(false);
    } else {
      setIsPenActive(true);
      setIsEraser(false);
    }
  };

  const toggleEraserMode = () => {
    if (isEraser) {
      setIsEraser(false);
    } else {
      setIsEraser(true);
      setIsPenActive(false);
    }
  };

  const handleClearDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.clear();
    drawBackground(canvas);
  };

  const handleRemoveImage = () => setUploadedImage(null);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.discardActiveObject();
    canvas.renderAll();

    const dataUrl = canvas.toDataURL({
      format: 'png',
      multiplier: 2,
      left: 0,
      top: 0,
      width: canvas.getWidth(),
      height: canvas.getHeight(),
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'whiteboard-solution.png';
    link.click();
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleAddImage = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const input = e?.target ?? fileInputRef.current;
    const file = input && 'files' in input ? input.files?.[0] : undefined;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setUploadedImage(result);
      }
    };
    reader.readAsDataURL(file);
    if (input) {
      input.value = '';
    }
  };

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        {/* 펜 */}
        <button
          className={css.iconButton}
          style={{
            background: isPenActive ? '#e8f0fe' : '#fff',
            borderColor: isPenActive ? '#2563eb' : '#ddd',
            color: isPenActive ? '#2563eb' : '#111',
          }}
          onClick={togglePenMode}
          title={isPenActive ? '펜 끄기' : '펜 켜기'}
        >
          <FaPen size={18} />
        </button>
        {/* 지우개 */}
        <button
          className={css.iconButton}
          style={{
            background: isEraser ? '#e8f0fe' : '#fff',
            borderColor: isEraser ? '#2563eb' : '#ddd',
            color: isEraser ? '#2563eb' : '#111',
          }}
          onClick={toggleEraserMode}
          title={isEraser ? '지우개 끄기' : '지우개 켜기'}
        >
          <FaEraser size={18} />
        </button>

        {/* 굵기 및 색상 */}
        {isPenActive && (
          <>
            <div className={css.controlGroup}>
              색상
              <input
                className={css.colorInput}
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                title="펜 색상"
              />
            </div>
            <div className={css.controlGroup}>
              펜 두께
              <input
                type="range"
                min={1}
                max={20}
                value={penSize}
                onChange={(e) => setPenSize(Number(e.target.value))}
                title="펜 두께"
                style={{ width: 80 }}
              />
            </div>
          </>
        )}
        {isEraser && (
          <div className={css.controlGroup}>
            지우개 크기
            <input
              type="range"
              min={10}
              max={100}
              value={eraserSize}
              onChange={(e) => setEraserSize(Number(e.target.value))}
              title="지우개 크기"
              style={{ width: 80 }}
            />
          </div>
        )}

        {/* 이미지 삽입/삭제 */}
        <button
          className={css.iconButton}
          onClick={handleUploadClick}
          title="이미지 추가"
        >
          <FaRegImage size={18} />
        </button>
        {uploadedImage && (
          <button
            className={css.iconButton}
            style={{
              color: '#d63342',
              borderColor: '#ffb3c1',
            }}
            onClick={handleRemoveImage}
            title="이미지 삭제"
          >
            <FaRegWindowClose size={18} />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleAddImage}
        />

        {/* 풀이 전체 삭제 (드로잉만) */}
        <button
          className={css.iconButton}
          style={{
            color: '#d63342',
            borderColor: '#ffb3c1',
          }}
          onClick={handleClearDrawing}
          title="풀이 전체 지우기 (드로잉만)"
        >
          <FaEraser size={18} />
        </button>

        <div className={css.spacer} />

        {/* 저장 */}
        <button
          className={css.iconButton}
          style={{
            background: '#e8fbf3',
            borderColor: '#b8ffda',
            color: '#047857',
          }}
          onClick={handleSave}
          title="PNG 저장 (풀이 영역만)"
        >
          <FaSave size={18} />
        </button>
      </div>

      {/* Canvas & Image */}
      <div className={css.mainContent}>
        <div ref={problemAreaRef} className={css.imageDisplayWrapper}>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded Problem"
              className={css.uploadedImage}
            />
          )}
        </div>
        <div ref={wrapperRef} className={css.canvasWrapper} />
      </div>
    </div>
  );
};

export default SimpleWhiteboard;
