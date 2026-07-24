export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <div className="text-center mb-14">
        <p className="text-pink-600 font-semibold tracking-widest uppercase">
          Shop by Category
        </p>

        <h2 className="text-5xl font-bold mt-3">
          Featured Categories
        </h2>

        <p className="text-gray-500 mt-4">
          Explore our most popular shopping categories.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
          <div className="text-5xl mb-4">👗</div>
          <h3 className="text-xl font-bold">Fashion</h3>
          <p className="text-gray-500 mt-2">Latest trendy outfits</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
          <div className="text-5xl mb-4">💄</div>
          <h3 className="text-xl font-bold">Beauty</h3>
          <p className="text-gray-500 mt-2">Premium cosmetics</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
          <div className="text-5xl mb-4">📱</div>
          <h3 className="text-xl font-bold">Electronics</h3>
          <p className="text-gray-500 mt-2">Smart gadgets</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-xl font-bold">Home</h3>
          <p className="text-gray-500 mt-2">Modern home essentials</p>
        </div>

      </div>
    </section>
  );
}