// Payment utility functions for integrating with payment providers

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
}

export interface PaymentMethod {
  id: string
  type: string
  card?: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
}

// Mock payment processing - replace with actual payment provider integration
export async function createPaymentIntent(amount: number, currency = "usd"): Promise<PaymentIntent> {
  // This would integrate with Stripe, PayPal, or other payment providers
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `pi_${Date.now()}`,
        amount,
        currency,
        status: "requires_payment_method",
      })
    }, 1000)
  })
}

export async function confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<PaymentIntent> {
  // This would confirm the payment with your payment provider
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: paymentIntentId,
        amount: 0, // Would be actual amount
        currency: "usd",
        status: "succeeded",
      })
    }, 2000)
  })
}

export async function refundPayment(paymentIntentId: string, amount?: number): Promise<{ id: string; status: string }> {
  // This would process a refund with your payment provider
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `re_${Date.now()}`,
        status: "succeeded",
      })
    }, 1000)
  })
}

// Utility function to format currency
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

// Utility function to calculate platform fees
export function calculatePlatformFee(amount: number, feePercentage = 0.029): number {
  return Math.round(amount * feePercentage * 100) / 100
}

// Utility function to calculate vendor payout
export function calculateVendorPayout(orderAmount: number, platformFeePercentage = 0.029): number {
  const platformFee = calculatePlatformFee(orderAmount, platformFeePercentage)
  return orderAmount - platformFee
}
