import express from 'express';
import { Server } from './models/server';
import dotenv from 'dotenv';

dotenv.config();

const server = new Server();

server.app.get('/docs', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/31585662/2s9YsJBCcT');
  });

server.listen();


