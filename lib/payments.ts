// Payment utilities for micro-transactions on Base network

export const COLLABORATION_REQUEST_FEE = 0.05; // $0.05 per collaboration request
export const FEATURED_PROFILE_FEE = 1.0; // $1.00 for 24hr featured placement

export interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

// Mock payment processing
export const processPayment = async (amount: number, description: string): Promise<PaymentResult> => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate occasional failures for testing
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: 'Payment failed due to network congestion',
    };
  }

  // Generate mock transaction hash
  const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;

  return {
    success: true,
    txHash,
  };
};

export const formatAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const validatePaymentAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10; // Max $10 for security
};

