const app = require("./backend/app");

const port = process.env.PORT || 3900;

app.listen(port,()=>console.log(`Server is hot @ ${port}`));