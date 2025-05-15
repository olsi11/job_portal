import React, { useState, useEffect } from "react";
import Inputs from "../../components/Inputs/Inputs";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from "../../Context/Context";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Business");
    const navigate = useNavigate(); // Removed unused variable warning

    const handleSignUp = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        role,
                    },
                },
            });
            try {
                const { error } = await supabase.from("users").insert([
                    {
                        id: data.user.id,
                        username: username,
                        email: email,
                        role: role,
                    },
                ]);
    
                if (error) {
                    console.error("Error saving user to database:", error.message);
                } else {
                    console.log("User saved to database successfully");
                }
            } catch (err) {
                console.error("Unexpected error saving user to database:", err);
            }
            if (error) {
                console.error("Error signing up:", error.message);
                return;
            }
console.log(data.user);


        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    useEffect(() => {
        console.log(supabase.auth.admin.listUsers().then((test) => console.log(test.data)));
    }, []);
    
   


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h1>
                <div className="space-y-4">
                    <Inputs
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Inputs
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Business">Business</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
                <Button
                    text="Sign Up"
                    onClick={handleSignUp}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-6"
                />
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        
        </div>

    );
}

export default SignUp; // Corrected syntax error
