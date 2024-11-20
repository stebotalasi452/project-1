import { useState, useEffect } from "react";

function App() {
    //const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        EmployeeID: "",
        name: "",
        email: "",
    });


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/uses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Employee added successfully!");
                setUsers([...users, formData]); // Update local state
                setFormData({ EmployeeID: "", name: "", email: "" }); // Reset form
            } else {
                alert("Failed to add employee.");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            
            

            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="number"
                        name="EmployeeID"
                        value={formData.EmployeeID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default App;
