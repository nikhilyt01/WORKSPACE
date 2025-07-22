// utils/aiUtils.ts (new file)
import axios from "axios";
import { http_backend } from "@/config";
import toast from "react-hot-toast";

/**
 * Converts the current canvas content to a Base64 encoded image.
 * @param canvas The HTMLCanvasElement to convert.
 * @param mimeType The desired MIME type (e.g., 'image/png', 'image/jpeg').
 * @returns A Promise that resolves with the Base64 image data string, or null on error.
 */
export function getCanvasImageBase64(canvas: HTMLCanvasElement, mimeType: string = 'image/png'): string | null {
  try {
    // You might need to adjust this depending on how your canvas context handles existing transformations
    // For simplicity, this takes the current rendered state.
    return canvas.toDataURL(mimeType);
  } catch (error) {
    console.error("Error converting canvas to image:", error);
    toast.error("Failed to capture canvas image.");
    return null;
  }
}

/**
 * Sends the canvas image to the AI backend for improvement.
 * @param canvas The HTMLCanvasElement containing the drawing.
 * @param improvementPrompt A text prompt for how to improve the drawing.
 * @returns A Promise that resolves with the improved image Base64 string or an error message.
 */
export async function improveDrawingWithAI(canvas: HTMLCanvasElement, improvementPrompt: string): Promise<string | null> {
  const imageData = getCanvasImageBase64(canvas, 'image/png'); // Using PNG for lossless quality
  if (!imageData) {
    return null;
  }

  try {
    toast.loading("Improving drawing with AI...");
    const response = await axios.post(`${http_backend}/api/improve-drawing`, {
      imageData,
      prompt: improvementPrompt,
    });
    toast.dismiss(); // Dismiss the loading toast

    if (response.data.improvedImage) {
      toast.success("Drawing improved successfully!");
      return response.data.improvedImage; // This will be the new Base64 image
    } else if (response.data.message) {
      toast.success(response.data.message); // In case AI returns a message instead of image
      return null;
    } else {
      toast.error("AI did not return an improved image.");
      return null;
    }
  } catch (error) {
    toast.dismiss();
    console.error("Error calling AI for drawing improvement:", error);
    toast.error("Failed to improve drawing. Please try again.");
    return null;
  }
}

/**
 * Sends the canvas image (of an expression) to the AI backend for solving.
 * @param canvas The HTMLCanvasElement containing the mathematical expression.
 * @param solvePrompt A text prompt for solving the expression (e.g., "Solve this math problem").
 * @returns A Promise that resolves with the solution text or an error message.
 */
export async function solveExpressionWithAI(canvas: HTMLCanvasElement, solvePrompt: string): Promise<string | null> {
  const imageData = getCanvasImageBase64(canvas, 'image/png');
  if (!imageData) {
    return null;
  }

  try {
    toast.loading("Solving expression with AI...");
    const response = await axios.post(`${http_backend}/api/solve-expression`, {
      imageData,
      prompt: solvePrompt,
    });
    toast.dismiss();

    if (response.data.solution) {
      toast.success("Expression solved!");
      return response.data.solution; // This will be the text solution
    } else if (response.data.message) {
      toast.success(response.data.message);
      return null;
    } else {
      toast.error("AI did not return a solution.");
      return null;
    }
  } catch (error) {
    toast.dismiss();
    console.error("Error calling AI for expression solving:", error);
    toast.error("Failed to solve expression. Please try again.");
    return null;
  }
}