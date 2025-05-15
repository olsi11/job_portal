import { useState, useEffect } from "react";
import { supabase } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MyCompetitions() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const { data: session } = await supabase.auth.getSession();
            if (session?.session) {
                const user = session.session.user;
                const { data, error } = await supabase
                    .from("Jobs_form")
                    .select("*")
                    .eq("createdBy", user.email);
                if (error) {
                    console.error("Error fetching jobs:", error);
                } else {
                    setJobs(data);
                }
            } else {
                console.error("No active session found.");
            }
        };

        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        const { error } = await supabase.from("Jobs_form").delete().eq("id", id);
        if (error) {
            console.error("Error deleting job:", error);
        } else {
            setJobs(jobs.filter((job) => job.id !== id));
        }
    };

    const handleUpdate = (job) => {
        navigate("/createjob", { state: { product: job } }); // Pass job data as state
    };

    return (
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className="border p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-gradient-to-r from-blue-50 to-blue-100 h-full flex flex-col justify-between transform hover:scale-105 transition-transform duration-500"
                >
                    <Link to={`/job-details/${job.id}`}>
                        <div className="flex-grow">
                            {job.photo && (
                                <img
                                    src={job.photo}
                                    alt={job.name}
                                    className="w-fit h-fit h-56 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105"
                                />
                            )}
                        </div>
                    </Link>
                    <div className="px-4 py-2 flex flex-col justify-between">
                        <h3 className="text-xl font-bold text-gray-800">{job.name}</h3>
                        <p className="text-gray-700 text-sm mt-2">{job.position}</p>
                        <p className="text-2xl font-extrabold text-blue-900 mt-4">{job.salary} $</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleUpdate(job)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(job.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
            
        </div>
    );
}

export default MyCompetitions;
