import cluster from 'cluster';
import os from 'os';
import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './index'; // Import your express app

dotenv.config();
const PORT = parseInt(process.env.PORT || '3000', 10);
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process is running, forking ${numCPUs - 1} workers...`);

  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart worker
  });
} else {
  const workerPort = PORT + cluster.worker?.id;
  createServer(app).listen(workerPort, () => {
    console.log(`Worker ${process.pid} is running on port ${workerPort}`);
  });
}
