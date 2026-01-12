import { useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

export default function TestApi() {
  const [testResult, setTestResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setTestResult("Testing API connection...");

    try {
      // Test GET
      setTestResult("Fetching products...");
      const products = await getProducts();
      setTestResult(`✅ GET Success: Found ${products.length} products`);

      // Test POST
      setTestResult("Testing POST (create product)...");
      const testProduct = {
        name: "Test Product",
        price: 100000,
        category: "Test",
        stock: 10,
        image: "https://example.com/test.jpg",
      };

      const createdProduct = await createProduct(testProduct);
      setTestResult(
        `✅ POST Success: Created product with ID ${createdProduct.id}`,
      );

      // Test PUT
      setTestResult("Testing PUT (update product)...");
      const updatedProduct = await updateProduct(createdProduct.id, {
        ...testProduct,
        name: "Updated Test Product",
      });
      setTestResult(
        `✅ PUT Success: Updated product to "${updatedProduct.name}"`,
      );

      // Test DELETE
      setTestResult("Testing DELETE...");
      await deleteProduct(createdProduct.id);
      setTestResult("✅ DELETE Success: Deleted test product");

      // Final verification
      setTestResult(
        "🎉 All API tests passed! MockAPI integration is working correctly.",
      );
    } catch (error) {
      setTestResult(`❌ API Test Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          MockAPI Integration Test
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-4">
            This will test all CRUD operations with MockAPI to ensure
            integration is working correctly.
          </p>

          <button
            onClick={testApiConnection}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {loading ? "Testing..." : "Start API Test"}
          </button>

          {testResult && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                testResult.includes("❌")
                  ? "bg-red-50 border border-red-200 text-red-700"
                  : testResult.includes("🎉")
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-blue-50 border border-blue-200 text-blue-700"
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {testResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
