import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = "https://restorentproject.onrender.com/api";

function OrderPage() {
  const [cart, setCart] = useState([]);
  const [deliveryType, setDeliveryType] = useState("Pickup");
  const [coupon, setCoupon] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/menu`)
      .then((response) => setMenuItems(response.data.items || []))
      .catch(() => toast.error("Could not load the menu"))
      .finally(() => setLoadingMenu(false));
  }, []);

  const addItem = (item) => {
    setCart((current) => {
      const existing = current.find((entry) => entry._id === item._id);
      if (existing) {
        return current.map((entry) =>
          entry._id === item._id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((current) =>
      current
        .map((item) => (item._id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const submitOrder = async () => {
    if (!cart.length)
      return toast.error("Add an item before placing your order");
    try {
      setSubmitting(true);
      const token = localStorage.getItem("barToken");
      if (!token) return toast.error("Please login to place an order");

      const response = await axios.post(
        `${API}/orders`,
        {
          items: cart.map((item) => ({
            menuItem: item._id,
            quantity: item.quantity,
          })),
          deliveryType,
          coupon,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(
        `Order submitted — total $${response.data.order.total.toFixed(2)}`,
      );
      setCart([]);
      setCoupon("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <h1 className="text-3xl font-semibold text-white">Online Ordering</h1>
        <p className="mt-4 max-w-3xl text-slate-300 leading-8">
          Choose items, update quantities, apply a coupon, and place your pickup
          or delivery order.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
          <h2 className="text-2xl font-semibold text-white">Menu Items</h2>
          <div className="grid gap-4">
            {loadingMenu ? (
              <p className="text-slate-400">Loading menu…</p>
            ) : menuItems.length === 0 ? (
              <p className="text-slate-400">
                No menu items are currently available.
              </p>
            ) : (
              menuItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-3xl bg-slate-900/80 p-4"
                >
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(item)}
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-400"
                  >
                    Add
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
          <h2 className="text-2xl font-semibold text-white">Cart</h2>
          <div className="mt-6 space-y-4">
            {cart.length === 0 ? (
              <p className="text-slate-400">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="rounded-3xl bg-slate-900/80 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, Number(e.target.value))
                      }
                      className="w-20 rounded-3xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 rounded-3xl bg-slate-900/80 p-5 text-slate-300">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span>Coupon</span>
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="HAPPYHOUR"
                className="ml-3 w-40 rounded-3xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span>Delivery type</span>
              <select
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
                className="rounded-3xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100"
              >
                <option>Pickup</option>
                <option>Delivery</option>
              </select>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Your final total, including any valid coupon, is confirmed when
              the order is placed.
            </p>
            <div className="mt-6 flex items-center justify-between text-white">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={submitOrder}
            disabled={submitting || cart.length === 0}
            className="mt-6 w-full rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
