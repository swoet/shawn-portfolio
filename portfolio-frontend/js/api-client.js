/**
 * API Client for Portfolio Frontend
 * Connects to the Admin Dashboard APIs
 */

// Prefer a global override (config.js) or meta tag; fallback to deployed admin
const API_BASE_URL = (typeof window !== 'undefined' && window.API_BASE_URL)
  || (typeof document !== 'undefined' && document.querySelector('meta[name="api-base-url"]')?.getAttribute('content'))
  || 'https://shawnmutogo-admin.netlify.app/api';

class PortfolioAPI {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
    this.cacheExpiration = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Generic fetch with error handling and caching
   */
  async fetchWithCache(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiration) {
        console.log(`📦 Cache hit for ${endpoint}`);
        return cached.data;
      } else {
        this.cache.delete(cacheKey);
      }
    }

    try {
      console.log(`🌐 Fetching ${endpoint}...`);
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache successful responses
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      console.log(`✅ Successfully fetched ${endpoint}`);
      return data;
    } catch (error) {
      console.error(`❌ Failed to fetch ${endpoint}:`, error);
      
      // Return cached data if available, even if expired
      if (this.cache.has(cacheKey)) {
        console.log(`🔄 Using stale cache for ${endpoint}`);
        return this.cache.get(cacheKey).data;
      }
      
      throw error;
    }
  }

  /**
   * Get all published projects
   */
  async getProjects() {
    return this.fetchWithCache('/projects');
  }

  /**
   * Get a specific project by slug
   */
  async getProject(slug) {
    const projects = await this.getProjects();
    return projects.find(project => project.slug === slug);
  }

  /**
   * Get featured projects (top 3 by sortOrder)
   */
  async getFeaturedProjects(limit = 3) {
    const projects = await this.getProjects();
    return projects.slice(0, limit);
  }

  /**
   * Get all published videos
   */
  async getVideos() {
    return this.fetchWithCache('/videos');
  }

  /**
   * Get a specific video by ID
   */
  async getVideo(id) {
    const videos = await this.getVideos();
    return videos.find(video => video.id === id);
  }

  /**
   * Get CV sections
   */
  async getCVSections() {
    return this.fetchWithCache('/cv');
  }

  /**
   * Get a specific CV section by key
   */
  async getCVSection(key) {
    const sections = await this.getCVSections();
    return sections.find(section => section.key === key);
  }

  /**
   * Get page sections (editable content for static sections)
   */
  async getSections() {
    return this.fetchWithCache('/sections');
  }

  /**
   * Get a specific page section by key
   */
  async getSection(key) {
    const sections = await this.getSections();
    return sections.find(section => section.key === key);
  }

  /**
   * Get portfolio statistics
   */
  async getStats() {
    try {
      const [projects, videos, cvSections, sections] = await Promise.all([
        this.getProjects(),
        this.getVideos(),
        this.getCVSections(),
        this.getSections(),
      ]);

      return {
        totalProjects: projects.length,
        totalVideos: videos.length,
        totalCVSections: cvSections.length,
        totalSections: sections.length,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to get stats:', error);
      return {
        totalProjects: 0,
        totalVideos: 0,
        totalCVSections: 0,
        totalSections: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  /**
   * Search projects and videos
   */
  async search(query) {
    const [projects, videos] = await Promise.all([
      this.getProjects(),
      this.getVideos(),
    ]);

    const searchTerm = query.toLowerCase();
    
    const matchingProjects = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description?.toLowerCase().includes(searchTerm) ||
      project.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    const matchingVideos = videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm) ||
      video.description?.toLowerCase().includes(searchTerm)
    );

    return {
      projects: matchingProjects,
      videos: matchingVideos,
    };
  }

  /**
   * Clear cache (useful for real-time updates)
   */
  clearCache() {
    this.cache.clear();
    console.log('🧹 API cache cleared');
  }

  /**
   * Prefetch data for better performance
   */
  async prefetchAll() {
    console.log('🚀 Prefetching all data...');
    try {
      await Promise.all([
        this.getProjects(),
        this.getVideos(),
        this.getCVSections(),
        this.getSections(),
      ]);
      console.log('✅ All data prefetched successfully');
    } catch (error) {
      console.error('❌ Failed to prefetch data:', error);
    }
  }
}

// Create a singleton instance
const portfolioAPI = new PortfolioAPI();

// Auto-prefetch data when the page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    portfolioAPI.prefetchAll().catch(console.error);
  });
}

// Export for use in other scripts
window.PortfolioAPI = portfolioAPI;

// Also support CommonJS/ES6 modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioAPI;
}

/**
 * Real-time update listener
 * Listens for webhook notifications and refreshes cache
 */
class RealtimeUpdates {
  constructor(api) {
    this.api = api;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  /**
   * Initialize real-time updates
   */
  init() {
    // Try Server-Sent Events first
    this.connectSSE();
    
    // Fallback to polling if SSE fails
    setTimeout(() => {
      if (!this.isConnected) {
        console.log('📡 SSE unavailable, using polling fallback');
        this.startPolling();
      }
    }, 3000);
  }

  /**
   * Connect to Server-Sent Events for real-time updates
   */
  connectSSE() {
    try {
      const eventSource = new EventSource(`${API_BASE_URL}/updates`);
      
      eventSource.onopen = () => {
        console.log('🔌 Connected to real-time updates');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleUpdate(data);
      };

      eventSource.onerror = () => {
        console.log('❌ SSE connection error');
        this.isConnected = false;
        eventSource.close();
        
        // Attempt reconnection
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => {
            this.reconnectAttempts++;
            this.connectSSE();
          }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
        }
      };

      this.eventSource = eventSource;
    } catch (error) {
      console.error('Failed to connect SSE:', error);
    }
  }

  /**
   * Handle real-time updates
   */
  handleUpdate(data) {
    console.log('📡 Received real-time update:', data);
    
    // Clear relevant cache
    this.api.clearCache();
    
    // Dispatch custom event for components to listen
    window.dispatchEvent(new CustomEvent('portfolioUpdate', {
      detail: data
    }));
    
    // Auto-refresh relevant sections
    this.refreshContent(data.type);
  }

  /**
   * Refresh specific content based on update type
   */
  async refreshContent(type) {
    try {
      switch (type) {
        case 'project':
        case 'project_updated':
          await this.refreshProjects();
          break;
        case 'video':
        case 'video_updated':
          await this.refreshVideos();
          break;
        case 'cv':
        case 'cv_updated':
          await this.refreshCV();
          break;
        case 'content_refresh':
          await this.refreshSections();
          break;
        default:
          // Refresh everything
          await this.api.prefetchAll();
          await this.refreshSections();
      }
    } catch (error) {
      console.error('Failed to refresh content:', error);
    }
  }

  /**
   * Refresh projects section
   */
  async refreshProjects() {
    const projects = await this.api.getProjects();
    const projectsGrid = document.querySelector('#topProjects');
    if (projectsGrid && window.renderTopProjects) {
      window.renderTopProjects(projects);
    }
  }

  /**
   * Refresh videos section
   */
  async refreshVideos() {
    const videos = await this.api.getVideos();
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid && window.renderVideos) {
      window.renderVideos(videos);
    }
  }

  /**
   * Refresh CV sections
   */
  async refreshCV() {
    const cvSections = await this.api.getCVSections();
    if (window.updateCVSections) {
      window.updateCVSections(cvSections);
    }
  }

  /**
   * Refresh page sections (static sections content)
   */
  async refreshSections() {
    const sections = await this.api.getSections();
    if (window.updateSections) {
      window.updateSections(sections);
    }
  }

  /**
   * Polling fallback for real-time updates
   */
  startPolling() {
    let lastUpdate = Date.now();
    
    const poll = async () => {
      try {
        const stats = await this.api.getStats();
        const currentUpdate = new Date(stats.lastUpdated).getTime();
        
        if (currentUpdate > lastUpdate) {
          console.log('📱 Detected changes via polling');
          lastUpdate = currentUpdate;
          this.api.clearCache();
          await this.api.prefetchAll();
          
          window.dispatchEvent(new CustomEvent('portfolioUpdate', {
            detail: { type: 'poll', timestamp: currentUpdate }
          }));
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Poll every 30 seconds
    setInterval(poll, 30000);
    console.log('🔄 Started polling for updates (30s interval)');
  }

  /**
   * Disconnect real-time updates
   */
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.isConnected = false;
    }
  }
}

// Initialize real-time updates
const realtimeUpdates = new RealtimeUpdates(portfolioAPI);

// Start real-time updates when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    realtimeUpdates.init();
  });
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    realtimeUpdates.disconnect();
  });
}

// Export for external use
window.RealtimeUpdates = realtimeUpdates;