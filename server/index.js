const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 1007;
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const routes = require("./src/routes/index")

app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Server is running');
});

router.use("/", routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
