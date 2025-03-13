const OrderComplete = () => {
  const orderNumber = Math.floor(1000 + Math.random() * 9000); // Random order number

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold">Your Order is Complete!</h2>
      <p className="text-5xl mt-4 font-bold">Order #{orderNumber}</p>
    </div>
  );
};

export default OrderComplete;
