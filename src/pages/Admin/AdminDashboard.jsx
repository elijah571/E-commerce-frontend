import Chart from "react-apexcharts";
import Loader from "../../Components/Loader";
import OrderList from "./OrderList";
import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <section className="xl:ml-[4rem] md:ml-[0rem] mt-32 px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Cards - Sales, Customers, and Orders */}
      <div className="w-full flex flex-wrap justify-between gap-4 lg:gap-8">
        {/* Sales Card */}
        <div className="rounded-lg bg-black p-5 w-full sm:w-[20rem] lg:w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
            $
          </div>
          <p className="mt-5">Sales</p>
          <h1 className="text-xl font-bold">
            {isLoading ? <Loader /> : `$${sales.totalSales.toFixed(2)}`}
          </h1>
        </div>

        {/* Customers Card */}
        <div className="rounded-lg bg-black p-5 w-full sm:w-[20rem] lg:w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
            $
          </div>
          <p className="mt-5">Customers</p>
          <h1 className="text-xl font-bold">
            {isLoading ? <Loader /> : customers?.length}
          </h1>
        </div>

        {/* Orders Card */}
        <div className="rounded-lg bg-black p-5 w-full sm:w-[20rem] lg:w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
            $
          </div>
          <p className="mt-5">All Orders</p>
          <h1 className="text-xl font-bold">
            {isLoading ? <Loader /> : orders?.totalOrders}
          </h1>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full mt-[4rem] flex justify-center">
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width="100%"
          height={400}
        />
      </div>

      {/* Order List */}
      <div className="mt-[4rem]">
        <OrderList />
      </div>
    </section>
  );
};

export default AdminDashboard;
