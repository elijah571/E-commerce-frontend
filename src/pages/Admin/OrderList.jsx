import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto mt-20 px-4">
          {/* Table Wrapper for scroll on small screens */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="w-full border-b">
                <tr className="text-left">
                  <th className="pl-1 py-2">ITEMS</th>
                  <th className="pl-1 py-2">ID</th>
                  <th className="pl-1 py-2">USER</th>
                  <th className="pl-1 py-2">DATE</th>
                  <th className="pl-1 py-2">TOTAL</th>
                  <th className="pl-1 py-2">PAID</th>
                  <th className="pl-1 py-2">DELIVERED</th>
                  <th className="pl-1 py-2">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-[5rem] pt-4"
                      />
                    </td>
                    <td className="py-2">{order._id}</td>
                    <td className="py-2">{order.user ? order.user.username : "N/A"}</td>
                    <td className="py-2">
                      {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                    </td>
                    <td className="py-2">$ {order.totalPrice}</td>
                    <td className="py-2">
                      {order.isPaid ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </td>
                    <td className="py-2">
                      {order.isDelivered ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </td>
                    <td className="py-2">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                          More
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
