import { Pool, PoolClient } from 'pg';

// Create connection pool
let pool: Pool | null = null;

/**
 * Get or create the database connection pool
 * Lazy initialization to avoid connection issues during build time
 */
export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error(
        'DATABASE_URL is not configured. Please set up PostgreSQL connection string in .env.local'
      );
    }

    pool = new Pool({
      connectionString: databaseUrl,
      // Neon-specific settings for serverless
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      allowExitOnIdle: true,
    });

    pool.on('error', (error) => {
      console.error('[DB] Unexpected connection pool error:', error);
      // Don't terminate the pool on error - let it recover
    });
  }

  return pool;
}

/**
 * Execute a query with the pool
 */
export async function queryDatabase(
  query: string,
  values?: any[]
): Promise<any> {
  const client = await getPool().connect();

  try {
    const result = await client.query(query, values);
    return result;
  } finally {
    client.release();
  }
}

/**
 * Initialize database schema
 * Call this once during deployment to create tables
 */
export async function initializeDatabase(): Promise<void> {
  const client = await getPool().connect();

  try {
    // Create donations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(255) NOT NULL UNIQUE,
        payment_id VARCHAR(255) NOT NULL UNIQUE,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'INR',
        donor_name VARCHAR(255),
        donor_email VARCHAR(255),
        donor_phone VARCHAR(20),
        donor_message TEXT,
        status VARCHAR(50) DEFAULT 'completed',
        razorpay_notes JSONB,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_donations_payment_id ON donations(payment_id);
      CREATE INDEX IF NOT EXISTS idx_donations_order_id ON donations(order_id);
      CREATE INDEX IF NOT EXISTS idx_donations_donor_email ON donations(donor_email);
      CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
    `);

    // Create contacts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
    `);

    // Create applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(255) NOT NULL,
        cover_letter TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
      CREATE INDEX IF NOT EXISTS idx_applications_role ON applications(role);
      CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
    `);

    // Create support_cases table
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_cases (
        id SERIAL PRIMARY KEY,
        case_id VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        service_type VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        opposing_party VARCHAR(255),
        court_deadline TIMESTAMP,
        department VARCHAR(100),
        status VARCHAR(50) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_support_cases_case_id ON support_cases(case_id);
      CREATE INDEX IF NOT EXISTS idx_support_cases_email ON support_cases(email);
      CREATE INDEX IF NOT EXISTS idx_support_cases_service_type ON support_cases(service_type);
      CREATE INDEX IF NOT EXISTS idx_support_cases_status ON support_cases(status);
      CREATE INDEX IF NOT EXISTS idx_support_cases_created_at ON support_cases(created_at);
    `);

    // Create jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        commitment VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        open BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_jobs_open ON jobs(open);
      CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);
    `);

    // Create events table
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_events_published ON events(published);
      CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
      CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
    `);

    console.log('✅ Database schema initialized successfully with all tables');
  } catch (error: any) {
    // Table might already exist
    if (!error.message.includes('already exists')) {
      throw error;
    }
  } finally {
    client.release();
  }
}

/**
 * Close the database connection pool
 * Call this during graceful shutdown
 */
export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
