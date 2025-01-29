document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const tableBody = document.querySelector('#student-table tbody');

    // Load data from local storage
    const loadStudents = () => {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(student => addStudentToTable(student));
    };

    // Save data to local storage
    const saveToLocalStorage = (students) => {
        localStorage.setItem('students', JSON.stringify(students));
    };

    // Get students from local storage
    const getStudents = () => {
        return JSON.parse(localStorage.getItem('students')) || [];
    };

    // Add student to the table
    const addStudentToTable = (student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        // Edit button functionality
        row.querySelector('.edit').addEventListener('click', () => {
            document.getElementById('student-name').value = student.name;
            document.getElementById('student-id').value = student.id;
            document.getElementById('email').value = student.email;
            document.getElementById('contact').value = student.contact;

            // Remove the student for re-editing
            row.remove();
            saveToLocalStorage(getStudents().filter(s => s.id !== student.id));
        });

        // Delete button functionality
        row.querySelector('.delete').addEventListener('click', () => {
            row.remove();
            saveToLocalStorage(getStudents().filter(s => s.id !== student.id));
        });

        tableBody.appendChild(row);
    };

    // Form submit event
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('student-name').value.trim();
        const id = document.getElementById('student-id').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        // Validation
        if (!name || !id || !email || !contact) {
            alert('All fields are required.');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('Name must contain only letters and spaces.');
            return;
        }

        if (!/^[0-9]+$/.test(id)) {
            alert('Student ID must contain only numbers.');
            return;
        }

        if (!/^[0-9]+$/.test(contact)) {
            alert('Contact number must contain only numbers.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Create student object
        const student = { name, id, email, contact };

        // Add to table and local storage
        addStudentToTable(student);
        const students = getStudents();
        students.push(student);
        saveToLocalStorage(students);

        // Reset form
        form.reset();
    });

    loadStudents();
});