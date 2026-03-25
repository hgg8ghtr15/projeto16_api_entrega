import { app } from "@/app";
const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Server executando em http://localhost:${PORT}`);
});