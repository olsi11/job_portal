import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../Context/Context";
import { Link } from "react-router-dom";

function JobDetails() {
    const { id } = useParams(); // Get the job ID from the URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("Jobs_form")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    console.error("Error fetching job details:", error);
                } else {
                    setJob(data);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleApplyClick = () => {
        navigate(`/apply/${job.id}`); // Navigate to the apply page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            {loading ? (
                <p className="text-lg font-semibold text-gray-700">Loading...</p>
            ) : job ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-4 sm:mx-auto">
                    <div className="w-full overflow-hidden rounded-t-lg border border-gray-300 mb-4">
                        <img
                            src={job.photo}
                            alt={job.name}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{job.name}</h1>
                    <div className="space-y-3">
                        <p className="text-gray-700">
                            <span className="font-semibold">Position:</span> {job.position}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Salary:</span> {job.salary}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Email Contact:</span> {job.contactEmail}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Number Contact:</span> {job.contactNumber}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Deadline Date:</span> {job.deadline}
                        </p>
                    </div>
                    <button
                        onClick={handleApplyClick}
                        className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Apply Now
                    </button>
                </div>
            ) : (
                <p className="text-lg font-semibold text-gray-700">Job not found.</p>
            )}
        </div>
    );
}

export default JobDetails;
