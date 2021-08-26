const router = require("express").Router();
const { User, Artist, Show} = require("../models");
const withAuth = require("../utils/auth");

