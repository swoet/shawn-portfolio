/**
 * Server-Sent Events Utility Functions
 * Handles real-time updates broadcasting to connected clients
 */

// Store connected clients (stored globally for SSE)
export interface SSEClient {
  id: string;
  controller: ReadableStreamDefaultController<Uint8Array>;
  encoder: TextEncoder;
}

// Declare global clients array type
declare global {
  var sseClients: SSEClient[] | undefined;
}

// Event types for different content updates
export const UPDATE_TYPES = {
  PROJECT_UPDATED: 'project_updated',
  VIDEO_UPDATED: 'video_updated',
  CV_UPDATED: 'cv_updated',
  CONTENT_REFRESH: 'content_refresh'
};

let lastUpdateId = 0;

// Function to broadcast updates to all connected clients
export function broadcastUpdate(type: string, data: Record<string, unknown> = {}) {
  const updateId = ++lastUpdateId;
  const message = JSON.stringify({
    id: updateId,
    type,
    data,
    timestamp: new Date().toISOString()
  });

  const clients = globalThis.sseClients || [];
  console.log(`Broadcasting update to ${clients.length} clients:`, { type, updateId });

  clients.forEach((client) => {
    try {
      const sseMessage = `data: ${message}\n\n`;
      client.controller.enqueue(client.encoder.encode(sseMessage));
    } catch (error) {
      console.error('Error sending update to client:', error);
      // Remove dead clients
      globalThis.sseClients = clients.filter((c) => c.id !== client.id);
    }
  });

  return updateId;
}

// Helper functions for specific content types
export function broadcastProjectUpdate(projectData: Record<string, unknown>) {
  return broadcastUpdate(UPDATE_TYPES.PROJECT_UPDATED, projectData);
}

export function broadcastVideoUpdate(videoData: Record<string, unknown>) {
  return broadcastUpdate(UPDATE_TYPES.VIDEO_UPDATED, videoData);
}

export function broadcastCVUpdate(cvData: Record<string, unknown>) {
  return broadcastUpdate(UPDATE_TYPES.CV_UPDATED, cvData);
}

export function broadcastContentRefresh() {
  return broadcastUpdate(UPDATE_TYPES.CONTENT_REFRESH, {
    message: 'Content updated, please refresh your cache'
  });
}