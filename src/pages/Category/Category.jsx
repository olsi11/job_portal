import React, { useState, useEffect } from "react";
import { supabase } from "../../Context/Context";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/CategoryItems/CategoryItem";
import { Link } from "react-router-dom";

function Category() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from("Jobs_form")
                .select("*")
                .eq("category", categoryName);

            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data);
            }
            setIsLoading(false);
        };

        fetchProducts();
    }, [categoryName]);

    if (isLoading) {
        return <div className="text-center text-2xl">Loading products...</div>;
    }

    return (
        <div>
            <header className="flex flex-col items-center mt-4 mb-4 px-4">
                <h1 className="text-2xl font-bold text-center mb-2">
                    Products in {categoryName} Category
                </h1>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products.map((product) => (
<ProductItem 
    key={product.id} 
    product={product}
    onDelete={(id) => console.log(`Deleted product with id: ${id}`)} 
    onEdit={(id) => console.log(`Edit product with id: ${id}`)} 
/>
                ))}
            </div>
        </div>
    );
}

export default Category;