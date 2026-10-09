import { useDispatch, useSelector } from "react-redux";

import { removeItem } from "../features/cart/cartSlice";
import type { RootState } from "../store/store";
import "./CartPage.css";

function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="cart-page">
      <h1>Cart</h1>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.length > 0 && (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <article
                key={`${item.id}-${item.productType}`}
                className="cart-item"
              >
                {item.poster && (
                  <img src={item.poster} alt={`${item.title} poster`} />
                )}

                <div className="cart-item-info">
                  <h2>{item.title}</h2>
                  <p>{item.price} SEK</p>

                  <button
                    onClick={() =>
                      dispatch(
                        removeItem({
                          id: item.id,
                          productType: item.productType,
                        }),
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-total">
            <strong>Total: {total} SEK</strong>
          </div>
        </>
      )}
    </main>
  );
}

export default CartPage;
