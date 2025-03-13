import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Payment;
