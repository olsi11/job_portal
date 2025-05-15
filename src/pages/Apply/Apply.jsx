import { useState, useEffect } from "react";
import { supabase } from "../../Context/Context";
import { useParams, useNavigate } from "react-router-dom";

function Apply() {
    const { id } = useParams(); // Get the job ID from the URL
    console.log("Job ID:", id);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [createdBy, setCreatedBy] = useState(""); // State to store the creator's ID
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState(null);

    useEffect(() => {
        // Fetch the createdBy field from the Job_form table
        const fetchCreatedBy = async () => {
            try {
                const { data, error } = await supabase
                    .from("Job_form")
                    .select("createdBy")
                    

                if (error) {
                    console.error("Error fetching job creator:", error.message);
                    return;
                }

                setCreatedBy(data?.createdBy);
            } catch (error) {
                console.error("Error fetching job creator:", error.message);
            }
        };

        fetchCreatedBy();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log({
                name,
                email,
                phone,
                coverLetter,
                job_id: id, // Use id directly as string
                createdBy, 
            });

            const { error } = await supabase
                .from("Apply_form")
                .insert([{ name, email, phone, coverLetter, job_id: id, createdBy }]); // Include createdBy

            if (error) {
                console.error("Error inserting application:", error.message);
                alert("Failed to submit application. Please try again.");
                return;
            }

            alert("Application submitted successfully!");
            navigate(-1);
        } catch (error) {
            console.error("Error submitting application:", error.message);
            alert("Failed to submit application. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading ? (
                <p className="text-center text-lg md:text-xl">Loading...</p>
            ) : job ? (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-2xl">
                    <div className="w-full overflow-hidden rounded-t-lg border border-gray-300">
                        <img
                            src={job.photo}
                            alt={job.name}
                            className="w-full h-48 md:h-64 object-cover"
                        />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold mb-4">{job.name}</h1>
                    <p className="text-gray-700 mb-4">Position: {job.position}</p>
                    <p className="text-gray-700 mb-4">Salary: {job.salary}</p>
                    <button
                        onClick={handleApplyClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Apply Now
                    </button>
                </div>
            ) : (
                <p className="text-center text-lg md:text-xl">Job not found.</p>
            )}
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-blue-500 font-extrabold mb-8">Application Form</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white text-gray-800 shadow-2xl rounded-lg px-6 md:px-10 pt-8 pb-10 mb-6 w-full max-w-md md:max-w-lg"
            >
                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 text-sm md:text-base font-semibold mb-2">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-2 md:py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                        Phone:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="coverLetter" className="block text-gray-700 text-sm font-semibold mb-2">
                        Cover Letter:
                    </label>
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows="4"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        required
                        className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-green-500 transition-colors duration-300 text-white font-bold py-2 md:py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Submit Application
                </button>
            </form>
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 hover:underline mt-6 text-lg font-medium"
            >
                Back to Job Details
            </button>
        </div>
    );
}

export default Apply;
