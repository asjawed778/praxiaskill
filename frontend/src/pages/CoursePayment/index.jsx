import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { Country, State } from "country-state-city";
import {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} from "../../services/payment.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  country: yup.object().required("Country is required"),
  state: yup.object().required("State is required"),
  city: yup.string().required("City is required"),
  village: yup.string().required("Village is required"),
  //   paymentMethod: yup.string().required("Payment method is required"),
  couponCode: yup.string(),
});

const CoursePayment = () => {
  const { courseId } = useParams();
  const [createPaymentOrder, { isLoading, isError }] =
    useCreatePaymentOrderMutation();
  const [verifyPayment, { isLoading: isPlacing }] = useVerifyPaymentMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const country = watch("country");
  const state = watch("state");
  const couponCode = watch("couponCode");

  // Order Details
  const originalPrice = 500;

  const couponCodes = [23455];
  const discountPercentage = 15; // General discount (e.g., 20%)

  // State for discounts
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(originalPrice);
  const [couponError, setCouponError] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("upi");
  // console.log("Final: ", finalPrice);

  // Calculate discount when orderData is available
  useEffect(() => {
    if (originalPrice > 0 && discountPercentage > 0) {
      const discountValue = (discountPercentage / 100) * originalPrice;
      setDiscountAmount(discountValue);
      setFinalPrice(originalPrice - discountValue); // ✅ Correct calculation
    }
  }, [originalPrice, discountPercentage]);

  // Handle applying coupon discount
  const applyCoupon = () => {
    const coupon = couponCodes.find((c) => c.code === couponCode);
    if (coupon) {
      const couponDiscount = (coupon.discountPercentage / 100) * originalPrice;
      setAppliedDiscount(couponDiscount);
      setFinalPrice(originalPrice - discountAmount - couponDiscount); // ✅ Corrected logic
      setIsCouponApplied(true);
      setCouponError("");
    } else {
      setAppliedDiscount(0);
      setFinalPrice(originalPrice - discountAmount);
      setIsCouponApplied(false);
      setCouponError("Invalid coupon code. Please try again.");
    }
  };

  const onSubmit = async (data) => {
    const order = {
      amount: 500,
      billingAddress: {
        country: country?.label || "",
        state: state?.label || "",
        city: data.city,
        village: data.village,
      },
    };
    await handlePayment(order);
  };

  const handlePayment = async (order) => {
    try {
      const data = await createPaymentOrder({ courseId, order });

      if (!data?.data?.success) {
        toast.error("Error creating order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.data.data.amount,
        currency: data.data.data.currency,
        name: "Praxia Skill",
        description: "Buy a Course",
        order_id: data.data.data.id,
        handler: async function (response) {

          const verificationData = {
            courseId,
            razorpayData: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
          };

          const verifyRes = await verifyPayment(verificationData);
          console.log("verify response", verifyRes);

          if (verifyRes?.data?.success) {
            toast.success("Payment successful!");
            navigate("/my-courses");
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#ff8856",
        },
      };

      // ⿤ Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error", error);
      alert("Error processing payment");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const paymentMethods = [
    { id: "upi", label: "UPI" },
    { id: "cards", label: "Cards" },
    { id: "netbanking", label: "Net Banking" },
    { id: "wallets", label: "Mobile Wallets" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Billing & Payment */}
      <div className="mx-2 flex flex-col md:flex-row items-center">
        <div className="w-full px-2 md:w-[60%] md:ml-24 md:pl-32 md:p-6">
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>
          <h2 className="text-md font-semibold mb-4">Billing Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4 gap-y-4">
            {/* Country Selection */}
            <label className="block text-sm font-medium">
              Country
              <Select
                options={Country.getAllCountries().map((c) => ({
                  value: c.isoCode,
                  label: c.name,
                }))}
                value={country}
                onChange={(val) => setValue("country", val)}
                className="mt-1"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </label>

            {/* State Selection */}
            <label className="block text-sm font-medium">
              State / Union Terittory
              <Select
                options={
                  country
                    ? State.getStatesOfCountry(country.value).map((s) => ({
                        value: s.isoCode,
                        label: s.name,
                      }))
                    : []
                }
                value={state}
                onChange={(val) => setValue("state", val)}
                isDisabled={!country}
                className="mt-1 "
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </label>

            {/* City Input */}
            <label className="block text-sm font-medium">
              City
              <input
                type="text"
                className="w-full p-2 border rounded outline-none focus:border-red-500 focus:ring-1 focus:ring-red-300 mt-1"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </label>

            {/* Village Input */}
            <label className="block text-sm font-medium">
              Town / Village
              <input
                type="text"
                className="w-full p-2 border rounded outline-none focus:border-red-500 focus:ring-1 focus:ring-red-300 mt-1"
                {...register("village")}
              />
              {errors.village && (
                <p className="text-red-500 text-sm">{errors.village.message}</p>
              )}
            </label>
          </div>

          {/* Payment Method */}
          {/* <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
        <select
            className="w-full p-2 border rounded outline-none focus:border-red-500 focus:ring-1 focus:ring-red-300"
            {...register("paymentMethod")}
        >
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
        </select> */}
          <h2 className="text-lg font-semibold mb-4 mt-4">Payment method</h2>
          <div className="mx-auto p-4 rounded-md border mt-4 bg-gray-100 mb-4">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center cursor-pointer p-3 border rounded-lg mb-2 ${
                  selectedMethod === method.id ? "" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="mr-2"
                />
                <span className="font-semibold">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-[40%] bg-gray-100 h-screen md:p-6 md:px-12 px-4">
          <h2 className="text-xl font-bold mb-4 pt-8">Order Summary</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load order data.</p>
          ) : (
            <div className="md:mr-8 md:pr-16">
              <div className="flex justify-between">
                <p>Original Price:</p>
                <p className="font-semibold">₹{originalPrice}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p>General Discount ({discountPercentage}%):</p>
                <p className="font-semibold text-green-500">
                  -₹{discountAmount}
                </p>
              </div>
              {appliedDiscount ? (
                <div className="flex justify-between mt-2">
                  <p>Coupon Discount:</p>
                  <p className="font-semibold text-red-500">
                    -₹{appliedDiscount}
                  </p>
                </div>
              ) : (
                ""
              )}

              <div className="flex space-x-2 mt-4">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-500 outline-none focus:border-red-500 focus:shadow-sm rounded disabled:bg-gray-200"
                  {...register("couponCode")}
                  placeholder="Enter Coupon Code"
                  onChange={(e) =>
                    setValue("couponCode", e.target.value.toUpperCase())
                  }
                  disabled={isCouponApplied}
                />

                <button
                  type="button"
                  className={`px-4 py-2 ${
                    isCouponApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white rounded`}
                  onClick={applyCoupon}
                  disabled={isCouponApplied}
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm">{couponError}</p>
              )}

              <div className="flex justify-between mt-4 border-t border-gray-500 pt-2">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-lg font-bold">₹{finalPrice}</p>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-red-500 hover:bg-red-600 cursor-pointer text-white py-3 rounded-lg font-semibold"
              >
                {isPlacing ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CoursePayment;
