'use client';

import { useState } from 'react';
import { X, CreditCard, DollarSign } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onPaymentComplete: (txHash: string) => void;
}

export function PaymentModal({ isOpen, onClose, amount, description, onPaymentComplete }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // In production, this would integrate with Coinbase OnchainKit for Base network payments
      // For now, simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      onPaymentComplete(mockTxHash);
      onClose();
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-text-primary">Complete Payment</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>

            <div className="text-2xl font-bold text-text-primary mb-1">
              ${amount.toFixed(2)}
            </div>

            <p className="text-text-secondary text-sm leading-6">
              {description}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Service Fee</span>
              <span className="text-text-primary font-medium">${amount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-gray-200">
              <span className="text-text-primary font-medium">Total</span>
              <span className="text-text-primary font-bold">${amount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full btn-primary py-3 text-base font-medium flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pay with Base</span>
              </>
            )}
          </button>

          <p className="text-xs text-text-secondary text-center mt-4">
            Payments are processed securely on the Base network.
            Transaction fees may apply.
          </p>
        </div>
      </div>
    </div>
  );
}

