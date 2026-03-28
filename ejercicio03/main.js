const http = require("http");
const repo = require("./repository/studentsRepository");

const PORT = 4000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const { method, url } = req;

    if (url === "/students" && method === "GET") {
        res.statusCode = 200;
        res.end(JSON.stringify(repo.getAll()));
    } 
    else if (url.startsWith("/students/") && method === "GET") {
        const id = parseInt(url.split("/")[2]);
        const student = repo.getById(id);
        if (student) {
            res.statusCode = 200;
            res.end(JSON.stringify(student));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }

    else if (url === "/students" && method === "POST") {
        let body = "";
        req.on("data", chunk => (body += chunk));
        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                const { name, email, course, phone } = data;
                if (!name || !email || !course || !phone) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ 
                        error: "Faltan campos obligatorios: name, email, course o phone" 
                    }));
                }
                const newStudent = repo.create(data);
                res.statusCode = 201;
                res.end(JSON.stringify(newStudent));
            } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "JSON inválido" }));
            }
        });
    }

    else if (url === "/ListByStatus" && method === "POST") {
        let body = "";
        req.on("data", chunk => (body += chunk));
        req.on("end", () => {
            try {
                if (!body) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ error: "El cuerpo de la petición está vacío" }));
                }

                const parsedData = JSON.parse(body);
                const { status } = parsedData;
                
                const filtered = repo.getByStatus(status || "");
                res.statusCode = 200;
                res.end(JSON.stringify(filtered));
            } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "JSON mal formado o vacío" }));
            }
        });
    }

    // --- POST /ListByGrade ---
    else if (url === "/ListByGrade" && method === "POST") {
        let body = "";
        req.on("data", chunk => (body += chunk));
        req.on("end", () => {
            const { grade } = JSON.parse(body);
            const filtered = repo.getByGrade(grade);
            res.statusCode = 200;
            res.end(JSON.stringify(filtered));
        });
    }

    else if (url.startsWith("/students/") && method === "PUT") {
        const id = parseInt(url.split("/")[2]);
        let body = "";
        req.on("data", chunk => (body += chunk));
        req.on("end", () => {
            const updated = repo.update(id, JSON.parse(body));
            res.statusCode = updated ? 200 : 404;
            res.end(JSON.stringify(updated || { error: "No encontrado" }));
        });
    }

    else if (url.startsWith("/students/") && method === "DELETE") {
        const id = parseInt(url.split("/")[2]);
        const deleted = repo.remove(id);

        if (deleted) {
            res.statusCode = 204;
            res.end(); 
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado para eliminar" }));
        }
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Ruta no encontrada" }));
    }
});

server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));