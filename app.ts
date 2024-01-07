import express from 'express';
import { Server } from './models/server';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const server = new Server();

server.app.use(express.static(path.join(__dirname, './index.html')));

server.listen();


