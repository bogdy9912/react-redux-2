import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { addItem, removeItem } from "../../store/cart-slice";

const CartItem = (props) => {
  const { id, title, quantity, totalPrice, price } = props.item;

  const dispatch = useDispatch();

  const handleAddItem = (id) => {
    dispatch(addItem({ id }));
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice}{" "}
          <span className={classes.itemprice}>(${price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => handleRemoveItem(id)}>-</button>
          <button onClick={() => handleAddItem(id)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
