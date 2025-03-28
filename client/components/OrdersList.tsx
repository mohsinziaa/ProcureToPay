'use client';
import { useOrders } from '../hooks/useOrders';

export default function OrdersList({ token }: { token: string | null }) {
  const { orders, loading, error, refetch } = useOrders(token);

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!orders.length) return <div>No orders found</div>;

  return (
    <div className="orders-container">
      <h2>Purchase Orders</h2>
      <button onClick={refetch} className="refresh-btn">
        Refresh Orders
      </button>
      <pre className="orders-json">
        {JSON.stringify(orders, null, 2)}
      </pre>
    </div>
  );
}