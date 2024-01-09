import express,  { Express } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import  authRouter from '../routes/auth';
import  orderRouter from '../routes/orders';
import issueRoutes from '../routes/issues';

export class Server {
      app: Express;
      port: string | number | undefined;
      authPath : string;
      orderPath : string;
      issuePath: string;


      constructor() {
            this.app = express();
            this.port = process.env.PORT;
            this.authPath = '/auth';
            this.orderPath = '/orders';
            this.issuePath = '/issues';

        // Conectar a base de datos

            this.conectarDB();
            this.middlewares();
            this.routes();
      }


        async conectarDB(): Promise<void> {
                await dbConnection();
        }


        middlewares(): void {
                this.app.use(cors());
                this.app.use(express.json());

        }

        routes(): void {
                this.app.use(this.authPath, authRouter);
                this.app.use(this.orderPath, orderRouter);
                this.app.use(this.issuePath, issueRoutes);
               
        }

        listen(): void {
                this.app.listen(this.port, () => {
                        console.log(`Servidor corriendo en puerto: ${this.port}`);
                });
        }
}