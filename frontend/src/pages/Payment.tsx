import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Mock function to simulate fetching customers
const getCustomers = async () => {
  return [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];
};

const Payment = () => {
  const navigate = useNavigate();
  interface Customer {
    id: number;
    name: string;
  }
  
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers() as Customer[];
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold">Choose Payment Method</h2>
      <div className="space-x-6 mt-4">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg" onClick={() => navigate("/order-complete")}>
          Card
        </button>
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg" onClick={() => navigate("/order-complete")}>
          Cash
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl">Customers:</h3>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>{customer.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Payment;
