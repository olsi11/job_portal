import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../Context/Context";
import { useNavigate } from "react-router-dom";



function Notify() {
    const [jobForms, setJobForms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobForms = async () => {
            try {
                const { data, error } = await supabase
                    .from('Jobs_form')
                    .select('*');
                if (error) {
                    console.error("Error fetching data:", error);
                } else {
                    setJobForms(data);
                    console.log("Number of job forms:", data.length);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        fetchJobForms();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                {jobForms.length > 0 ? (
                    jobForms.map((form) => (
                        <div key={form.id} className="border-b py-4">
                            <h2 className="text-lg font-semibold">{form.job_title}</h2>
                            <p>{form.name}</p>
                            <button
                                onClick={() => navigate(`/job-details/${form.id}`)}
                                className="mt-2 text-blue-500 hover:underline"
                            >
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No notifications available.</p>
                )}
            </div>
        </div>
    );
}
export default Notify;