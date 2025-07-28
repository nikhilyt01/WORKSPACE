// src/draw/index.ts (or wherever your initDraw function resides)

import { http_backend } from "@/config";
import axios from "axios";
import { resolve } from "path";
import toast from "react-hot-toast";

// Ensure 'uuid' is installed: npm install uuid
// Then import:
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// --- Shape Type Definition (Updated with 'id') ---
export type Shape = {
    type: "rect";
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    strokecolor: string;
    strokewidth: number;
} | {
    type: "oval";
    id: string;
    x: number;
    y: number;
    radiusx: number;
    radiusy: number;
    strokecolor: string;
    strokeWidth: number;
} | {
    type: "pencil";
    id: string;
    points: { x: number, y: number }[];
    strokecolor: string;
    strokeWidth: number;
} | {
    type: "triangle";
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    strokecolor: string;
    strokeWidth: number;
} | {
    type: "eraser";
    id: string;
    points: { x: number, y: number }[];
    strokeWidth: number;
} | {
    type: "line";
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokecolor: string;
    strokeWidth: number;
} | {
    type: "arrow";
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokecolor: string;
    strokeWidth: number;
} | {
    type: "text";
    id: string;
    x: number;
    y: number;
    text: string;
    strokecolor: string;
} | {
    type: "image"; // NEW: Image type
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    imageUrl: string; // URL of the image
    prompt?: string; // Optional: Store the prompt used for generation,
    imgElement?: HTMLImageElement; // NEW: Store the loaded image element here
};


// --- Helper for Bounding Box of Shapes ---
// This is a crucial helper to get the min/max coordinates for different shape types
// to enable proper intersection detection.
function getShapeBoundingBox(shape: Shape): { x: number, y: number, width: number, height: number } | null {
    if (shape.type === "rect") {
        // Ensure width/height are positive for consistent bounding box
        const x = Math.min(shape.x, shape.x + shape.width);
        const y = Math.min(shape.y, shape.y + shape.height);
        const width = Math.abs(shape.width);
        const height = Math.abs(shape.height);
        return { x, y, width, height };
    } else if (shape.type === "oval") {
        return {
            x: shape.x - shape.radiusx,
            y: shape.y - shape.radiusy,
            width: shape.radiusx * 2,
            height: shape.radiusy * 2
        };
    } else if (shape.type === "pencil" || shape.type === "eraser") {
        if (shape.points.length === 0) return null;
        let minX = shape.points[0].x, minY = shape.points[0].y;
        let maxX = shape.points[0].x, maxY = shape.points[0].y;
        for (const p of shape.points) {
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
        }
        // Account for stroke width in bounding box, particularly for eraser/pencil
        const buffer = shape.strokeWidth / 2;
        return {
            x: minX - buffer,
            y: minY - buffer,
            width: (maxX - minX) + buffer * 2,
            height: (maxY - minY) + buffer * 2
        };
    } else if (shape.type === "triangle") {
        const minX = Math.min(shape.x1, shape.x2, shape.x3);
        const minY = Math.min(shape.y1, shape.y2, shape.y3);
        const maxX = Math.max(shape.x1, shape.x2, shape.x3);
        const maxY = Math.max(shape.y1, shape.y2, shape.y3);
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    } else if (shape.type === "line" || shape.type === "arrow") {
        const minX = Math.min(shape.x1, shape.x2);
        const minY = Math.min(shape.y1, shape.y2);
        const maxX = Math.max(shape.x1, shape.x2);
        const maxY = Math.max(shape.y1, shape.y2);
        // Add a small buffer for line width
        const buffer = shape.strokeWidth / 2;
        return {
            x: minX - buffer,
            y: minY - buffer,
            width: (maxX - minX) + buffer * 2,
            height: (maxY - minY) + buffer * 2
        };
    } else if (shape.type === "text") {
        // For text, you'd ideally measure text width/height, but for simplicity,
        // let's assume a fixed approximate size or pass it from where text is drawn.
        // This is a rough estimate; adjust as needed.
        const FONT_SIZE = 18; // From your clearCanvas
        const APPROX_CHAR_WIDTH = 0.6; // Approx. width of average char relative to font size
        const estimatedWidth = shape.text.length * FONT_SIZE * APPROX_CHAR_WIDTH;
        const estimatedHeight = FONT_SIZE * 1.2; // Line height
        return { x: shape.x, y: shape.y, width: estimatedWidth, height: estimatedHeight };
    }  else if (shape.type === "image") { // NEW: Image type bounding box
        return { x: shape.x, y: shape.y, width: shape.width, height: shape.height };
    }
    return null; // For unknown shape types
}

// Helper to check for intersection between two rectangles
function checkRectIntersection(
    rect1: { x: number, y: number, width: number, height: number },
    rect2: { x: number, y: number, width: number, height: number }
): boolean {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}


export async function initDraw(
    canvas: HTMLCanvasElement,
    roomId: string,
    getTool: () => string,
    getStroke: () => number,
    getColor: () => string,
    socket: WebSocket,
    getZoom: () => number,
    setZoom: (zoom: number) => void,  // setter function thorugh useCallback
    setOffsetX: (offsetX: number) => void,      //  Add offsetX setter
    setOffsetY: (offsetY: number) => void,      //  Add offsetY setter
    existingShapes: Shape[],
    setExistingShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    initialOffsetX: number,  // ✅ Rename for clarity offset moved to global canvas.tsx (parent)
    initialOffsetY: number,  // 
    seelectedShapeIds: Set<string>,
    setSelectedShapeIds: React.Dispatch<React.SetStateAction<Set<string>>>
) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    //let existingShapes: Shape[] = [];
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;
   // let offsetX = 0;
   // let offsetY = 0;
    let zoom = 1;

     // Use initial values and update through setters
    let offsetX = initialOffsetX;
    let offsetY = initialOffsetY;
   

    // --- NEW STATE FOR SELECTION ---
    let selectedShapeIds = new Set(seelectedShapeIds); // == seelectedshapeIds can create nothing but referen of parent one  // initialize with parents value // Use a Set for efficient lookup
    let isSelecting = false;
    let selectionRectStartX = 0;
    let selectionRectStartY = 0;
    let currentSelectionRect: { x: number, y: number, width: number, height: number } | null = null;
    // --- END NEW STATE ---

    try {
        // it is parameter means we have removed local logic part
        existingShapes = (await getExistingshapes(roomId)).map((shape: any) => ({
            ...shape,
            id: shape.id || uuidv4() // Ensure all loaded shapes have an ID
        }));
        setExistingShapes(existingShapes)// local array ko hi Parent me hydrate
        clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds);

        socket.onmessage = async (event) => {
            try { console.log("some messahe is broadcased")
                const message = JSON.parse(event.data); // {type:"jR"|"chat",message:{"shape":{..}} , roomId}
                if (message.type === "error") {
                    console.log("error from ws")
                    toast.error(message.message, {
                        duration: 4000,
                        position: "top-center"
                    });
                    return;
                }
                if (message.type === "chat") {
                    console.log("chat received")
                    const parsedShapeData = JSON.parse(message.message);
                    const newShape: Shape = {
                        ...parsedShapeData.shape,
                        id: parsedShapeData.shape.id || uuidv4() // Assign ID if missing
                    };
                    existingShapes.push(newShape);
                    setExistingShapes(prevshape=> [...prevshape,newShape]) // for updating parent also
                    clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds);
                }
                // --- NEW: Handle image broadcast if you integrate it later ---
                if (message.type === "image") {
                    const parsedShapeData = JSON.parse(message.message);
                    const newShape:Shape = {
                        ...parsedShapeData.shape,
                        id:parsedShapeData.shape.id || uuidv4 
                    }
                    if(newShape.type==="image"){
                        const img = new Image();
                        img.src= newShape.imageUrl;
                        await new Promise<void> ((resolve)=>{
                            img.onload = ()=>{
                               newShape.imgElement = img
                               resolve(); // i think this was missing so img was not being loaded
                            }
                            img.onerror =()=>{
                               console.log("failed to preload img on brodcast")
                               resolve()
                            }

                        })
                    }
                    existingShapes.push(newShape);
                    setExistingShapes(preShape=> [...preShape,newShape])  // passes to parent canvas.tsx
                    clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds);
                    toast.success("New AI image received!");
                }
                // --- END NEW IMAGE HANDLING ---

            } catch (e) {
                console.log("Failed to process message", e);
            }
        };

    } catch (e) {
        toast.error("Failed to initialize drawing");
        console.log("Failed to init drawing:", e);
    }

    let clicked: boolean = false;
    let startx = 0;
    let starty = 0;
    let currentPoints: { x: number, y: number }[] = [];

    canvas.addEventListener("mousedown", (e) => {
        const tool = getTool();
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        zoom = getZoom(); // Get the latest zoom value

        // Convert client coordinates to world coordinates at the start of the drag
        const worldX = (clientX - offsetX) / zoom;
        const worldY = (clientY - offsetY) / zoom;

        canvas.style.cursor = tool === "Hand" ? "grab" : "crosshair";

        if (tool === "Hand") {
            isPanning = true;
            panStartX = clientX - offsetX;
            panStartY = clientY - offsetY;
            canvas.style.cursor = "grabbing";
            return;
        }

        // --- NEW: Selection tool logic on mousedown ---
        if (tool === "Select") {
            isSelecting = true;
            selectionRectStartX = worldX; // Store world coordinates for selection rect
            selectionRectStartY = worldY;
            currentSelectionRect = { x: worldX, y: worldY, width: 0, height: 0 };
            selectedShapeIds.clear(); // Clear previous selection when starting a new one
            setSelectedShapeIds(new Set<string>());  // passing to parent (canvas.tsx)
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds, currentSelectionRect); // Draw selection preview
            return;
        }
        // --- END NEW SELECTION ---

        clicked = true; // Only set clicked for drawing tools
        startx = worldX;
        starty = worldY;
        currentPoints = [{ x: worldX, y: worldY }]; // Store world coordinates

        if (getTool() === "Eraser") {
            const eraserSize = getStroke();
            canvas.style.setProperty('--eraser-size', `${eraserSize}px`);
            canvas.classList.add("eraser-cursor");

            const cursor = document.createElement('div');
            cursor.id = 'eraser-cursor';
            document.body.appendChild(cursor);

            const moveCursor = (e: MouseEvent) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            };

            window.addEventListener('mousemove', moveCursor);

            const cleanup = () => {
                canvas.classList.remove("eraser-cursor");
                if (document.getElementById('eraser-cursor')) {
                    document.body.removeChild(cursor);
                }
                window.removeEventListener('mousemove', moveCursor);
                canvas.removeEventListener('mouseup', cleanup);
            };

            canvas.addEventListener('mouseup', cleanup);
        }

        if (getTool() === "Text") {
            e.preventDefault();
            const textarea = document.createElement("textarea");
            textarea.placeholder = "Type here...";
            textarea.style.position = "absolute";
            textarea.style.top = `${e.clientY}px`; // Use clientY directly for absolute positioning
            textarea.style.left = `${e.clientX}px`; // Use clientX directly for absolute positioning
            textarea.style.font = "16px Arial";
            textarea.style.color = getColor();
            textarea.style.background = "transparent";
            textarea.style.border = "none";
            textarea.style.outline = "none";
            textarea.style.resize = "none";
            textarea.style.zIndex = "10";
            textarea.style.padding = "0px";
            textarea.style.margin = "0px";
            textarea.style.lineHeight = "1.2";
            textarea.style.fontSize = "18px";
            textarea.style.fontWeight = "normal";
            textarea.style.whiteSpace = "pre";

            document.body.appendChild(textarea);
            textarea.focus();

            const cleanupAndDraw = () => {
                const text = textarea.value.trim();
                document.body.removeChild(textarea);
                if (!text) return;

                // Use the world coordinates from mousedown for initial text position
                // The textarea's position is based on clientX/Y, but the shape
                // needs to be in world coordinates for consistent rendering.
                const shape: Shape = {
                    type: "text",
                    id: uuidv4(), // Assign a unique ID
                    x: worldX, // Use worldX from mousedown
                    y: worldY, // Use worldY from mousedown
                    text,
                    strokecolor: getColor(),
                };

                existingShapes.push(shape);
                setExistingShapes(preShape=> [...preShape,shape])  // passes to parent canvas.tsx


                socket.send(
                    JSON.stringify({
                        type: "chat",
                        message: JSON.stringify({ shape }),
                        roomId,
                    })
                );

                clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds);
            };

            textarea.addEventListener("keydown", (event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    textarea.blur();
                }
            });

            textarea.addEventListener("blur", cleanupAndDraw);
        }
    });

    canvas.addEventListener("mouseup", (e) => {
        const tool = getTool();
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        zoom = getZoom();

        // Convert mouseup coordinates to world coordinates
        const adjustedEndX = (clientX - offsetX) / zoom;
        const adjustedEndY = (clientY - offsetY) / zoom;

        if (isPanning) {
            isPanning = false;
            canvas.style.cursor = tool === "Hand" ? "grab" : "crosshair";
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds); // Re-render after pan ends
            return;
        }

        // --- NEW: Selection tool logic on mouseup ---
        if (isSelecting) {
            isSelecting = false;
            currentSelectionRect = null; // Clear the temporary selection rect
            const selectionRect = {
                x: Math.min(selectionRectStartX, adjustedEndX),
                y: Math.min(selectionRectStartY, adjustedEndY),
                width: Math.abs(adjustedEndX - selectionRectStartX),
                height: Math.abs(adjustedEndY - selectionRectStartY)
            };

            selectedShapeIds.clear(); // Clear previous selection
            setSelectedShapeIds(new Set<string>());

            const newSelectedIds = new Set<string>(); // Fresh Set
            existingShapes.forEach(shape => {
                const shapeBBox = getShapeBoundingBox(shape);
                if (shapeBBox && checkRectIntersection(selectionRect, shapeBBox)) {
                     newSelectedIds.add(shape.id); // Add to NEW Set
                   // selectedShapeIds.add(shape.id); // Add shape's ID to the selected set
                }
            });
               // 3. Update parent state
               setSelectedShapeIds(newSelectedIds); // ✅ Triggers re-render
               // Optional: Sync local copy if needed elsewhere
               selectedShapeIds = newSelectedIds;
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds); // Re-render to show selected shapes
            return;
        }
        // --- END NEW SELECTION ---

        if (!clicked) return; // Only process if a drawing tool was clicked
        clicked = false;

        let shape: Shape | null = null;
        const width = adjustedEndX - startx;
        const height = adjustedEndY - starty;
        const color = getColor();
        const thickness = getStroke();

        // --- Drawing tool shape creation (modified to include ID) ---
        if (tool === "Rect") {
            shape = {
                type: "rect",
                id: uuidv4(), // Assign ID
                x: startx,
                y: starty,
                width,
                height,
                strokecolor: color,
                strokewidth: thickness
            };
        } else if (tool === "Oval") {
            const radiusx = Math.abs(width / 2);
            const radiusy = Math.abs(height / 2);
            shape = {
                type: "oval",
                id: uuidv4(), // Assign ID
                x: startx + width / 2,
                y: starty + height / 2,
                radiusx,
                radiusy,
                strokecolor: color,
                strokeWidth: thickness
            };
        } else if (tool === "Pencil") {
            shape = {
                type: "pencil",
                id: uuidv4(), // Assign ID
                points: currentPoints,
                strokecolor: color,
                strokeWidth: thickness
            };
        } else if (tool === "Eraser") {
            shape = {
                type: "eraser",
                id: uuidv4(), // Assign ID
                points: currentPoints,
                strokeWidth: thickness
            };
        } else if (tool === "Triangle") {
            shape = {
                type: "triangle",
                id: uuidv4(), // Assign ID
                x1: startx,
                y1: starty,
                x2: adjustedEndX,
                y2: adjustedEndY,
                x3: startx - (adjustedEndX - startx),
                y3: adjustedEndY,
                strokecolor: color,
                strokeWidth: thickness
            };
        } else if (tool === "Line") {
            shape = {
                type: "line",
                id: uuidv4(), // Assign ID
                x1: startx,
                y1: starty,
                x2: adjustedEndX,
                y2: adjustedEndY,
                strokecolor: color,
                strokeWidth: thickness
            };
        } else if (tool === "Arrow") {
            shape = {
                type: "arrow",
                id: uuidv4(), // Assign ID
                x1: startx,
                y1: starty,
                x2: adjustedEndX,
                y2: adjustedEndY,
                strokecolor: color,
                strokeWidth: thickness
            };
        } else {
            return; // No shape to send
        }
        // --- End Drawing Tool Shape Creation ---

        existingShapes.push(shape);
        setExistingShapes(preShape=> [...preShape,shape])  // passes to parent canvas.tsx
        if (shape) {
            socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({ shape }), // Send the shape with its ID
                roomId
            }));
        }
        clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds); // Re-render after drawing
    });

    canvas.addEventListener("mousemove", (e) => {
        const tool = getTool();
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        zoom = getZoom();

        const adjustedEndX = (clientX - offsetX) / zoom; // Current world X
        const adjustedEndY = (clientY - offsetY) / zoom; // Current world Y

        if (isPanning) {
            // ✅ Update local tracking variables
            offsetX = clientX - panStartX;
            offsetY = clientY - panStartY;
            // ✅ Update parent state immediately this is for just passing to parent locally work is same 
            setOffsetX(offsetX)
            setOffsetY(offsetY)

            
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds);
            return;
        }

        // --- NEW: Selection tool logic on mousemove (for preview) ---
        if (isSelecting) {
            const currentWidth = adjustedEndX - selectionRectStartX;
            const currentHeight = adjustedEndY - selectionRectStartY;
            currentSelectionRect = {
                x: selectionRectStartX,
                y: selectionRectStartY,
                width: currentWidth,
                height: currentHeight
            };
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds, currentSelectionRect);
            return;
        }
        // --- END NEW SELECTION ---

        if (clicked) { // Only for drawing tools
            const thickness = getStroke();
            const color = getColor();
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds);

            // Apply transforms for preview drawing
            ctx.save();
            ctx.translate(offsetX, offsetY);
            ctx.scale(zoom, zoom);

            ctx.strokeStyle = tool === "Eraser" ? "rgba(0,0,0,1)" : color; // Eraser preview is black
            ctx.lineWidth = thickness;

            if (tool === "Rect") {
                ctx.strokeRect(startx, starty, adjustedEndX - startx, adjustedEndY - starty);
            } else if (tool === "Oval") {
                ctx.beginPath();
                ctx.ellipse(
                    startx + (adjustedEndX - startx) / 2,
                    starty + (adjustedEndY - starty) / 2,
                    Math.abs((adjustedEndX - startx) / 2),
                    Math.abs((adjustedEndY - starty) / 2),
                    0, 0, Math.PI * 2
                );
                ctx.stroke();
            } else if (tool === "Pencil" || tool === "Eraser") {
                currentPoints.push({ x: adjustedEndX, y: adjustedEndY });
                ctx.beginPath();
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
                for (let i = 1; i < currentPoints.length; i++) {
                    ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
                }
                ctx.stroke();
            } else if (tool === "Triangle") {
                ctx.beginPath();
                ctx.moveTo(startx, starty);
                ctx.lineTo(adjustedEndX, adjustedEndY);
                ctx.lineTo(startx - (adjustedEndX - startx), adjustedEndY);
                ctx.closePath();
                ctx.stroke();
            } else if (tool === "Line") {
                ctx.beginPath();
                ctx.moveTo(startx, starty);
                ctx.lineTo(adjustedEndX, adjustedEndY);
                ctx.stroke();
            } else if (tool === "Arrow") {
                drawArrowPreview(ctx, startx, starty, adjustedEndX, adjustedEndY, color, thickness);
            }
            ctx.restore(); // Restore context state after preview drawing
        }
    });

    // Handle wheel zoom
    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const currentZoom = getZoom();
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.1), 5);

        const zoomRatio = newZoom / currentZoom;
        offsetX = mouseX - (mouseX - offsetX) * zoomRatio;
        offsetY = mouseY - (mouseY - offsetY) * zoomRatio;

        // can also use her panandzoom(newzoom,offsetx,offsety) for setting all at once 
        setZoom(newZoom); // Update zoom state
        setOffsetX(offsetX);//update all varibale to set it for parent canvas.tsx
        setOffsetY(offsetY);
        clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, newZoom, selectedShapeIds);
    });

    // --- NEW: Click outside canvas to deselect all ---
    document.addEventListener("click", (e) => {
        if (e.target !== canvas && selectedShapeIds.size > 0) {
            selectedShapeIds.clear();
            setSelectedShapeIds(new Set<string>()) // pass to parent
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds,currentSelectionRect);
        }
    });
    // --- END NEW DESELECT ---
}
function drawShape(
    ctx: CanvasRenderingContext2D,
    shape: Shape,
    // offsetX: number, // These are for the main canvas, might not be needed inside this helper for drawing already transformed shapes.
    // offsetY: number,
    zoom: number,

) {
     if(shape.type!=="image"){
         ctx.strokeStyle = shape.type === "eraser" ? "black" : shape.strokecolor;
        }
        // Adjust line width for zoom, so it appears consistent
       
        // Text doesn't have strokewidth, so check for text type or undefined

        if (shape.type === "rect") {
            ctx.lineWidth=shape.strokewidth;
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "oval") {
            ctx.beginPath();
            ctx.lineWidth=shape.strokeWidth;
            ctx.ellipse(shape.x, shape.y, shape.radiusx, shape.radiusy, 0, 0, Math.PI * 2);
            ctx.stroke();
        } else if (shape.type === "pencil" || shape.type === "eraser") {
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth=shape.strokeWidth;
            // Ensure points are adjusted for zoom if they weren't stored in world coordinates initially
            // But if startx/starty are already world, then no need to scale points directly here.
            ctx.moveTo(shape.points[0].x, shape.points[0].y);
            for (let i = 1; i < shape.points.length; i++) {
                ctx.lineTo(shape.points[i].x, shape.points[i].y);
            }
            ctx.stroke();
        } else if (shape.type === "triangle") {
            ctx.beginPath();
            ctx.lineWidth=shape.strokeWidth;
            ctx.moveTo(shape.x1, shape.y1);
            ctx.lineTo(shape.x2, shape.y2);
            ctx.lineTo(shape.x3, shape.y3);
            ctx.closePath();
            ctx.stroke();
        } else if (shape.type === "line") {
            ctx.beginPath();
            ctx.lineWidth = shape.strokeWidth;
            ctx.moveTo(shape.x1, shape.y1);
            ctx.lineTo(shape.x2, shape.y2);
            ctx.stroke();
        } else if (shape.type === "arrow") {
            drawArrowPreview(ctx, shape.x1, shape.y1, shape.x2, shape.y2, shape.strokecolor, shape.strokeWidth);
        } else if (shape.type === "text") {
            // Text font size should also scale with zoom for consistency
            ctx.font = `${18 / zoom}px Arial`; // Adjust font size for zoom
            ctx.fillStyle = shape.strokecolor;
            ctx.textBaseline = "top";
            ctx.fillText(shape.text, shape.x, shape.y);
        } else if (shape.type === "image") { // NEW: Draw image
            const img = new Image();
            img.src = shape.imageUrl; 
             // Check if the image is already loaded to avoid drawing before it's ready
        if (shape.imgElement && shape.imgElement.complete) {  
            ctx.drawImage(img, shape.x, shape.y, shape.width, shape.height);
        } else {
            // If not loaded, set onload to re-render when it is.
            // This might cause a flicker initially but ensures the image appears.
            
            // Draw a placeholder if the image is not yet loaded
            ctx.fillStyle = "#555"; // Dark gray placeholder
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
            ctx.strokeStyle = "#AAA";
            ctx.lineWidth = 1;
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            ctx.fillStyle = "#FFF";
            ctx.font = `${12 / ctx.getTransform().a}px Arial`; // Scale font for placeholder text
            ctx.fillText("Loading...", shape.x + 5, shape.y + shape.height / 2 - 5);
            //clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, zoom, selectedShapeIds, currentSelectionRect);
            
        }
    }
        // bcoz if we draw in tempcanvas unneccessary blue higlights will cause issue
        // // --- NEW: Draw selection highlight for selected shapes ---
        // if (selectedShapeIds.has(shape.id)) {
        //     const bbox = getShapeBoundingBox(shape);
        //     if (bbox) {
        //         ctx.save();
        //         ctx.strokeStyle = "blue";
        //         ctx.lineWidth = 2 / zoom; // Consistent highlight line width
        //         ctx.setLineDash([5 / zoom, 5 / zoom]); // Consistent dash pattern
        //         ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
        //         ctx.restore(); // Restore context after drawing highlight
        //     }
        // }

}

// --- Modified clearCanvas function ---
function clearCanvas(
    existingShapes: Shape[],
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    zoom: number,
    selectedShapeIds: Set<string>, // Added parameter for selected shape IDs
    currentSelectionRect: { x: number, y: number, width: number, height: number } | null = null // Added for live selection rect preview
) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0)"; // Make background transparent if it's a sketchpad
    // ctx.fillRect(0,0,canvas.width,canvas.height) // Removed fill rect to not cover previous shapes
    ctx.restore();

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(zoom, zoom);

    existingShapes.forEach((shape) => { // Use forEach for drawing, map is for transformation
        drawShape(ctx, shape, zoom); // , offsetX, offsetY not of use
        // --- Draw selection highlight for selected shapes ---
        if (selectedShapeIds.has(shape.id)) {
            const bbox = getShapeBoundingBox(shape);
            if (bbox) {
                ctx.save();
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 2 / zoom; // Consistent highlight line width
                ctx.setLineDash([5 / zoom, 5 / zoom]); // Consistent dash pattern
                ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
                ctx.restore();
            }
        }
    });

    // --- NEW: Draw live selection rectangle preview (if active) ---
    if (currentSelectionRect) {
        ctx.save();
        ctx.strokeStyle = "red"; // Color for the temporary selection rectangle
        ctx.lineWidth = 1 / zoom;
        ctx.setLineDash([2 / zoom, 2 / zoom]);
        // Draw the current selection rectangle
        ctx.strokeRect(
            currentSelectionRect.x,
            currentSelectionRect.y,
            currentSelectionRect.width,
            currentSelectionRect.height
        );
        ctx.restore();
    }
    // --- END NEW SELECTION RECT PREVIEW ---

    ctx.restore();
}

// Existing helper functions
async function getExistingshapes(roomId: string): Promise<Shape[]> {
    const res = await axios.get(`${http_backend}/chat/${roomId}`);
    const messageArray = res.data.message;
    const Shapes =await Promise.all(messageArray.map( async (chat: { message: string } ) => {  // chat ke under message:{shape:{type:,id:..}}
        const parsedMessage = JSON.parse(chat.message);
        const shape:Shape ={ // particular shape
            ...parsedMessage.shape,
            id:parsedMessage.shape.id || uuidv4
        }
       // ------ agar shape image-----
        if(shape.type==="image"){
            const img = new Image()
            img.src=shape.imageUrl;
            await new Promise<void>((resolve)=>{
                img.onload =()=>{
                    shape.imgElement=img;
                    resolve()
                }
                img.onerror =()=>{
                    console.log("errror loading img",shape.imageUrl)
                    resolve()
                }
            })
        }
        //------------------------else---
        return shape
       // return parsedMessage.shape;
    })
)
    return Shapes;     // array of all shape
}

function drawArrowPreview(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    thickness: number
) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);

    const headLength = (8 + thickness * 1.5) / ctx.getTransform().a; // Adjust head length by current scale
    const headAngle = Math.PI / 7;

    ctx.beginPath();
    ctx.lineWidth = thickness / ctx.getTransform().a;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const leftX = x2 - headLength * Math.cos(angle - headAngle);
    const leftY = y2 - headLength * Math.sin(angle - headAngle);
    const rightX = x2 - headLength * Math.cos(angle + headAngle);
    const rightY = y2 - headLength * Math.sin(angle + headAngle);

    ctx.beginPath();
    ctx.lineWidth = (thickness * 0.6) / ctx.getTransform().a;
    ctx.moveTo(x2, y2);
    ctx.lineTo(leftX, leftY);
    ctx.moveTo(x2, y2);
    ctx.lineTo(rightX, rightY);
    ctx.stroke();
}

// Function to generate an image from selected shapes and send to backend
export async function generateImageFromSelection(
    existingShapes: Shape[],
    selectedShapeIds: Set<string>,
    roomId: string,
    socket: WebSocket,
) {
    if (selectedShapeIds.size === 0) {
        toast.error("No shapes selected to generate an image.");
        return;
    }

    const selectedShapes = existingShapes.filter(shape => selectedShapeIds.has(shape.id));

    // Determine the bounding box of the entire selection
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    selectedShapes.forEach(shape => {
        const bbox = getShapeBoundingBox(shape);
        if (bbox) {
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
        }
    });

    if (minX === Infinity) { // No valid shapes found
        toast.error("Could not determine bounding box for selected shapes.");
        return;
    }

    const PADDING = 20; // Add some padding around the shapes
    const canvasWidth = (maxX - minX) + PADDING * 2;
    const canvasHeight = (maxY - minY) + PADDING * 2;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
        toast.error("Failed to create temporary canvas.");
        return;
    }
    tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height)
    tempCtx.fillStyle ="black"
    tempCtx.fillRect(0,0,tempCanvas.width,tempCanvas.height)
    // Translate context to draw shapes relative to the tempCanvas origin
    tempCtx.translate(-minX + PADDING, -minY + PADDING);

    // Draw only the selected shapes onto the temporary canvas
    selectedShapes.forEach(shape => {
        // We're drawing without pan/zoom transforms as the tempCanvas is scaled to the content
        drawShape(tempCtx, shape, 1); // Pass 0,0 for offset and 1 for zoom
    });
    tempCtx.restore()
    try {
        const imageDataUrl = tempCanvas.toDataURL("image/jpeg",0.9); // Get base64 image data
        const aiPrompt = 
           "Transform this sketch into the most realistic version possible while preserving the core elements. Analyze the drawn elements and: " +
           "1. If objects/creatures resemble real-world items (vehicles, animals, humans), generate a photorealistic version considering same orientation " +
           "2. If abstract, enhance with realistic textures and proper lighting " +
           "3. For anatomical sketches (like skeletons), create accurate medical/scientific illustrations " +
           "4. Optimize colors to natural tones while maintaining contrast " +
           "5. Reconstruct perspective and proportions to follow real-world physics " +
           "6. Add contextually appropriate details (e.g., turn rectangle wheels into proper tires with rims) " +
           "Important: " +
           "-consider generating image with same geometry and orientaion"+
           "- Prioritize realism over artistic styles and " +
           "- The Background should be same as provided img i.e Black"
           "- Never return cartoonish/abstract results " +
           "- If the sketch resembles multiple real objects, choose the most probable one " +
           "- For human figures, maintain realistic proportions and anatomy";
        const prompt ="Transform this hand-drawn sketch into a polished, visually appealing version while preserving the original composition. Optimize colors to be vibrant yet natural, clean up rough edges, and enhance details where possible. If the drawing contains recognizable objects (e.g., trees, buildings, faces), refine them to look more realistic or stylistically consistent. Maintain the original intent but elevate the overall aesthetic quality." // Example prompt
        toast.loading("Generating AI image from selection...", { id: "ai-gen" });

        // Send the image data to your backend API
        const response = await axios.post(`${http_backend}/improveDrawing`, {
            imageData: imageDataUrl,
            // You can also send a prompt from the user if you have a UI for it
            prompt:aiPrompt 
        });  // prompt removed to create more realistic one

        toast.dismiss("ai-gen");

        if (response.data && response.data.improvedImage) {
            const newImageShape: Shape = {
                type: "image",
                id: uuidv4(),
                x: minX, // Place the new image at the top-left of the original selection
                y: maxY , // Place it below the original selection
                width: canvasWidth, // Use the same width as the captured image
                height: canvasHeight, // Use the same height as the captured image
                imageUrl: response.data.improvedImage,
                prompt: aiPrompt // Store the prompt for reference
            };

            // Pre-load the new image before adding to existingShapes
            const img = new Image();
            img.src = newImageShape.imageUrl;
            
            await new Promise<void>((resolve, reject) => {
                    img.onload = () => {
                        newImageShape.imgElement = img;
                        resolve();
                    };
                    img.onerror = () => {
                        toast.error("Failed to load AI generated image.");
                        reject(new Error("Image load failed"));
                    };
            }); 

            socket.send(
                JSON.stringify({
                    type: "image", // Use the "image" message type for broadcasting
                    message: JSON.stringify({ shape: newImageShape }),
                    roomId,
                })
            );
            
            toast.success("AI image generated and added to canvas!");
        }else if(response.data.message){
             toast.success(response.data.message);// ai returned text
        }
         else {
            toast.error("AI image generation failed: No image URL received.");
        }
    } catch (error) {
        toast.dismiss("ai-gen");
        toast.error("Error generating AI image.");
        console.error("Error sending image to backend:", error);
    }
}
