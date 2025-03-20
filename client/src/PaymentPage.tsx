 
import axios from "axios";
import { loadRazorpayScript } from "./utils/payment/loadRazorpay.checkout.ts";
import { RazorpayOptions } from "./types/razorpay";
import {  useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";


const PaymentPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('payment');
    return token
  }, [executeRecaptcha]);


  async function displayRazorpay() {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay failed to load!!");
      return;
    }

    const captcha = await  handleReCaptchaVerify()

    const response = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount: 12000, captcha },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QyZjU0ZWY3OWM3N2I1MDVmYjcyNTMiLCJyb2xlcyI6WyJzdHVkZW50Il0sImlhdCI6MTc0MjM2OTAyNSwiZXhwIjoxNzQyMzc2MjI1fQ._R5gbKBnGOcoS6rTqgtYIcsDdi1DI9LT5jgq80NHv-8",
        },
        params: {
          studentId: "67d27f0a68e1be2cc098db9a",
          feeType: "SEMESTER_FEES",
          semesterId: "67d99ece47425362a59499ae",
        },
      }
    );

    const order = response?.data?.order;
    console.log({ order });

    const options: RazorpayOptions = {
      key: import.meta.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "College Management",
      description: "semester fees payment",
      image: "",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async (response) => {
        console.log({ response });

        try {
          await axios.post("http://localhost:5000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          // Add onPaymentSuccessfull function here
          alert("Payment successful!");
        } catch (err) {
          // Add onPaymentUnSuccessfull function here
          if (axios.isAxiosError(err)) {
            alert(
              "Payment failed: " + err.response?.data?.message || err.message
            );
          } else {
            alert("Payment failed: An unknown error occurred");
          }
        }
      },
      callback_url: "http://localhost:5000/api/payment/verify-payment",
      notes: order.notes,

      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }



  return (
    <div>
      PaymentPage
        <button type="button" onClick={displayRazorpay}>
          Pay Now
        </button>
    </div>
  );
};

export default PaymentPage;
