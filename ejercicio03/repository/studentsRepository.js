let students = [
    {
        id: 1,
        name: "Juan Pérez",
        grade: 20,
        age: 23,
        email: "juan.perez@ejemplo.com",
        phone: "+51 987654321",
        enrollmentNumber: "2025001",
        course: "Diseño y Desarrollo de Software C24",
        year: 3,
        subjects: ["Algoritmos", "Bases de Datos", "Redes"],
        gpa: 3.8,
        status: "Activo",
        admissionDate: "2022-03-01"
    },
    {
        id: 2,
        name: "Ana García",
        grade: 18,
        age: 21,
        email: "ana.garcia@outlook.com",
        phone: "+51 955444333",
        enrollmentNumber: "2025002",
        course: "Diseño y Desarrollo de Software C24",
        year: 2,
        subjects: ["Frontend", "Backend", "UX/UI"],
        gpa: 3.9,
        status: "Inactivo",
        admissionDate: "2023-03-15"
    },
    {
        id: 3,
        name: "Carlos Mendoza",
        grade: 20,
        age: 24,
        email: "c.mendoza@universidad.edu.pe",
        phone: "+51 912345678",
        enrollmentNumber: "2025003",
        course: "Diseño y Desarrollo de Software C24",
        year: 4,
        subjects: ["Seguridad Informática", "Gestión de Proyectos"],
        gpa: 3.5,
        status: "Activo",
        admissionDate: "2021-08-10"
    },
    {
        id: 4,
        name: "Lucía Torres",
        grade: 15,
        age: 20,
        email: "ltorres@gmail.com",
        phone: "+51 966777888",
        enrollmentNumber: "2025004",
        course: "Diseño y Desarrollo de Software C24",
        year: 1,
        subjects: ["Introducción a la Programación"],
        gpa: 3.2,
        status: "Graduado",
        admissionDate: "2020-03-01"
    },
    {
        id: 5,
        name: "Roberto Gómez",
        grade: 12,
        age: 22,
        email: "rgomez88@ejemplo.com",
        phone: "+51 933222111",
        enrollmentNumber: "2025005",
        course: "Arquitectura de Sistemas",
        year: 3,
        subjects: ["Infraestructura", "Cloud"],
        gpa: 2.8,
        status: "Activo",
        admissionDate: "2022-01-20"
    }
];

function getAll() { return students; }

function getById(id) { return students.find(s => s.id === id); }

function getByStatus(status) {
    return students.filter(s => s.status.toLowerCase() === status.toLowerCase());
}

function getByGrade(grade) {
    return students.filter(s => s.grade === parseInt(grade));
}

function create(studentData) {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = { id: newId, ...studentData };
    students.push(newStudent);
    return newStudent;
}

function update(id, updateData) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updateData };
        return students[index];
    }
    return null;
}

function remove(id) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) return students.splice(index, 1)[0];
    return null;
}

module.exports = { getAll, getById, getByStatus, getByGrade, create, update, remove };