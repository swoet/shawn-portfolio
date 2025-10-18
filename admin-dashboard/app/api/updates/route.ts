import { NextRequest } from 'next/server';
import type { SSEClient } from '../../../lib/sse-utils';

// Declare global clients array type (for this route handler)
declare global {
  var sseClients: SSEClient[] | undefined;
}

export async function GET(request: NextRequest) {
  // Create a ReadableStream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Create a unique client ID
      const clientId = Date.now() + Math.random().toString();
      
      // Create encoder for text
      const encoder = new TextEncoder();
      
      // Send initial connection confirmation
      const initialMessage = `data: ${JSON.stringify({
        type: 'connected',
        clientId: clientId,
        timestamp: new Date().toISOString()
      })}\n\n`;
      controller.enqueue(encoder.encode(initialMessage));
      
      // Store client reference
      const client: SSEClient = {
        id: clientId,
        controller,
        encoder
      };
      
      // Add to clients array (we'll store in a more persistent way for real apps)
      globalThis.sseClients = globalThis.sseClients || [];
      globalThis.sseClients.push(client);
      
      console.log(`SSE client connected: ${clientId}, total clients: ${globalThis.sseClients?.length || 0}`);
      
      // Set up keep-alive ping
      const keepAlive = setInterval(() => {
        try {
          const pingMessage = `data: ${JSON.stringify({
            type: 'ping',
            timestamp: new Date().toISOString()
          })}\n\n`;
          controller.enqueue(encoder.encode(pingMessage));
        } catch (error) {
          console.error('Error sending ping:', error);
          clearInterval(keepAlive);
        }
      }, 30000);
      
      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        globalThis.sseClients = globalThis.sseClients?.filter((c) => c.id !== clientId) || [];
        console.log(`SSE client disconnected: ${clientId}, remaining clients: ${globalThis.sseClients?.length || 0}`);
        
        try {
          controller.close();
        } catch {
          // Controller might already be closed
        }
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}

// All broadcast utilities have been moved to lib/sse-utils.ts
