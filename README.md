# Calo Fullstack Task

## Overview

This project consists of a frontend and a backend that require Redis to run.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)

## Setup

### Step 1: Run Redis

1. Install Docker.
2. Pull the Redis image:
   ```bash
   docker pull redis
3. Run
   ```bash
   docker run --name redis-container -d -p 6379:6379 redis

### Step 2: Setup Backend (Node Js)

1. ```bash
   cd backed
2. ```bash
   npm install
3. ```bash
   npm start

### Step 2: Setup Frontend (React Js)

1. ```bash
   cd ../frontend
2. ```bash
   npm install
3. ```bash
   npm run dev
