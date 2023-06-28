const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
const { Client } = require('ssh2');