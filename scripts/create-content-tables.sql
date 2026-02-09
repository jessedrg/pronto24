-- Table to store AI-generated content for CP pages
CREATE TABLE IF NOT EXISTS cp_generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cp VARCHAR(5) NOT NULL,
  profession VARCHAR(50) NOT NULL,
  
  -- Generated content fields (match LocalEnrichment structure)
  municipio VARCHAR(255) NOT NULL,
  provincia VARCHAR(255) NOT NULL,
  comunidad_autonoma VARCHAR(255),
  poblacion_aprox VARCHAR(100),
  tipo_zona VARCHAR(20) DEFAULT 'urbana',
  clima TEXT,
  descripcion_local TEXT NOT NULL,
  problemas_locales JSONB NOT NULL DEFAULT '[]',
  infraestructura TEXT,
  barrios_zonas JSONB DEFAULT '[]',
  datos_unicos JSONB DEFAULT '[]',
  
  -- SEO fields
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  
  -- FAQ content (array of {question, answer})
  faqs JSONB DEFAULT '[]',
  
  -- Tracking
  model_used VARCHAR(100),
  generation_batch VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Unique constraint: one generated content per CP + profession
  UNIQUE(cp, profession)
);

-- Indexing queue for Google Indexing API
CREATE TABLE IF NOT EXISTS indexing_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  cp VARCHAR(5) NOT NULL,
  profession VARCHAR(50) NOT NULL,
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending',  -- pending, submitted, indexed, error
  submitted_at TIMESTAMP,
  indexed_at TIMESTAMP,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(url)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_cp_content_lookup ON cp_generated_content(cp, profession);
CREATE INDEX IF NOT EXISTS idx_cp_content_cp ON cp_generated_content(cp);
CREATE INDEX IF NOT EXISTS idx_indexing_queue_status ON indexing_queue(status);
CREATE INDEX IF NOT EXISTS idx_indexing_queue_pending ON indexing_queue(status, created_at) WHERE status = 'pending';

-- Table to track generation progress and stats
CREATE TABLE IF NOT EXISTS content_generation_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id VARCHAR(50) NOT NULL,
  total_generated INTEGER DEFAULT 0,
  total_errors INTEGER DEFAULT 0,
  total_indexed INTEGER DEFAULT 0,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  error_log JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'running'  -- running, completed, failed
);
