import Image from "next/image";
import React from "react";
import { format, subDays } from "date-fns";
import { useFetchOrderByDateQuery } from "@/query/getOrderBydate";

interface GenerateReportProps {}

const GenerateReport: React.FC<GenerateReportProps> = () => {
  const today: Date = new Date();
  const yesterday: Date = subDays(today, 1);
  const formattedDate: string = format(yesterday, "dd-MM-yyyy");
  const formattedDatewithday: string = format(yesterday, "dd-MM-yyyy (EEEE)");

  const { data, isLoading, isError } = useFetchOrderByDateQuery();

  return (
    <>
      <div className="bg-red-500 flex flex-row h-16 mb-1 border border-black  items-center w-full">
        <div className="justify-end ml-6">
          <Image
            src="/images/reportLogo.png"
            height={50}
            width={50}
            alt="Generate Logo"
          />
        </div>
        <div className="flex-grow text-white text-center">
          <h1 className="text-md font-bold">
            WEBSITE SELLING REPORT - {formattedDatewithday}
          </h1>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col border border-black">
          <div className="flex text-sm font-semibold">
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center whitespace-nowrap">
              Date
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center whitespace-nowrap">
              Campaign Name
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center whitespace-nowrap">
              Clicks
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center whitespace-nowrap">
              Spend
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center whitespace-nowrap">
              Item
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center whitespace-nowrap">
              Qty
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center">
              Coupon
              <br />
              <span className="text-black">(AED)</span>
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center">
              Smile Points <br />
              <span className="text-black">(AED)</span>
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center whitespace-nowrap">
              Shipping
            </div>
            <div className="flex-1 px-1 py-2 border-b border-r border-black text-center">
              Commision <br />
              <span className="text-danger">(Dubai Store)</span>
            </div>
            <div className="flex-1 px-1 py-2 border-b  border-black text-center whitespace-nowrap">
              Sales
            </div>
          </div>

          {/* Advertismenet Column */}
          <div className="flex justify-center text-xs font-semibold">
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap">
              {formattedDate}
            </div>
            <div className="flex-1 px-1 py-2 border-b text-center border-r border-slate-500 whitespace-nowrap">
              New Sales Ad
            </div>
            <div
              className="flex-1 px-1 py-2 border-b text-center border-r border-slate-500 whitespace-nowrap"
              contentEditable
            ></div>
            <div
              className="flex-1 px-1 py-2 border-b text-center border-r border-slate-500 whitespace-nowrap"
              contentEditable
            ></div>
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
            <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
          </div>

          {/* Advertismenet Column Closed */}
          {data?.orders?.map((order: any, i: number) =>
            order.cart.cartItems.map((item: any, index: number) => (
              <div
                className={`flex justify-center text-xs font-semibold ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-200"
                }`}
                key={i * index}
              >
                <div className="flex-1 px-1 py-2 border-b border-r border-slate-500 text-center whitespace-nowrap">
                  {formattedDate}
                </div>
                <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
                <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
                <div className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
                <div
                  className="flex-1 px-1 py-2 border-b border-r text-center border-slate-500 whitespace-nowrap"
                  contentEditable
                >
                  {item.productCode[0]} <br />
                  <span className="text-green-500">
                    {order.userAgent === "android" || ("ios" && "(MOBILE APP)")}
                  </span>
                </div>
                <div
                  className="flex-1 px-1 py-2 border-b border-r text-center  border-slate-500 whitespace-nowrap"
                  contentEditable
                >
                  {item.productQuantity}
                </div>
                <div
                  className={`flex-1 px-1 py-2  border-r text-center border-slate-500 ${
                    i % 2 !== 2 && index === 0 ? "border-t " : ""
                  }`}
                  contentEditable
                >
                  {parseInt(order?.discount).toFixed(2)}
                </div>
                <div
                  className={`flex-1 px-1 py-2  border-r text-center border-slate-500 ${
                    i % 2 !== 2 && index === 0 ? "border-t " : ""
                  }`}
                  contentEditable
                >
                  {order?.smilepoints.toFixed(2)}
                </div>
                <div
                  className={`flex-1 px-1 py-2  border-r text-center border-slate-500 ${
                    i % 2 !== 2 && index === 0 ? "border-t " : ""
                  }`}
                  contentEditable
                >
                  {order?.shipping === 0 ? 20 : order?.shipping.toFixed(2)}
                </div>
                <div
                  className={`flex-1 px-1 py-2  border-r text-center border-slate-500 ${
                    i % 2 !== 2 && index === 0 ? "border-t " : ""
                  }`}
                  contentEditable
                >
                  0
                </div>
                <div
                  className={`flex-1 px-1 py-2  text-center border-slate-500 ${
                    i % 2 !== 2 && index === 0 ? "border-t " : ""
                  }`}
                >
                  {item?.discountedPrice}
                </div>
              </div>
            ))
          )}

          <div className="flex justify-center text-xs font-semibold bg-red-100">
            <div className="flex-1 px-2 py-4 border-b text-center border-slate-500 col-span-2 font-bold text-base">
              Total
            </div>
            <div className="flex-1 px-2 py-4 border-b text-center border-r border-slate-500 whitespace-nowrap"></div>
            <div
              className="flex-1 px-2 py-4 border-b text-center border-r border-slate-500 whitespace-nowrap font-bold text-sm"
              contentEditable
            ></div>
            <div
              className="flex-1 px-2 py-4 border-b text-center border-r border-slate-500 whitespace-nowrap font-bold text-sm"
              contentEditable
            ></div>
            <div className="flex-1 px-2 py-4 border-b border-r text-center border-slate-500 whitespace-nowrap"></div>
            <div className="flex-1 px-2 py-4 border-b border-r text-center border-slate-500 whitespace-nowrap font-bold text-sm">
              {data?.orders?.reduce(
                (sum: number, current: any) =>
                  sum +
                  current.cart.cartItems.reduce(
                    (itemSum: number, currentItem: any) =>
                      itemSum + currentItem.productQuantity,
                    0
                  ),
                0
              )}
              <br />
              <span className="">PC</span>
            </div>
            <div className="flex-1 px-2 py-4 border-b border-r text-center border-slate-500 whitespace-nowrap font-bold text-sm">
              {data?.orders
                ?.reduce((sum: number, current: any) => {
                  const discount: number = parseInt(current.discount);
                  return sum + discount;
                }, 0)
                .toFixed(2)}
              <br />
              <span className="">AED</span>
            </div>
            <div className="flex-1 px-2 py-4 border-b border-r text-center border-slate-500 whitespace-nowrap font-bold text-sm">
              {data?.orders
                ?.reduce((sum: number, current: any) => {
                  const discount: number = parseInt(current.smilepoints);
                  return sum + discount;
                }, 0)
                .toFixed(2)}
              <br />
              <span className="">AED</span>
            </div>
            <div
              className="flex-1 px-2 py-4 border-b border-r text-center border-slate-500 whitespace-nowrap font-bold text-sm"
              contentEditable
            >
              0.00
              <br />
              <span className="">AED</span>
            </div>
            <div className="flex-1 px-2 py-4 border-b border-r text-center border-slate-500 whitespace-nowrap font-bold text-sm">
              0.00
              <br />
              <span className="">AED</span>
            </div>
            <div className="flex-1 px-2 py-4 border-b border-r text-center border-slate-500 whitespace-nowrap font-bold text-sm">
              {data?.orders
                ?.reduce((sum: number, current: any) => {
                  const subtotal: number = parseInt(current.subtotal);
                  return sum + subtotal;
                }, 0)
                .toFixed(2)}
              <br />
              <span className="">AED</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-500 flex flex-row h-16 mb-1 border border-black  items-center w-full justify-between">
        <div className="justify-end ml-6 text-white">Balance</div>
        <div className="justify-end ml-16 text-white">AED</div>
        <div className="flex-grow text-white text-center">
          <h1 className="text-md font-bold" contentEditable>
            {data?.orders
              ?.reduce((sum: number, current: any) => {
                const subtotal: number = parseInt(current.subtotal);
                return sum + subtotal;
              }, 0)
              .toFixed(2)}
          </h1>
        </div>
      </div>
    </>
  );
};

export default GenerateReport;
