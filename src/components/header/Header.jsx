import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillCartFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { Badge } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteItem } from "../../redux/actions/ActionCreators";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const cartData = useSelector((state) => state.addItemsReducer.cart);
  const [price, setPrice] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hadleDeleteItem = (id) => {
    dispatch(deleteItem(id));
    //  handleClose()
    toast.error("Deleted item successfully", { autoClose: 1500 });
  };

  const totalPrice = () => {
    let price = 0;
    cartData.map((data, i) => {
      price = data.price * data.qnty + price;
    });
    setPrice(price);
  };

  React.useEffect(() => {
    totalPrice();
  }, [totalPrice]);

  // console.log(price);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
        <Container>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={cartData.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <BsFillCartFill
              style={{ color: "white", fontSize: 20, cursor: "pointer" }}
            />
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {cartData.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", maxHeight: 300 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((data) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <Link
                              to={`/cartdetails/${data.id}`}
                              style={{ cursor: "pointer" }}
                              onClick={handleClose}
                            >
                              <img
                                src={data.imgdata}
                                alt=""
                                style={{ width: "5rem", height: "5rem" }}
                              />
                            </Link>
                          </td>
                          <td>
                            <p>{data.rname}</p>
                            <p>
                              <strong>Price :</strong> ₹{" "}
                              {data.price * data.qnty}
                            </p>
                            <p>
                              <strong>Quantity :</strong> {data.qnty}{" "}
                            </p>
                            <p onClick={() => hadleDeleteItem(data.id)}>
                              <AiTwotoneDelete
                                className="smalltrash"
                                color="red"
                                cursor="pointer"
                              />
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            onClick={() => hadleDeleteItem(data.id)}
                          >
                            <p>
                              <AiTwotoneDelete
                                className="largetrash"
                                color="red"
                                cursor="pointer"
                              />
                            </p>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">
                    <strong>Total : </strong>₹ {price}
                  </p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ position: "relative", width: "20rem", padding: 8 }}
            >
              <MdOutlineCancel
                className="small"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 24,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <p style={{ fontSize: 20 }}>Your cart is empty</p>
                <BsFillCartFill
                  className="emptycart_img"
                  style={{ fontSize: 28, color: "red" }}
                />
              </div>
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
