const cors = require('cors');

app.use(cors({
    origin: '*',
    credentials: true,
  }));