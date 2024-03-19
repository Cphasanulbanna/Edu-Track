declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  callback_url?: string;
  notes?: Record<string | number>;
  theme?: { color: string };
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => Promise<void>;
}

export interface RazorpayInstance {
  open: () => void;
}
