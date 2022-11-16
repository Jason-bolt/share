const express = require('express')
const dotenv = require('dotenv')


// Load config variables
dotenv.config({ path: './config/config.env' })

// Initializing app
const app = express()