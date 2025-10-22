const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
      
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
  );
};

export default Loading;
