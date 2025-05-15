import { useState, useEffect } from "react";
import { supabase } from "../../Context/Context";
import { useNavigate, useLocation } from "react-router-dom";
import Inputs from "../../components/Inputs/Inputs";
import Button from "../../components/Button/Button";

function CreateJob() {
    const navigate = useNavigate();
    const location = useLocation();
    const productToEdit = location.state?.product || null;

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState(0);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState([]);
    const [contactNumber, setContactNumber] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setCreatedBy(session.user.email);
            }
        };

        fetchUserData();

        if (productToEdit) {
            setName(productToEdit.name);
            setPosition(productToEdit.position);
            setSalary(productToEdit.salary);
            setCategory(productToEdit.category);
            setPhoto(productToEdit.photo || []);
            setContactNumber(productToEdit.contactNumber || "");
            setContactEmail(productToEdit.contactEmail || "");
            setDeadline(productToEdit.deadline || "");
        }
    }, [productToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !position || !salary || !category || !photo || !contactNumber || !contactEmail) {
            alert("Please fill in all fields");
            return;
        }

        if (productToEdit) {
            // Update existing job
            const { error } = await supabase
                .from("Jobs_form")
                .update({
                    name,
                    position,
                    salary,
                    category,
                    photo: Array.isArray(photo) ? photo : [photo],
                    contactNumber,
                    contactEmail,
                })
                .eq("id", productToEdit.id);

            if (error) {
                console.error("Error updating job:", error);
            } else {
                console.log("Job updated successfully!");
                navigate("/my-competitions");
            }
        } else {
            // Create new job
            const { error } = await supabase
                .from("Jobs_form")
                .insert([
                    {
                        name,
                        position,
                        salary,
                        category,
                        photo: Array.isArray(photo) ? photo : [photo],
                        contactNumber,
                        contactEmail,
                        deadline,
                        createdBy,
                    },
                ]);

            if (error) {
                console.error("Error creating job:", error);
            } else {
                console.log("Job created successfully!");
                navigate("/my-competitions");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {productToEdit ? "Edit Job" : "Create Job"}
                </h2>
                <div className="space-y-6">
                    <Inputs
                        label="Name"
                        type="text"
                        id="name"
                        placeholder="Name of the company"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        label="Position"
                        type="text"
                        id="position"
                        placeholder="e.g. Software Engineer"
                        name="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        label="Salary"
                        type="number"
                        id="salary"
                        placeholder="Salary"
                        name="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        label="Category"
                        type="text"
                        id="category"
                        placeholder="e.g. IT, Marketing"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        label="Photo URL"
                        type="url"
                        id="photo"
                        name="photo"
                        placeholder="Enter photo URL"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        label="Contact Number"
                        type="text"
                        id="contactNumber"
                        placeholder="Enter contact number"
                        name="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        label="Contact Email"
                        type="email"
                        id="contactEmail"
                        placeholder="Enter contact email"
                        name="contactEmail"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        label="Deadline"
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    text={productToEdit ? "Update Job" : "Create Job"}
                />
            </form>
        </div>
    );
}

export default CreateJob;